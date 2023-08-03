const express = require('express');
const path = require('path');

const router = express.Router();

const views_dir = path.join(__dirname, '../../frontend/view/');

router.use(express.json());

router.get("/", (req, res) => {
    res.sendFile(views_dir + "index.html");
});

router.get("/register", (req, res) => {
    res.sendFile(views_dir + "register.html");
});

router.get("/login", (req, res) => {
    res.sendFile(views_dir + "login.html");
});

router.get("/header", (req, res) => {
    res.sendFile(views_dir + "header.html");
});

router.get("/products_maint", (req, res) => {
    res.sendFile(views_dir + "maintain_products.html");
});

module.exports = router;
