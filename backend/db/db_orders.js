const { ObjectId } = require('mongodb');
const { Order, Product, Vendor } = require('./schemas');

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

async function _getSalesByVendor() {
    const sales = await Order.aggregate([
        {
            $unwind: '$order_items'
        },
        {
            $lookup: {
                from: Product.collection.name,
                localField: 'order_items.product_id',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: '$product'
        },
        {
            $addFields: {
                vendor_id: '$product.vendor_id'
            }
        },
        {
            $lookup: {
                from: Vendor.collection.name,
                localField: 'vendor_id',
                foreignField: '_id',
                as: 'vendor'
            }
        },
        {
            $unwind: '$vendor'
        },
        {
            $addFields: {
                vendor_name: '$vendor.name'
            }
        },
        {
            $group: {
                _id: '$vendor_id',
                name: { $first: '$vendor_name' },
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                count: 1
            }
        }
    ]);
    return sales;
}

module.exports = {
    getOrders: _getOrders,
    getMyOrders: _getMyOrders,
    createOrder: _createOrder,
    updateOrderStatus: _updateOrderStatus,
    getSalesByVendor: _getSalesByVendor
};
