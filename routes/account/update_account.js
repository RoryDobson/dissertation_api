const connection = require("../../config");
const db = connection.db;

module.exports.update_account = update_account = (req, res) => {
    var apiKey = req.body.key;
    let id = req.body.id;
    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var password = req.body.password;

    if (apiKey == "d85f3d4c6b") {
        db.getConnection(function (err, db) {

            var query = 'SELECT * FROM users WHERE id = ?';

            db.query(query, [id], function (error, results, fields) {
                if (error) throw error;

                if(results.length === 1){
                    var password2 = JSON.parse(results[0].password);
                    var decryptPassword = decrypt(password2);

                    if(password === decryptPassword){
                        var query = "UPDATE users SET ? WHERE id = ?";
                        var post = {"first_name": first_name, "last_name": last_name, "email": email}
                        db.query(query, [post, results[0].id], function (error, results, fields) {
                            if(error) throw error;
                            
                            res.send({"email": email, "success": true, "result": "Account updated"});
                        });
                    } else {
                        res.send({"email": email, "success": false, "result": "Invalid password"});
                    }
                } else {
                    res.send({"email": email, "success": false, "result": "Unknown email"});
                }
            });
        });
    }
}