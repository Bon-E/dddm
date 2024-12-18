const express = require('express');
const db_user = require('../db/db_user');
const utils = require('../util');
const db_orders = require('../db/db_orders');

const router = express.Router();

router.use(express.json());

router.get('/get_users', (req, res) => {
    db_user.getUsers().then((query) => {
        res.send(query);
    });
});

router.post('/create_user', async (req, res) => {
    const { username, password, fname, lname, email, phone, birthday, address } = req.body;

    try {
        await db_user.addUser(username, password, fname, lname, email, phone, birthday, address);
        res.status(200).send();
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});

router.get('/authenticate', (req, res) => {
    db_user.authenticateUser(req.query.username, req.query.password).then((authenticated) => {
        if (authenticated !== null) {
            session = req.session;
            session.user = authenticated;
        }
        res.send(authenticated !== null);
    });
});

router.get('/isAdmin', (req, res) => {
    utils
        .isAdmin(req.session.user)
        .then((admin) => {
            res.send(admin);
        })
        .catch(() => {
            res.send(false);
        });
});

router.get('/isLogged', (req, res) => {
    utils.isLogged(req.session.user).then((logged) => {
        res.send(logged);
    });
});

router.get('/disconnect', (req, res) => {
    req.session.destroy();
    res.status(200).send();
});

router.put('/update_user', (req, res) => {
    let reqObj = {
        username: req.body.userName,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        type: req.body.userType,
        email: req.body.email,
        phone: req.body.phone,
        birthday: req.body.birthday,
        address: {
            city: req.body.city,
            street: req.body.street,
            house_number: req.body.housenum
        }
    };

    let updateObj = {};
    for (const key of Object.keys(reqObj)) {
        if (reqObj[key] != null && reqObj[key] != undefined && reqObj[key] != '') {
            updateObj[key] = reqObj[key];
        }
    }

    db_user.findAndUpdateById(req.body.userId, { $set: updateObj }).then((q) => {
        res.status(200).send();
    });
});

router.put('/update_self', (req, res) => {
    let reqObj = {
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        type: req.body.userType,
        email: req.body.email,
        phone: req.body.phone_start + '-' + req.body.phone,
        birthday: new Date(req.body.birthday),
        address: {
            city: req.body.city,
            street: req.body.street,
            house_number: req.body.homenumber
        }
    };

    let updateObj = {};
    for (const key of Object.keys(reqObj)) {
        if (reqObj[key] != null && reqObj[key] != undefined && reqObj[key] != '') {
            updateObj[key] = reqObj[key];
        }
    }

    db_user.findAndUpdateById(req.session.user._id, { $set: updateObj }).then((q) => {
        db_user
            .getUsers(
                {
                    _id: req.session.user._id
                },
                null,
                { limit: 1 }
            )
            .then((new_user) => {
                req.session.user = new_user[0];
                res.status(200).send();
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    });
});

router.delete('/delete_user', (req, res) => {
    db_orders
        .getOrders({ user_id: req.body.userId })
        .then((orders) => {
            if (orders && orders.length > 0) {
                res.status(400).send('Cannot delete user, has orders');
            } else {
                db_user
                    .findAndDeleteById(req.body.userId)
                    .then((d) => {
                        res.status(200).send();
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(400).send();
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send();
        });
});

router.get('/get_user_types', (req, res) => {
    db_user.getUserTypes().then((types) => {
        res.send(types);
    });
});

router.get('/get_self_details', (req, res) => {
    if (utils.isLogged(req.session.user)) {
        res.send(req.session.user);
    } else {
        res.status(500).send();
    }
});
router.get('/getUserByFName', (req, res) => {
    db_user
        .getUsers({ fname: { $regex: '.*' + req.body.fname + '.*' } })
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            console.error(error);
        });
});

module.exports = router;
