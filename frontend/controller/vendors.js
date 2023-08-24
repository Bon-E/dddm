$(document).ready(function () {
    initPage().then(() => {
        routePages();

        $.get('/get_vendors').done(function (vendors) {
            vendors.forEach((vendor) => {
                var newRow = $('<tr>');
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
                var name = $('#vendorName').val();
                var site = $('#vendorSite').val();

                const vendorData = {
                    name: name,
                    website: site
                };

                const vendor = await addNewVendor(vendorData);

                var newRow = $('<tr>');
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
                var row = $(this).closest('tr');
                var name = row.find('.name').text();
                var site = row.find('.site').text();

                var confirmation = confirm('Are you sure you want to delete this vendor?');

                if (confirmation) {
                    row.remove();

                    deleteVendor({ vendorID: $(this).data().vendorid });
                }
            });

            $('#vendorTable').on('click', '.editButton', function () {
                var row = $(this).closest('tr');
                var name = row.find('.name').text();
                var site = row.find('.site').text();
                var modal = new bootstrap.Modal(document.getElementById('editModal'));
                var vendorID = $(this).data('vendorid');

                $('#editName').val(name);
                $('#editSite').val(site);

                modal.show();

                $('#modalSaveButton').on('click', function () {
                    var newName = $('#editName').val();
                    var newSite = $('#editSite').val();

                    if (newName && newSite) {
                        row.find('.name').text(newName);
                        row.find('.site').html(`<a href="${newSite}" target="_blank">${newSite}</a>`);

                        var vendorData = {
                            name: newName,
                            website: newSite,
                            vendorID: vendorID
                        };

                        updateVendor(vendorData);
                    }

                    modal.hide();
                });
            });

            const addNewVendor = async (vendorData) => {
                var vendor;
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
                        //console.log('Vendor edited succsefully', editedVendor);
                    })
                    .fail((error) => {
                        console.error('Error editing vendor', error);
                    });
            };
        });
    });
});
