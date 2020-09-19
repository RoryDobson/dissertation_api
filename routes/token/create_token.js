const crypto = require('crypto');
const connection = require("../../config");
const db = connection.db;

const encryption = require("../../encryption/encrypt");
encryption.encrypt;

module.exports.create_token = function(req, res) {
    var apiKey = req.body.key;
    var id = req.body.id;
    var secret = crypto.randomBytes(32).toString('hex');

    if(apiKey == "d85f3d4c6b"){
        db.getConnection(function (error, db){
            var query = 'SELECT * FROM tokens WHERE id = ?';
            var token = encrypt(secret);

            db.query(query, [parseInt(id)], function (error, results, fields){
                if (error) throw error;

                if(results.length == 0){
                    var query = 'INSERT INTO tokens SET ?';
                    post = {"token": JSON.stringify(token), "id": id};
        
                    db.query(query, post, function (error, results, fields) {
                        if (error) throw error;
        
                        res.send({ "token": secret, "success": true, "result": "Token generated"});
                    });
                } else {
                    var query = 'DELETE FROM tokens WHERE id = ?';
        
                    db.query(query, [id], function (error, results, fields) {
                        if (error) throw error;
                        
                        var query = 'INSERT INTO tokens SET ?';
                        post = {"token": JSON.stringify(token), "id": id};
            
                        db.query(query, post, function (error, results, fields) {
                            if (error) throw error;
            
                            res.send({ "token": secret, "success": true, "result": "Token generated"});
                        });
                    });
                }
            });
        });
    }
}