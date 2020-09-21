const express = require('express');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const connection = require("./config");
const db = connection.db;

const app = express();

var jsonParser = bodyParser.json()

const encryption = require("./encryption/encrypt");
encryption.encrypt;
const decryption = require("./encryption/decrypt");
decryption.decrypt;

// Declare CORS headers to prevent outside access
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Create token for user authorisation between pages
app.post('/create_token', jsonParser, function (req, res){
    var get = require("./routes/token/create_token");
    get.create_token(req, res);
});

// Authenticate token and return user ID
app.post('/authenticate_token', jsonParser, function (req, res) {
    var get = require("./routes/token/authenticate_token");
    get.authenticate_token(req, res);
});

app.post('/delete_token', jsonParser, function (req, res) {
    var get = require("./routes/token/delete_token");
    get.delete_token(req, res);
})

// Return all users in the database
app.get('/users', function (req, res) {
    var apiKey = req.query.key;

    if (apiKey == "d85f3d4c6b") {
        db.getConnection(function (err, db) {

            var query = 'SELECT * FROM users';

            db.query(query, function (error, results, fields) {
                if (error) throw error;

                res.send(results);
            });
        });
    } else {
        res.send({"error": apiKey, "success": false, "result": "Unknown API key"});
    }
});

// Create a new user
app.post('/insert_into_users', jsonParser, function (req, res) {
    var get = require("./routes/account/create_account");
    get.create_account(req, res);
});

// Authenticate a user
app.post('/user_login', jsonParser, function (req, res) {
    var get = require("./routes/account/login");
    get.login(req, res);
});

// Return the data of a single user based on the user ID
app.post('/return_user', jsonParser, function (req, res) {
    var get = require("./routes/account/return_user");
    get.return_user(req, res);
});

// Delete a user from the database
app.post('/drop_from_users', jsonParser, function (req, res) {
    var get = require("./routes/account/delete_account");
    get.delete_account(req, res);
});

// Update a user's details
app.post('/update_user', jsonParser, function (req, res) {
    var get = require("./routes/account/update_account");
    get.update_account(req, res);
});

app.post('/contact', jsonParser, function (req, res) {
    var get = require("./email/email");
    get.send_email(req, res);
});

// Return all blog entries
app.post('/blog/all', jsonParser, function (req, res) {
    var get = require("./routes/blog/return_all");
    get.return_all(req, res);
});

// Add a blog entry
app.post('/blog/add', jsonParser, function (req, res) {
    var get = require("./routes/blog/upload");
    get.upload(req, res);
});

// Verify user as an admin
app.post('/admin', jsonParser, function (req, res) {
    var get = require("./routes/admin");
    get.admin(req, res);
});

const port = process.env.PORT || 3001;

// Host on port 3001
app.listen(port, () => {
    console.log('Go to http://localhost:3001 so you can see the data.');
});