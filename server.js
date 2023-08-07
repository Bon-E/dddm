const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // mongoose is a singleton
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
main();

async function main() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('Successfully connected to db');
    } catch (err) {
        console.error('Couldn\'t connect to db\n', err);
        return;
    }
    server();
}
function server() {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));

    const port = process.env.PORT || 8080;
    const routes_path = path.join(__dirname, '/backend/routes/');

    // serve static files
    app.use(express.static(path.join(__dirname, '/frontend')));

    // routes
    const _route = require(routes_path + 'routes');
    app.use('/', _route);

    console.log('App listens on port:', port);
    app.listen(port);
}
