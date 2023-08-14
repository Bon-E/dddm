$(document).ready(function () {
    initPage().then(() => {
        routePages();
        printcart();
    });
});
function printcart() {
    let model = Model.getInstance();
    console.log("cart print", model.GetCart());
}

function populateTable() {
    let model = Model.getInstance();
    console.log("cart print3", model.GetCart());
    model.GetCart().forEach(function (product) {
        var row = $("<tr>");

        row.attr("data-cart-id", product.id);
        row.append($("<td>").text(product.name));
        row.append($("<td>").text(product.quantity));
        row.append($("<td>").text(product.price));

        var tableBody = $("#cartTableBody");

        var deleteButton = $("<button>")
            .addClass("btn btn-danger")
            .text("Delete")
            .click(function () {
                // Handle delete button click
                // You can implement delete functionality here
                var cartId = $(this).closest("tr").data("cart-id");
                $.ajax({
                    url: "/delete_product",
                    type: "DELETE",
                    data: {
                        cartId: cartId
                    },
                    success: function (res) {
                        console.log("deleted");
                        refreshTable();
                    }
                });

                alert("Delete button clicked for cart with ID: " + cartId);
            });

        actionsCell.append(editButton, deleteButton);
        row.append(actionsCell);

        tableBody.append(row);
    });
}
