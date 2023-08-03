$(document).ready(function () {
    initPage().then(() => {
        routePages();
        // console.log(Model.getInstance().getPlatforms());
        // console.log(Model.getInstance().getCategories());

        populatePlatformsSelection();
        populateCategoriesSelection();
        populateVendorsSelection();

        // populateProductTable();
    });
});


function create_button_handle(event) {
    event.preventDefault();
    if (check_input()) { // ...
        console.log($('#form1')[0])
        let form = new FormData($('#form1')[0]);
        console.log(form);
        $.ajax({
            method: 'POST',
            url: '/create_product',
            data: form,
            processData: false,
            contentType: false
        }).done(res => {
            console.log(res);
        }).fail(res => {
            console.log(res);
        });
    }
}

function check_input() {
    return true;
}

function upload_image() {}

function populatePlatformsSelection() {
    let model = Model.getInstance();
    $.each(model.getPlatforms(), (index, item) => {
        let option = $('<option>', {
            value: item._id,
            text: item.name
        });
        $("#Platform").append(option);
    });
}

function populateCategoriesSelection() {
    let model = Model.getInstance();
    $.each(model.getCategories(), (index, item) => {
        let option = $('<option>', {
            value: item._id,
            text: item.name
        });
        $("#Category").append(option);
    });
}

function populateVendorsSelection() {
    let model = Model.getInstance();
    $.each(model.getVendors(), (index, item) => {
        let option = $('<option>', {
            value: item._id,
            text: item.name
        });
        $("#Vendor").append(option);
    });
}

// ________________________________________________________________________________
// ________________________________________________________________________________
// ________________________________________________________________________________
// ________________________________________________________________________________
// ________________________________________________________________________________
// ________________________________________________________________________________
// ________________________________________________________________________________


// Function to populate the product table
function populateProductTable() { // Sample data for demonstration
    const products = [
        {
            name: "Product 1",
            description: "Description 1",
            price: 19.99,
            stock: 10,
            category: "Game",
            platform: "PC"
        }, {
            name: "Product 2",
            description: "Description 2",
            price: 29.99,
            stock: 5,
            category: "Console",
            platform: "Sony Playstation"
        },
        // Add more product objects as needed
    ];

    // Clear the existing table rows
    $("#productTableBody").empty();

    // Iterate over the products array and create table rows dynamically
    for (const product of products) { // Create a new table row
        const row = $("<tr></tr>");

        // Add table cells for each product property
        row.append(`<td>${
            product.name
        }</td>`);
        row.append(`<td>${
            product.description
        }</td>`);
        row.append(`<td>${
            product.price
        }</td>`);
        row.append(`<td>${
            product.stock
        }</td>`);
        row.append(`<td>${
            product.category
        }</td>`);
        row.append(`<td>${
            product.platform
        }</td>`);

        // Create an "Edit" button and add an event listener
        const editButton = $("<button></button>").text("Edit").addClass("btn btn-primary btn-sm").click(function () { // Handle the edit button click event here
            console.log(`Edit button clicked for ${
                product.name
            }`);

            // Create the modal popup
            const modal = $("<div></div>").addClass("modal fade").attr("id", "editModal").attr("tabindex", "-1").attr("aria-labelledby", "editModalLabel").attr("aria-hidden", "true");

            // Create the modal dialog
            const modalDialog = $("<div></div>").addClass("modal-dialog").appendTo(modal);

            // Create the modal content
            const modalContent = $("<div></div>").addClass("modal-content").appendTo(modalDialog);

            // Create the modal header
            const modalHeader = $("<div></div>").addClass("modal-header").appendTo(modalContent);

            // Add the close button to the modal header
            const closeButton = $("<button></button>").addClass("btn-close").attr("type", "button").attr("data-bs-dismiss", "modal").attr("aria-label", "Close").appendTo(modalHeader);

            // Create the modal title
            const modalTitle = $("<h5></h5>").addClass("modal-title").attr("id", "editModalLabel").text(`Edit Product: ${
                product.name
            }`).appendTo(modalHeader);

            // Create the modal body
            const modalBody = $("<div></div>").addClass("modal-body").appendTo(modalContent);

            // Create the form for editing the product
            const editForm = $("<form></form>").appendTo(modalBody);

            // Add form fields for each property of the product
            editForm.append(`
        <div class="mb-3">
          <label for="editProductName" class="form-label">Product Name</label>
          <input type="text" class="form-control" id="editProductName" value="${
                product.name
            }" required>
        </div>
        <div class="mb-3">
          <label for="editDescription" class="form-label">Description</label>
          <textarea class="form-control" id="editDescription" rows="3" required>${
                product.description
            }</textarea>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="editPrice" class="form-label">Price</label>
              <input type="number" class="form-control" id="editPrice" value="${
                product.price
            }" required>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="editStock" class="form-label">Stock</label>
              <input type="number" class="form-control" id="editStock" value="${
                product.stock
            }" required>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="editCategory" class="form-label">Category</label>
          <select class="form-select" id="editCategory" required>
            <option value="Console" ${
                product.category === "Console" ? "selected" : ""
            }>Console</option>
            <option value="Game" ${
                product.category === "Game" ? "selected" : ""
            }>Game</option>
            <option value="Accessories" ${
                product.category === "Accessories" ? "selected" : ""
            }>Accessories</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="editPlatform" class="form-label">Platform</label>
          <select class="form-select" id="editPlatform" required>
            <option value="PC" ${
                product.platform === "PC" ? "selected" : ""
            }>PC</option>
            <option value="Sony Playstation" ${
                product.platform === "Sony Playstation" ? "selected" : ""
            }>Sony Playstation</option>
            <option value="XBOX" ${
                product.platform === "XBOX" ? "selected" : ""
            }>XBOX</option>
            <option value="Nintendo Switch" ${
                product.platform === "Nintendo Switch" ? "selected" : ""
            }>Nintendo Switch</option>
          </select>
        </div>
      `);

            // Create the modal footer
            const modalFooter = $("<div></div>").addClass("modal-footer").appendTo(modalContent);

            // Add the save button to the modal footer
            const saveButton = $("<button></button>").addClass("btn btn-primary").attr("type", "button").text("Save Changes").appendTo(modalFooter);

            // Handle the save button click event
            saveButton.click(function () { // Get the updated values from the form
                const updatedProduct = {
                    name: $("#editProductName").val(),
                    description: $("#editDescription").val(),
                    price: parseFloat($("#editPrice").val()),
                    stock: parseInt($("#editStock").val()),
                    category: $("#editCategory").val(),
                    platform: $("#editPlatform").val()
                };

                // Perform any necessary update operations with the updated product data

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
