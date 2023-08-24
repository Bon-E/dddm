$(document).ready(function () {
    initPage().then(() => {
        routePages();

        $.get('/get_vendors').done(function (vendors) {
            vendors.forEach((vendor) => {
                let newRow = $('<tr>');
                newRow.append("<td class='name'>" + vendor.name + '</td>');
                newRow.append("<td class='site'><a href='" + vendor.website + "' target='_blank'>" + vendor.website + '</a></td>');
                let buttonsHtml = `
                    <td class="buttons-wrapper">
                    <button data-vendorID="${vendor._id}" class="deleteButton">Delete</button>
                    <button data-vendorID="${vendor._id}" class="editButton">Edit</button>
                    </td>
                `;
                newRow.append(buttonsHtml);
                $('#vendorTable').append(newRow);

            });

            $('#addButton').on('click', async function () {
                let name = $('#vendorName').val();
                let site = $('#vendorSite').val();

                const vendorData = {
                    name: name,
                    website: site
                };

                const vendor = await addNewVendor(vendorData);

                let newRow = $('<tr>');
                newRow.append("<td class='name'>" + name + '</td>');
                newRow.append("<td class='site'><a href='" + site + "' target='_blank'>" + site + '</a></td>');
                let buttonsHtml = `
                    <td class="buttons-wrapper">
                    <button data-vendorID="${vendor._id}" class="deleteButton">Delete</button>
                    <button data-vendorID="${vendor._id}" class="editButton">Edit</button>
                    </td>
                `;
                newRow.append(buttonsHtml);

                $('#vendorTable').append(newRow);

                $('#vendorName').val('');
                $('#vendorSite').val('');
            });

            $('#vendorTable').on('click', '.deleteButton', function () {
                let row = $(this).closest('tr');
                let name = row.find('.name').text();
                let site = row.find('.site').text();

                let confirmation = confirm('Are you sure you want to delete this vendor?');

                if (confirmation) {
                    row.remove();

                    deleteVendor({ vendorID: $(this).data().vendorid });
                }
            });

            $('#vendorTable').on('click', '.editButton', function () {
                let row = $(this).closest('tr');
                console.log(row);
                let name = row.find('.name').text();
                let site = row.find('.site').text();
                let vendorID = $(this).data('vendorid');
                let modal = new bootstrap.Modal(document.getElementById('editModal'));
                

                $('#editName').val(name);
                $('#editSite').val(site);

                console.log(vendorID);

                modal.show();
                function onClickCallBack() {
                    let editedRow = row;
                    console.log(editedRow);
                    let newName = $('#editName').val();
                    let newSite = $('#editSite').val();
                
                    if (newName && newSite) {
                        editedRow.find('.name').text(newName);
                        editedRow.find('.site').html(`<a href="${newSite}" target="_blank">${newSite}</a>`);
                
                        let vendorData = {
                            name: newName,
                            website: newSite,
                            vendorID: vendorID
                        };
                        console.log(vendorData);
                
                        updateVendor(vendorData);
                    }
                    $('#modalSaveButton').unbind('click');

                    modal.hide();
                }

                $('#modalSaveButton').on('click', onClickCallBack);
                
            });
            

            const addNewVendor = async (vendorData) => {
                let vendor;
                await $.post('/create_vendor', vendorData)
                    .done((savedVendor) => {
                        vendor = savedVendor;
                    })
                    .fail((error) => {
                        console.error('Error registering vendor', error);
                    });
                return vendor;
            };

            const deleteVendor = (vendorID) => {
                $.ajax({
                    url: '/delete_vendor',
                    type: 'DELETE',
                    data: vendorID,
                    success: function (response) {
                        //console.log('Vendor deleted successfully:', response);
                    },
                    error: function (error) {
                        console.error('Error deleting vendor:', error);
                    }
                });
            };
            const updateVendor = (vendorData) => {
                $.post('/edit_vendor', vendorData)
                    .done((editedVendor) => {
                        console.log('Vendor edited succsefully', editedVendor);
                    })
                    .fail((error) => {
                        console.error('Error editing vendor', error);
                    });
            };
        });
    });
});
