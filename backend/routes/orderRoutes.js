const express = require('express');
const db_orders = require('../db/db_orders');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.post('/create_order', (req, res) => {
    console.log('req body   ', req.body);
    let orderItems = [];
    let totalPrice = 0;
    req.body.cartData.forEach((element) => {
        totalPrice = totalPrice + parseInt(element.quantity) * parseFloat(element.price);
        orderItems.push({
            product_id: new ObjectId(element.id),
            quantity: parseInt(element.quantity),
            price_for_order: parseFloat(element.price)
        });
    });
    db_orders
        .createOrder(req.session.user._id, totalPrice, orderItems)
        .then(() => {
            res.status(200).send();
        })
        .catch((error) => {
            console.error(error);
            res.status(400).send();
        });
});

router.get('/get_orders', (req, res) => {
    db_orders
        .getOrders()
        .then((orders) => {
            res.send(orders);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send();
        });
});

router.put('/update_order_status', (req, res) => {
    db_orders
        .updateOrderStatus(req.body.order_id, req.body.status_id)
        .then(() => {
            res.status(200).send();
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send();
        });
});

module.exports = router;
