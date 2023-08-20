const express = require('express');
const db_product = require('../db/db_product');
const { ObjectId } = require('mongodb');
const utils = require('../util');
const util = require('../util');

const router = express.Router();

router.post('/create_product', (req, res) => {
    session = req.session;

    const { name, description, price, stock, category, vendor, platform } = req.body;

    console.log('create product: ', req.files);

    // Save image
    const { image } = req.files;
    // TODO:Add more checks for the uploaded image
    if (!image) {
        return res.status(400).send('image upload error');
    }
    image.mv(__dirname + '/../upload/' + image.name);

    // Save product to DB
    db_product
        .addProduct(name, description, category, platform, vendor, parseInt(stock), image.name, parseFloat(price), session.user._id)
        .then((addedProduct) => {
            res.status(200).send('product added');
        })
        .catch((err) => {
            res.status(400).send("Couldn't add product");
        });
});

router.get('/get_products', (req, res) => {
    db_product.getProducts().then((q) => {
        res.send(q);
    });
});

router.put('/update_product', (req, res) => {
    console.log('\n----------- update product -----------\n');
    console.log('body: \n', req.body);
    console.log('img: \n', req.files);

    var image;

    if (req.files) {
        const { editImage } = req.files;
        image = editImage;
        console.log('help meeee', image);
        image.mv(__dirname + '/../upload/' + image.name);
    }

    db_product.getProduct(req.body.productId).then((new_prod) => {
        new_prod.name = req.body.name ? req.body.name : '';
        new_prod.description = req.body.description ? req.body.description : '';
        new_prod.category_id = new ObjectId(req.body.category);
        new_prod.platform_id = new ObjectId(req.body.platform);
        new_prod.vendor_id = new ObjectId(req.body.vendor);
        new_prod.stock = parseInt(req.body.stock);
        new_prod.image = req.files ? image.name : new_prod.image;
        if (utils.findCurrentPrice(new_prod) != parseFloat(req.body.price)) {
            new_prod.pricing.push({
                price: parseFloat(req.body.price),
                changed_on: new Date(),
                changed_by: new ObjectId(req.session.user._id)
            });
        }
        new_prod
            .save()
            .then(() => {
                res.status(200).send();
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    });
});

router.delete('/delete_product', (req, res) => {
    db_product
        .findAndDeleteById(req.body.productId)
        .then(() => {
            res.status(200).send();
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

module.exports = router;
