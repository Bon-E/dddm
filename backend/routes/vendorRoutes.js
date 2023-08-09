const express = require('express');
const path = require('path');
const db_user = require('../db/db_user');
const utils = require('../util');
const util = require('../util');
const db_vendor = require('../db/db_vendor');

const router = express.Router();

router.use(express.json());

router.post("/create_vendor", async (req,res) => {
    const {name,website} = req.body;
    try {
      const savedVendor = await db_vendor.addVendor(name,website);
      console.log('Vendor registered succsefully:', savedVendor);
      res.send(savedVendor);
    } catch (error) {
      console.error('Error registering vendor:', error);
      res.status(500).send('Error registering vendor');
    }
  });

  router.delete("/delete_vendor", async (req, res) => {
    const {vendorID} = req.body;
    console.log(vendorID,req.body);
  
    try {
        await db_vendor.deleteVendor(vendorID);
        console.log('Vendor deleted successfully');
        res.sendStatus(200); 
    } catch (error) {
        console.error('Error deleting vendor:', error);
        res.sendStatus(500); 
    }
  });

  router.post("/edit_vendor", async (req, res) => {
    console.log(req.body);
    const { name,website,vendorID} = req.body;
    try {
        const editedVendor = await db_vendor.editVendor(name,website,vendorID);
        console.log('Vendor edited successfully:', editedVendor);
        res.send(editedVendor);
    } catch (error) {
        console.error('Error editing vendor:', error);
        res.status(500).send('Error editing vendor');
    }
});

router.get('/get_vendors',(req, res) => {
   
        db_vendor.getAllVendors().then(function (vendors){
            res.send(vendors);
        });
});

  module.exports = router;