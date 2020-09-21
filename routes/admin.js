const connection = require("../config");
const db = connection.db;

// Authorisation for admins

module.exports.admin = function(req, res) {
    var apiKey = req.body.key;
    var id = req.body.id;

    // Check API key, if it matches then run script, if not then return error
    if(apiKey == "d85f3d4c6b"){
        db.getConnection(function (error, db){

            // Return from admins table where the id matches the id of the user
            var query = "SELECT * FROM admins WHERE id = ?";

            db.query(query, [id], function (error, results, fields) {
                if(error) throw error;

                // If there is a result then authorise user, if not then don't
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