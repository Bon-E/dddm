const express = require('express');
const db_product = require('../db/db_product');

const router = express.Router();

router.post('/create_product', (req, res) => {

    session = req.session;

    const {
        name,
        description,
        price,
        stock,
        category,
        vendor,
        platform
    } = req.body;

    // Save image
    const {image} = req.files;
    // TODO:Add more checks for the uploaded image
    if (!image) {
        return res.status(400).send('image upload error');
    }
    image.mv(__dirname + '/../upload/' + image.name);

    // Save product to DB
    db_product.addProduct(name, description, category, platform, vendor, parseInt(stock), image.name, parseFloat(price), session.user._id).then(addedProduct => {
        res.status(200).send('product added');
    }).catch(err => {
        res.status(400).send('Couldn\'t add product');
    });

});

router.get('/get_products', (req, res) => {
    db_product.getProducts().then(q => {
        res.send(q);
    });
});

module.exports = router;
