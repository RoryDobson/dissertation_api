const connection = require("../../config");
const db = connection.db;

module.exports.delete_account = delete_account = (req, res) => {
    var apiKey = req.body.key;
    var email = req.body.email;
    var password = req.body.password;

    if (apiKey == "d85f3d4c6b") {
        db.getConnection(function (err, db) {

            var query = 'SELECT * FROM users WHERE email = ?';

            db.query(query, [email], function (error, results, fields) {
                if (error) throw error;

                if(results.length === 1){
                    var password2 = JSON.parse(results[0].password);
                    var decryptPassword = decrypt(password2);

                    if(password === decryptPassword){
                        var query = "DELETE FROM tokens WHERE id = ?";

                        db.query(query, [results[0].id], function (error, results, fields) {
                            if(error) throw error;
                            query = 'DELETE FROM users WHERE email = ?';

                            db.query(query, [email], function (error, results, fields) {
                                if(error) throw error;
                                res.send({"email": email, "success": true, "result": "Successful deletion"});
                            });
                        });
                        
                    } else {
                        res.send({"email": email, "success": false, "result": "Invalid password"});
                    }
                } else {
                    res.send({"email": email, "success": false, "result": "Unknown email"});
                }
            });
        });
    } else {
        res.send({"error": apiKey, "success": false, "result": "Unknown API key"});
    }
}