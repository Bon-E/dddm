$(document).ready(function () {
    initPage().then(() => {
        routePages();
        printCart();
    });
    $('#creditcard').on('input', function () {
        if ($(this).val().length > 16) {
            $(this).val($(this).val().slice(0, 16));
        }
    });
    $('#CVV').on('input', function () {
        if ($(this).val().length > 3) {
            $(this).val($(this).val().slice(0, 3));
        }
    });
    $(document).on('input', '.cart-quantity-input', function () {
        const inputValue = $(this).val();
        const newQuantity = parseInt(inputValue) || 0;

        if (newQuantity >= 0) {
            $(this).val(newQuantity);
            $(this).data('temp-quantity', newQuantity);
        } else {
            $(this).val($(this).data('temp-quantity') || 0);
        }
    });

    $(document).on('click', '.delete-button', function () {
        const cartId = $(this).closest('tr').data('cart-id');
        deleteCartItem(cartId);
        printCart();
    });

    $(document).on('click', '#buyNowButton', function () {
        $('#popup').css('display', 'block');
        $('.overlay').css('display', 'block');
    });

    $('#closePopup').click(function () {
        $('#popup').css('display', 'none');
        $('.overlay').css('display', 'none');
    });

    $('#submitPopup').click(function (event) {
        event.preventDefault();
        let model = Model.getInstance();
        const cartData = model.GetCart();
        $.ajax({
            method: 'POST',
            url: '/create_order',
            data: { cartData }
        })
            .done(() => {
                model.SetCart([]);
                model.saveData();
                printCart();
                $('#popup').css('display', 'none');
                $('.overlay').css('display', 'none');
            })
            .fail((error) => {
                alert(error.responseText ? error.responseText : "Couldn'nt create order");
            });
    });
});

function updateCartItemPrice(productId, newQuantity) {
    let model = Model.getInstance();
    let cartItems = model.GetCart();

    const cartItem = cartItems.find((item) => item.id === productId);

    if (cartItem) {
        cartItem.quantity = newQuantity;
        calculateTotalPrice(cartItems);
        model.saveData();
    }
}
function deleteCartItem(cartId) {
    let model = Model.getInstance();
    let cartItems = model.GetCart();
    let cartIndex = cartItems.findIndex((item) => item.id === cartId);

    if (cartIndex !== -1) {
        cartItems.splice(cartIndex, 1);
        model.saveData();
    }
}
function calculateTotalPrice(cartItems) {
    let total = 0;
    cartItems.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total;
}
function printCart() {
    let model = Model.getInstance();
    let cartItems = model.GetCart();
    let tableBody = $('#cartTableBody');

    tableBody.empty();

    cartItems.forEach(function (product) {
        var row = $('<tr>').attr('data-cart-id', product.id);

        row.append($('<td>').text(product.name));
        row.append($('<td>').text(product.price));

        var quantityCell = $('<td>');
        var quantityInput = $('<input>')
            .addClass('cart-quantity-input')
            .attr('type', 'number')
            .attr('value', product.quantity)
            .attr('min', '1')
            .val(product.quantity)
            .change(function () {
                const newQuantity = $(this).val();
                updateCartItemPrice(product.id, parseInt(newQuantity));
                printCart();
            });

        quantityCell.append(quantityInput);
        row.append(quantityCell);

        var deleteCell = $('<td>');
        var deleteButton = $('<button>').addClass('btn btn-danger delete-button').text('Delete');

        deleteCell.append(deleteButton);
        row.append(deleteCell);

        tableBody.append(row);
    });

    var buyNowRow = $('<tr>');
    var buyNowCell = $('<td>').attr('colspan', '4').addClass('text-right');
    var totalSum = calculateTotalPrice(cartItems);
    var totalSumElement = $('<p>').text('Total: ' + totalSum.toFixed(2) + ' USD');
    totalSumElement.attr('id', 'total_price');

    buyNowCell.append(totalSumElement);
    var buyNowButton = $('<button>').addClass('btn btn-primary').attr('id', 'buyNowButton').text('Buy Now');

    buyNowCell.append(buyNowButton);
    buyNowRow.append(buyNowCell);
    tableBody.append(buyNowRow);
}
function addToCart(product) {
    let model = Model.getInstance();
    let cartItems = model.GetCart();

    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        cartItems.push(product);
    }

    model.saveData();
    printCart();
}
function deleteCartItem(cartId) {
    let model = Model.getInstance();
    let cartItems = model.GetCart();

    // Find the index of the item with the given cartId
    let cartIndex = cartItems.findIndex((item) => item.id === cartId);

    if (cartIndex !== -1) {
        cartItems.splice(cartIndex, 1); // Remove the item from the cart
        model.saveData(); // Save the updated cart data
    }
}
