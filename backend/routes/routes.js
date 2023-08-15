const express = require('express');
const path = require('path');
const db_funcs = require('../db/db_funcs');

const router = express.Router();

const views_dir = path.join(__dirname, '../../frontend/view/');

router.use(express.json());

router.get("/", (req, res) => {
    res.sendFile(views_dir + "index.html");
});

router.get("/register", (req, res) => {
    res.sendFile(views_dir + "register.html");
});

router.post("/new_user", (req, res) => {
    console.log(req.body);
});
router.get("/test", (req, res) => {
    db_funcs.getAllUsers().then(query => {
        res.send(query);
    });
});

router.post("/create_user", async (req, res) => {
    const {
        username,
        password,
        type,
        fname,
        lname,
        email,
        phone,
        birthday,
        address
    } = req.body;
    console.log(username, password, email, fname, lname, phone, birthday, address);
    try {
        const savedUser = await db_funcs.addUser(username, password, type, fname, lname, email, phone, birthday, address);
        console.log('User registered successfully:', savedUser);
        res.send(savedUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user.');
    }
});


module.exports = router;
