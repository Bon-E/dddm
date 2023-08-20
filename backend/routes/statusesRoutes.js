const express = require('express');
const db_statuses = require('../db/db_statuses');

const router = express.Router();

router.get('/get_statuses', (req, res) => {
    db_statuses
        .getStatuses()
        .then((statuses) => {
            res.send(statuses);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send();
        });
});

module.exports = router;
