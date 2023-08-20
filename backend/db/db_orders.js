const { ObjectId } = require('mongodb');
const { Order } = require('./schemas');

async function _createOrder(user_id, total_price, items) {
    const order = new Order({
        user_id: new ObjectId(user_id),
        date: new Date(),
        total_price: total_price,
        status_id: new ObjectId('6480d3cb8e96e5da4f9c84f3'),
        order_items: items
    });
    const savedOrder = await order.save();
    return savedOrder;
}

async function _getOrders(filter = {}, projection = {}, options = {}) {
    const orders = await Order.find(filter, projection, options);
    return orders;
}

async function _updateOrderStatus(id, statusId) {
    const order = await Order.findByIdAndUpdate(id, { status_id: statusId });
    return order;
}

async function _getMyOrders(user_id) {
    const orders = await _getOrders({ user_id: user_id });
    return orders;
}

module.exports = {
    getOrders: _getOrders,
    getMyOrders: _getMyOrders,
    createOrder: _createOrder,
    updateOrderStatus: _updateOrderStatus
};
