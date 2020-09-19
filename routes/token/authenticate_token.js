const connection = require("../../config");
const db = connection.db;

const decryption = require("../../encryption/decrypt");
decryption.decrypt;

module.exports.authenticate_token = function(req, res) {
    var token = req.body.token;
    var apiKey = req.body.key;

    if(apiKey == "d85f3d4c6b"){
        db.getConnection(function (error, db){
            var query = "SELECT * FROM tokens";

            db.query(query, function (error, results, fields) {
                if(error) throw error;
                var success = false;

                console.log(results);
                for(var i = 0, size = results.length; i < size; i++){
                    if(token == decrypt(JSON.parse(results[i].token))){
                        res.send({"id": results[i].id, "success": true, "result": "Authentication accepted"});
                        success = true;
                    }
                }

                if(!success){
                    res.send({"success": false, "result": "Authentication failed"});
                }
            });
        });
    } else {
        res.send({"success": false, "result": "Unknown API key"});
    }
}