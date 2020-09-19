const connection = require("../../config");
const db = connection.db;

module.exports.create_account = create_account = (req, res) => {

    var apiKey = req.body.key;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    
    if(first_name === "" || first_name === null){
        res.send({"error": first_name, "success": false, "result": "Missing first name field"});
    } else if(last_name === "" || last_name === null){
        res.send({"error": last_name, "success": false, "result": "Missing last name field"});
    } else if(email === "" || email === null){
        res.send({"error": email, "success": false, "result": "Missing email field"});
    } else if(password === "" || password === null){
        res.send({"error": "password error", "success": false, "result": "Missing password field"});
    } else if(confirm_password === "" || confirm_password === null){
        res.send({"error": "password error", "success": false, "result": "Missing confirm password field"});
    } else {
        if (apiKey == "d85f3d4c6b") {
            if(password === confirm_password){
                getEmail(email, first_name, last_name, password, res);
            } else {
                res.send({"error": "password error", "success": false, "result": "Passwords don't match"});
            }
        } else {
            res.send({"error": apiKey, "success": false, "result": "Unknown API key"});
        }
    }
}

function getEmail(email, first_name, last_name, password, res) {
    db.getConnection(function (err, db) {

        var query = 'SELECT * FROM users WHERE email = ?';

        db.query(query, [email], function (error, results, fields) {
            if (error) throw error;

            if (results.length === 0) {
                insert(email, first_name, last_name, password, res);
            } else {
                res.send({ "email": email, "success": false, "result": "Email address already registered" });
            }
        });
    });
}

function insert(email, first_name, last_name, password, res) {
    var query = 'INSERT INTO users SET ?';
    var post = { "first_name": first_name, "last_name": last_name, "password": JSON.stringify(encrypt(password)), "email": email };

    db.query(query, post, function (error, results, fields) {
        if (error) throw error;

        getID(email, res);
    });
}

function getID(email, res) {
    query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], function (error, result, fields){
        if (error) throw error;

        res.send({ "email": email, "success": true, "result": "Successfully registered", "id": result[0].id});
    })
}