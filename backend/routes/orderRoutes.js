const express = require('express');
const db_orders = require('../db/db_orders');
const { ObjectId } = require('mongodb');
const db_product = require('../db/db_product');
const router = express.Router();

router.post('/create_order', (req, res) => {
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
            for (const item of orderItems) {
                db_product.updateProductStock(item.product_id, item.quantity);
            }
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

router.get('/get_my_orders', (req, res) => {
    db_orders
        .getMyOrders(req.session.user._id)
        .then((orders) => {
            res.send(orders);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send();
        });
});

router.get('/get_sales_by_vendor', (req, res) => {
    db_orders
        .getSalesByVendor()
        .then((sales) => {
            res.send(sales);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send();
        });
});

router.get('/get_last_week_sales', (req, res) => {
    db_orders
        .getLastWeekSales()
        .then((sales) => {
            res.send(sales);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send();
        });
});

module.exports = router;
