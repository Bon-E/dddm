$(document).ready(function () {
  // Function to populate the product table
  function populateProductTable() {
    // Sample data for demonstration
    const users = [
      {
        userName: "Adin המלך",
        userType: "supplier",
        productType: "product",
      },
      {
        userName: "user 2",
        userType: "regular",
        productType: "Sony Playstation",
      },
    ];

    $("#productTableBody").empty();

    for (const user of users) {
      // Create a new table row
      const row = $("<tr></tr>");

      // Add table cells for each user property
      row.append(`<td>${user.userName}</td>`);
      row.append(`<td>${user.userType}</td>`);
      row.append(`<td>${user.productType}</td>`);

      // Create an "Edit" button and add an event listener
      const editButton = $("<button></button>")
        .text("Edit")
        .addClass("btn btn-primary btn-sm")
        .click(function () {
          // Handle the edit button click event here
          console.log(`Edit button clicked for ${user.userName}`);

          // Create the modal popup
          const modal = $("<div></div>")
            .addClass("modal fade")
            .attr("id", "editModal")
            .attr("tabindex", "-1")
            .attr("aria-labelledby", "editModalLabel")
            .attr("aria-hidden", "true");

          // Create the modal dialog
          const modalDialog = $("<div></div>")
            .addClass("modal-dialog")
            .appendTo(modal);

          // Create the modal content
          const modalContent = $("<div></div>")
            .addClass("modal-content")
            .appendTo(modalDialog);

          // Create the modal header
          const modalHeader = $("<div></div>")
            .addClass("modal-header")
            .appendTo(modalContent);

          // Add the close button to the modal header
          const closeButton = $("<button></button>")
            .addClass("btn-close")
            .attr("type", "button")
            .attr("data-bs-dismiss", "modal")
            .attr("aria-label", "Close")
            .appendTo(modalHeader);

          // Create the modal title
          const modalTitle = $("<h5></h5>")
            .addClass("modal-title")
            .attr("id", "editModalLabel")
            .text(`Edit User: ${user.userName}`)
            .appendTo(modalHeader);

          // Create the modal body
          const modalBody = $("<div></div>")
            .addClass("modal-body")
            .appendTo(modalContent);

          // Create the form for editing the user
          const editForm = $("<form></form>").appendTo(modalBody);

          // Add form fields for each property of the user
          editForm.append(`
            <div class="mb-3">
              <label for="editUserName" class="form-label">User Name</label>
              <input type="text" class="form-control" id="editUserName" value="${user.userName}" required>
            </div>
            <div class="mb-3">
              <label for="editUserType" class="form-label">User Type</label>
              <input type="text" class="form-control" id="editUserType" value="${user.userType}" required>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="editProductType" class="form-label">Product Type</label>
                  <input type="text" class="form-control" id="editProductType" value="${user.productType}" required>
                </div>
              </div>
            </div>
            <button id="deleteUserBtn" class="btn btn-danger">Delete User</button>
          `);

          // Create the modal footer
          const modalFooter = $("<div></div>")
            .addClass("modal-footer")
            .appendTo(modalContent);

          // Add the save button to the modal footer
          const saveButton = $("<button></button>")
            .addClass("btn btn-primary")
            .attr("type", "button")
            .text("Save Changes")
            .appendTo(modalFooter);

          // Handle the save button click event
          saveButton.click(function () {
            // Get the updated values from the form
            const updatedUser = {
              userName: $("#editUserName").val(),
              userType: $("#editUserType").val(),
              productType: $("#editProductType").val(),
            };

            // Perform any necessary update operations with the updated user data

            // Close the modal popup
            modal.modal("hide");
          });

          // Append the modal to the document body
          $("body").append(modal);

          // Show the modal popup
          modal.modal("show");
        });

      // Add the edit button to the table row
      row.append($("<td></td>").append(editButton));

      // Add the table row to the product table body
      $("#productTableBody").append(row);
    }
  }

  // Call the function to populate the product table
  populateProductTable();
});
