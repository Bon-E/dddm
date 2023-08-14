$(document).ready(function () {
    initPage().then(() => {
        routePages();

        $.get("/get_products").done((products) => {
            console.log(products);
            let model = Model.getInstance();
            model.setProducts(products);
            populateProductTable();
        });

        populatePlatformsSelection();
        populateCategoriesSelection();
        populateVendorsSelection();

        initModal();
    });
});

function create_button_handle(event) {
    event.preventDefault();
    if (check_input()) {
        // ...
        console.log($("#form1")[0]);
        let form = new FormData($("#form1")[0]);
        console.log(form);
        $.ajax({
            method: "POST",
            url: "/create_product",
            data: form,
            processData: false,
            contentType: false
        })
            .done((res) => {
                console.log(res);
            })
            .fail((res) => {
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
        let option1 = $("<option>", { value: item._id, text: item.name });
        let option2 = $("<option>", { value: item._id, text: item.name });
        $("#Platform").append(option1);
        $("#editPlatform").append(option2);
    });
}

function populateCategoriesSelection() {
    let model = Model.getInstance();
    $.each(model.getCategories(), (index, item) => {
        let option1 = $("<option>", { value: item._id, text: item.name });
        let option2 = $("<option>", { value: item._id, text: item.name });
        $("#Category").append(option1);
        $("#editCategory").append(option2);
    });
}

function populateVendorsSelection() {
    let model = Model.getInstance();
    $.each(model.getVendors(), (index, item) => {
        let option1 = $("<option>", { value: item._id, text: item.name });
        let option2 = $("<option>", { value: item._id, text: item.name });
        $("#Vendor").append(option1);
        $("#editVendor").append(option2);
    });
}

function populateProductTable() {
    let model = Model.getInstance();

    const vendors = model.getVendors();
    const platforms = model.getPlatforms();
    const categories = model.getCategories();

    $("#productTableBody").empty();

    for (const product of model.getProducts()) {
        const row = $("<tr>");

        row.attr("data-product-id", product._id);

        let vendor = vendors.find((ven) => ven._id == product.vendor_id);
        let platform = platforms.find((plat) => plat._id == product.platform_id);
        let category = categories.find((cat) => cat._id == product.category_id);

        row.append($("<td>").text(product.name));
        row.append($("<td>").text(product.description));
        row.append($("<td>").text(findMyPrice(product)));
        row.append($("<td>").text(product.stock));
        row.append($("<td>").text(category ? category.name : null));
        row.append($("<td>").text(platform ? platform.name : null));
        row.append($("<td>").text(vendor ? vendor.name : null));

        const editButton = $("<button>")
            .text("Edit")
            .addClass("btn btn-primary btn-sm")
            .click(function () {
                var productId = $(this).closest("tr").data("product-id");
                handleEditButtonClick(productId);
            });

        row.append($("<td></td>").append(editButton));

        $("#productTableBody").append(row);
    }
}

function handleEditButtonClick(productId) {
    let model = Model.getInstance();

    var product = model.getProducts().find((product) => {
        return product._id === productId;
    });

    $("#productId").val(product._id);
    $("#editProductName").val(product.name);
    $("#editDescription").val(product.description);
    $("#editStock").val(product.stock);
    $("#editCategory").val(product.category_id);
    $("#editVendor").val(product.vendor_id);
    $("#editPlatform").val(product.platform_id);
    $("#editPrice").val(findMyPrice(product));

    $("#productImg").attr("src", product.image);

    $("#editModal").modal("show");
}

function findMyPrice(product) {
    let prices = product.pricing;
    let lastDate = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (new Date(prices[i].changed_on) > new Date(lastDate.changed_on)) {
            lastDate = prices[i];
        }
    }
    return lastDate.price;
}

function initModal() {
    $("#saveChangesBtn").click(function () {
        var form = new FormData($("#editProductForm")[0]);
        console.log(form);
        $.ajax({
            url: "/update_product",
            type: "PUT",
            data: form,
            processData: false,
            contentType: false
        })
            .done((res) => {
                console.log(res);
            })
            .fail((res) => {
                console.error(res);
            });
        $("#editModal").modal("hide");
    });

    $("#closeModalBtn1").click(() => {
        $("#editModal").modal("hide");
    });

    $("#closeModalBtn2").click(() => {
        $("#editModal").modal("hide");
    });
}
