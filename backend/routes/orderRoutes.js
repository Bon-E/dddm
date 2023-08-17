const express = require('express');
const db_orders = require('../db/db_orders');
const { ObjectId } = require("mongodb");
const router = express.Router();

router.post("/create_order",(req,res) => {
    console.log("req body   ",req.body);
    let orderItems = [] 
    let totalPrice = 0;
    req.body.cartData.forEach(element => {
        totalPrice = totalPrice + parseInt(element.quantity)*parseFloat(element.price);
        orderItems.push({
            product_id: new ObjectId(element.id),
            quantity: parseInt(element.quantity),
            price_for_order:parseFloat(element.price)
        }) 
    });
    db_orders.createOrder(req.session.user._id,totalPrice,orderItems).then(()=>{
        res.status(200).send();    
    }).catch((error)=>{
        console.error(error);
        res.status(400).send();            
    })
})



module.exports = router;
