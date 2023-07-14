const express = require('express');
const db_platform = require('../db/db_platform');
const db_category = require('../db/db_category');
const db_vendor = require('../db/db_vendor');

const router = express.Router();

router.get('/get_platforms', (req, res) => {
    db_platform.getPlatforms().then(q => {
        res.send(q);
    });
});

router.get('/get_categories', (req, res) => {
    db_category.getCategories().then(q => {
        res.send(q);
    });
});

router.get('/get_vendors', (req, res) => {
    db_vendor.getVendors().then(q => {
        res.send(q);
    });
});

module.exports = router;
