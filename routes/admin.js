const connection = require("../config");
const db = connection.db;

module.exports.admin = function(req, res) {
    var apiKey = req.body.key;
    var id = req.body.id;

    if(apiKey == "d85f3d4c6b"){
        db.getConnection(function (error, db){
            var query = "SELECT * FROM tokens";

            db.query(query, function (error, results, fields) {
                if(error) throw error;

                if(results.length === 1){
                    res.send({"success": true, "result": "User authorised"});
                } else {
                    res.send({"success": false, "result": "User unauthorised"});
                }
            });
        });
    } else {
        res.send({"success": false, "result": "Unknown API Key"});
    }
}