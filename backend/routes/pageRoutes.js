const express = require('express');
const path = require('path');
const utils = require('../util');

const router = express.Router();

const views_dir = path.join(__dirname, '../../frontend/view/');

router.use(express.json());

router.get("/", (req, res) => {
    res.sendFile(views_dir + "index.html");
});

router.get("/register", (req, res) => {
    if (req.session.user == null || req.session.user == undefined) {
        res.sendFile(views_dir + "register.html");
    } else {
        res.redirect('/');
    }
});

router.get("/login", (req, res) => {
    if (req.session.user == null || req.session.user == undefined) {
        res.sendFile(views_dir + "login.html");
    } else {
        res.redirect('/');
    }
});

router.get("/header", (req, res) => {
    res.sendFile(views_dir + "header.html");
});

router.get("/products_maint", (req, res) => {
    utils.isAdmin(req.session.user).then(r => {
        if (r) {
            console.log('ok !');
            res.sendFile(views_dir + "maintain_products.html");
        } else {
            console.log('why though :(');
            res.redirect('/');
        }
    });
});

router.get("/vendors", (req, res) => {
    res.sendFile(views_dir + "vendors.html");
});

router.get("/maintain_users", (req, res) => {
    res.sendFile(views_dir + "maintain_users.html");
});

module.exports = router;
