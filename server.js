const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // mongoose is a singleton
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const fileUpload = require('express-fileupload');

var session;
dotenv.config();
main();

async function main() {
    try {
        process.stdout.write('Connecting to DB... ');
        process.stdout.write('Done\n');
        await mongoose.connect(process.env.DB_CONNECTION);
    } catch (err) {
        console.error("Couldn't connect to db\n", err);
        return;
    }
    server();
}
function server() {
    process.stdout.write('Initializing app... ');
    const app = express();
    process.stdout.write('Done\n');

    const port = process.env.PORT || 8080;
    const routes_path = path.join(__dirname, '/backend/routes/');
    app.use(bodyParser.urlencoded({ extended: true }));

    // setup session management
    process.stdout.write('Setting up session management... ');
    const cookie_timeout = 1000 * 60 * 60 * 24;
    app.use(
        sessions({
            secret: process.env.SESSION_KEY,
            saveUninitialized: true,
            cookie: {
                maxAge: cookie_timeout
            },
            resave: false
        })
    );
    process.stdout.write('Done\n');

    // setup cookie parser
    app.use(cookieParser());

    // setup file uploader
    app.use(fileUpload());

    // serve static files
    app.use(express.static(path.join(__dirname, '/frontend')));
    app.use(express.static(path.join(__dirname, '/backend/upload')));

    // routes
    process.stdout.write('Setting up routes... ');
    const pageRoutes = require(routes_path + 'pageRoutes');
    const userRoutes = require(routes_path + 'userRoutes');
    const productRoutes = require(routes_path + 'productRoutes');
    const utilRoutes = require(routes_path + 'utilRoutes');
    const vendorRoutes = require(routes_path + 'vendorRoutes');
    const orderRoutes = require(routes_path + 'orderRoutes');
    const statusesRoutes = require(routes_path + 'statusesRoutes');
    app.use('/', pageRoutes);
    app.use('/', userRoutes);
    app.use('/', productRoutes);
    app.use('/', utilRoutes);
    app.use('/', vendorRoutes);
    app.use('/', orderRoutes);
    app.use('/', statusesRoutes);
    process.stdout.write('Done\n\n');

    console.log('App listens on port:', port);
    app.listen(port);
}
