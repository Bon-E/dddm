const { 
    Order
}= require("./schemas");
async function _createOrder(user_id,total_price,items){
    const order = new Order({
        user_id:user_id,
        date: new Date(),
        total_price:total_price,
        status_id:'6480d3cb8e96e5da4f9c84f3',
        order_items:items
    });
    const savedOrder = await order.save();
    return savedOrder; 
}
module.exports = {createOrder:_createOrder}