$(document).ready(function () {

    initPage().then(() => {
        routePages();


        $.get('/get_vendors').done(function (vendors) {

            console.log(vendors);
            vendors.forEach(vendor => {
                var newRow = $("<tr>");
                newRow.append("<td class='name'>" + vendor.name + "</td>");
                newRow.append("<td class='site'>" + vendor.website + "</td>");
                let buttonsHtml = `
                <td class="buttons-wrapper">
                <button data-vendorID = ${
                    "" + vendor._id
                } class="deleteButton">Delete</button>
                <button data-vendorID = ${
                    "" + vendor._id
                } class="editButton">Edit</button>
                </td>
                `;
                newRow.append(buttonsHtml);
                $("#vendorTable").append(newRow);
            });

            $("#addButton").on("click", async function () {
                var name = $("#name").val();
                var site = $("#site").val();

                const vendorData = {
                    name: name,
                    website: site
                };

                const vendor = await addNewVendor(vendorData);
                console.log(vendor);

                var newRow = $("<tr>");
                newRow.append("<td class='name'>" + name + "</td>");
                newRow.append("<td class='site'>" + site + "</td>");
                let buttonsHtml = `
                <td class="buttons-wrapper">
                <button data-vendorID = ${
                    "" + vendor._id
                } class="deleteButton">Delete</button>
                <button data-vendorID = ${
                    "" + vendor._id
                } class="editButton">Edit</button>
                </td>
                `;
                newRow.append(buttonsHtml);

                $("#vendorTable").append(newRow);

                $("#name").val("");
                $("#site").val("");


            });

            $('#vendorTable').on('click', '.deleteButton', function () {
                var row = $(this).closest('tr');
                var name = row.find('.name').text();
                var site = row.find('.site').text();

                var confirmation = confirm("Are you sure you want to delete this vendor?");

                if (confirmation) {
                    row.remove();

                    console.log($(this).data());

                    deleteVendor({vendorID: $(this).data().vendorid})
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
                        row.find('.site').text(newSite);

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
                await $.post('/create_vendor', vendorData).done(savedVendor => {
                    console.log('Vendor registered successfully:', savedVendor);
                    vendor = savedVendor;
                }).fail(error => {
                    console.error('Error registering vendor', error);
                });
                return vendor;
            };
            const deleteVendor = (vendorID) => {
                console.log(vendorID)
                $.ajax({
                    url: '/delete_vendor',
                    type: 'DELETE',
                    data: vendorID,
                    success: function (response) {
                        console.log('Vendor deleted successfully:', response);
                    },
                    error: function (error) {
                        console.error('Error deleting vendor:', error);
                    }
                });
            };
            const updateVendor = (vendorData) => {
                console.log(vendorData);
                $.post('/edit_vendor', vendorData).done(editedVendor => {
                    console.log('Vendor edited succsefully', editedVendor);
                }).fail(error => {
                    console.log('Error editing vendor', error);
                })
            }
        })
    });

});