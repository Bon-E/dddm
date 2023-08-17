$(document).ready(() => {
    initPage().then(() => {
        getProducts().then(() => {
            routePages();
            populateOrdersTable();
        });
    });
});

async function getProducts() {
    let model = Model.getInstance();
    const orders = await $.get('/get_orders');
    console.log(orders);
    model.setOrders(orders);
}

function populateOrdersTable() {
    let model = Model.getInstance();
    var ordersTableBody = $('#ordersTableBody');

    model.getOrders().forEach((order) => {
        //order details
        var orderDetails = $('<tr data-bs-toggle="collapse" data-bs-target="#orderItems' + order._id + '" aria-controls="orderItems' + order._id + '">');
        orderDetails.append($('<td>').text(order._id));
        orderDetails.append($('<td>').text(order.user_id));
        orderDetails.append($('<td>').text(order.total_price));

        //order items
        var orderItemsRow = $('<tr id="orderItems' + order._id + '" class="collapse" aria-labelledby="orderItems' + order._id + '" >');

        var orderItemsCell = $('<td  colspan="100">');

        var orderItemsTable = $('<table class="table">');

        var orderItemsHead = $('<thead>').append($('<tr>').append($('<th>').text('Product ID')).append($('<th>').text('Quantity')).append($('<th>').text('Price')));

        orderItemsHead.append();
        orderItemsHead.append();
        orderItemsHead.append();

        var orderItemsBody = $('<tbody>');

        order.order_items.forEach((item) => {
            var itemRow = $('<tr>');
            itemRow.append($('<td>').text(item.product_id));
            itemRow.append($('<td>').text(item.quantity));
            itemRow.append($('<td>').text(item.price_for_order));
            orderItemsBody.append(itemRow);
        });

        orderItemsTable.append(orderItemsHead);
        orderItemsTable.append(orderItemsBody);
        orderItemsCell.append(orderItemsTable);
        orderItemsRow.append(orderItemsCell);

        ordersTableBody.append(orderDetails);
        ordersTableBody.append(orderItemsRow);
    });
}
