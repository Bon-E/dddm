$(document).ready(() => {
    initPage().then(() => {
        loadData().then(() => {
            routePages();
            populateOrdersTable();
            customCollapseEvent();
        });
    });
});

function customCollapseEvent() {
    $('.child-row').on('show.bs.collapse', eventHandler);

    $('.child-select').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    $('[data-bs-toggle]').on('click', function (e) {
        let nextRow = $(this).closest('tr').next('tr');
        nextRow.off('show.bs.collapse', eventHandler);
        nextRow.off('hide.bs.collapse', eventHandler);
        nextRow.collapse('toggle');
        nextRow.on('show.bs.collapse', eventHandler);
        nextRow.on('hide.bs.collapse', eventHandler);
    });
}

async function loadData() {
    await getOrders();
    await getUsers();
    await getStatuses();
    await getProducts();
}

async function getUsers() {
    let model = Model.getInstance();
    const users = await $.get('/get_users');
    model.setUsers(users);
}

async function getStatuses() {
    let model = Model.getInstance();
    const statuses = await $.get('/get_statuses');
    model.setStatuses(statuses);
}

async function getOrders() {
    let model = Model.getInstance();
    const orders = await $.get('/get_orders');
    model.setOrders(orders);
}

async function getProducts() {
    let model = Model.getInstance();
    const products = await $.get('/get_products');
    model.setProducts(products);
}

function buildStatusSelection(id) {
    let model = Model.getInstance();
    let select = $('<select class="form-select child-select" id="select' + id + '">');
    model.getStatuses().forEach((status) => {
        let option = $('<option>', {
            value: status._id,
            text: status.status
        });
        select.append(option);
    });
    return select;
}

function populateOrdersTable() {
    let model = Model.getInstance();
    var ordersTableBody = $('#ordersTableBody');

    model.getOrders().forEach((order) => {
        const user = model.getUsers().find((_user) => {
            return _user._id == order.user_id;
        });

        const select = buildStatusSelection(order._id);

        //order details
        var orderDetails = $('<tr id="' + order._id + '" data-bs-toggle="collapse" data-bs-target="#orderItems' + order._id + '" aria-controls="orderItems' + order._id + '">');
        orderDetails.append($('<td>').text(order._id));
        orderDetails.append($('<td>').text(user ? user.fname + ' ' + user.lname : ''));
        orderDetails.append($('<td>').text(order.date ? new Date(order.date).toLocaleDateString('en-GB') : ''));
        orderDetails.append($('<td>').text(order.total_price));
        orderDetails.append($('<td>').append(select.val(order.status_id)));

        var actionsCell = $('<td>');
        var saveButton = $('<button class="child-button">')
            .text('Save ')
            .addClass('btn btn-primary mr-2')
            .click(function (e) {
                e.stopPropagation();
                e.preventDefault();
                let rowOrder = $(this).closest('tr');
                let newStatus = $('#select' + rowOrder.attr('id')).val();
                $.ajax({
                    method: 'PUT',
                    url: '/update_order_status',
                    data: {
                        order_id: rowOrder.attr('id'),
                        status_id: newStatus
                    }
                }).done(() => {
                    loadData().then(() => {
                        $('#ordersTableBody').empty();
                        populateOrdersTable();
                        customCollapseEvent();
                    });
                });
            });

        const saveIcon = $('<i>').addClass('bi bi-save2');
        saveButton.append(saveIcon);

        actionsCell.append(saveButton);
        orderDetails.append(actionsCell);

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

const eventHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
};
