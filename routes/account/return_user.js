const connection = require("../../config");
const db = connection.db;

module.exports.return_user = return_user = (req, res) => {
    var apiKey = req.body.key;
    var id = req.body.id;

    if (apiKey == "d85f3d4c6b") {
        db.getConnection(function (err, db) {

            var query = 'SELECT * FROM users WHERE id = ?';

            db.query(query, [id], function (error, results, fields) {
                if (error) throw error;

                if(results.length === 1){
                    res.send({"id": id, "success": true, "result": "Successful return", "data": results});
                } else {
                    res.send({"id": id, "success": false, "result": "Unknown id"});
                }
            });
        });
    } else {
        res.send({"error": apiKey, "success": false, "result": "Unknown API key"});
    }
}