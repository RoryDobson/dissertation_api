const connection = require("../../config");
const db = connection.db;

module.exports.delete_token = function(req, res) {
    var apiKey = req.body.key;
    var id = req.body.id;
    
    if (apiKey == "d85f3d4c6b") {
        db.getConnection(function (err, db) {
            var query = 'DELETE FROM tokens WHERE id = ?';

            db.query(query, [id], function (error, results, fields) {
                if (error) throw error;

                res.send({"success": true, "result": "Token successfully deleted"});
            });
        });
    } else {
        res.send({"success": false, "result": "Unknown API key"});
    }
}