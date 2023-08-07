const express = require('express');
const path = require('path');
const db_funcs = require('../db/db_funcs');

const router = express.Router();

const views_dir = path.join(__dirname, '../../frontend/view/');

router.use(express.json());

router.get("/", (req, res) => {
    res.sendFile(views_dir + "index.html");
});

router.get("/get_users", (req, res) => {
    db_funcs.getAllUsers().then(query => {
        res.send(query);
    });
});

router.get("/register", (req, res) => {
    res.sendFile(views_dir + "register.html");
});

router.get("/vendors", (req, res) => {
  res.sendFile(views_dir + "vendors.html");
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
        fname,
        lname,
        email,
        phone,
        birthday,
        address
    } = req.body;
    try {
        const savedUser = await db_funcs.addUser(username, password, fname, lname, email, phone, birthday, address);
        res.send(savedUser);
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});

router.post("/create_vendor", async (req,res) => {
  const {name,website} = req.body;
  try {
    const savedVendor = await db_funcs.addVendor(name,website);
    console.log('Vendor registered succsefully:', savedVendor);
    res.send(savedVendor);
  } catch (error) {
    console.error('Error registering vendor:', error);
    res.status(500).send('Error registering vendor');
  }
});

router.delete("/delete_vendor", async (req, res) => {
  const { name, site } = req.body;

  try {
      await db_funcs.deleteVendor(name, site);
      console.log('Vendor deleted successfully');
      res.sendStatus(200); 
  } catch (error) {
      console.error('Error deleting vendor:', error);
      res.sendStatus(500); 
  }
});

module.exports = router;
