$(document).ready(function() {
    $("#addButton").on("click", function () {
        var name = $("#name").val();
        var site = $("#site").val();
    
        var newRow = $("<tr>");
        newRow.append("<td class='name'>" + name + "</td>");
        newRow.append("<td class='site'>" + site + "</td>");
        let buttonsHtml = `
                <td class="buttons-wrapper">
                    <button class="deleteButton">Delete</button>
                    <button class="editButton">Edit</button>
                </td>
            `;
        newRow.append(buttonsHtml);
    
        $("#vendorTable").append(newRow);
    
        $("#name").val("");
        $("#site").val("");

        const vendorData = {
            name: name,
            website: site
        };

        addNewVendor(vendorData);
    });

    $('#vendorTable').on('click', '.deleteButton', function() {
        var row = $(this).closest('tr');
        var name = row.find('.name').text();
        var site = row.find('.site').text();

        var confirmation = confirm("Are you sure you want to delete this vendor?");

        if (confirmation) {
            row.remove();

            var vendorData = {
                name: name,
                site: site
            };

            deleteVendor(vendorData);
        }
    });

    $('#vendorTable').on('click', '.editButton', function() {
        var row = $(this).closest('tr');
        var name = row.find('.name').text();
        var site = row.find('.site').text();

        var newName = prompt('Enter new name:', name);
        var newSite = prompt('Enter new site:', site);

        if (newName && newSite) {
            row.find('.name').text(newName);
            row.find('.site').text(newSite);
        
            var vendorData = {
              name: newName,
              site: newSite,
            };
        
            updateVendor(vendorData); // Call the updateVendor function
          }

    });

    const addNewVendor = (vendorData) => {
        $.post('/create_vendor', vendorData)
            .done(savedVendor => {
                console.log('Vendor registered successfully:', savedVendor);
            })
            .fail(error => {
                console.error('Error registering vendor', error);
            });
    };
    const deleteVendor = (vendorData) => {
        $.ajax({
            url: '/delete_vendor',
            type: 'DELETE',
            data: vendorData,
            success: function(response) {
                console.log('Vendor deleted successfully:', response);
            },
            error: function(error) {
                console.error('Error deleting vendor:', error);
            }
        });
    };
});


