$(document).ready(() => {
    initPage().then(() => {
        loadData().then(() => {
            routePages();
            populateOrdersTable();
        });
    });
});

async function loadData() {
    await getOrders();
    await getStatuses();
    await getProducts();
}

async function getStatuses() {
    let model = Model.getInstance();
    const statuses = await $.get('/get_statuses');
    model.setStatuses(statuses);
}

async function getOrders() {
    let model = Model.getInstance();
    const orders = await $.get('/get_my_orders');
    model.setOrders(orders);
}

async function getProducts() {
    let model = Model.getInstance();
    const products = await $.get('/get_products');
    model.setProducts(products);
}

function populateOrdersTable() {
    let model = Model.getInstance();
    var ordersTableBody = $('#ordersTableBody');

    model.getOrders().forEach((order) => {
        const status = model.getStatuses().find((stat) => {
            return stat._id == order.status_id;
        });

        //order details
        var orderDetails = $('<tr id="' + order._id + '" data-bs-toggle="collapse" data-bs-target="#orderItems' + order._id + '" aria-controls="orderItems' + order._id + '">');
        orderDetails.append($('<td>').text(order._id));
        orderDetails.append($('<td>').text(order.date ? new Date(order.date).toLocaleDateString('en-GB') : ''));
        orderDetails.append($('<td>').text(order.total_price));
        orderDetails.append($('<td>').text(status.status));

        //order items
        var orderItemsRow = $('<tr id="orderItems' + order._id + '" class="collapse child-row" aria-labelledby="orderItems' + order._id + '" >');

        var orderItemsCell = $('<td  colspan="100">');

        var orderItemsTable = $('<table class="table">');

        var orderItemsHead = $('<thead>').append($('<tr>').append($('<th>').text('Product Name')).append($('<th>').text('Quantity')).append($('<th>').text('Price')));

        orderItemsHead.append();
        orderItemsHead.append();
        orderItemsHead.append();

        var orderItemsBody = $('<tbody>');

        order.order_items.forEach((item) => {
            const product = model.getProducts().find((_product) => {
                return _product._id == item.product_id;
            });

            var itemRow = $('<tr>');
            itemRow.append($('<td>').text(product.name));
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
