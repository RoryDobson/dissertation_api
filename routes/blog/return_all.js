const connection = require("../../config");
const db = connection.db;

module.exports.return_all = function(req, res) {
    var apiKey = req.body.key;

    if(apiKey == "d85f3d4c6b"){
        db.getConnection(function (error, db){
            var query = 'SELECT * FROM blog';

            db.query(query, function (error, results, fields){
                if(error) throw error;

                res.send({"success": true, "blogs": results, "result": "Blog returned"});
            });
        });
    } else {
        res.send({"success": false, "result": "Unkown API key"});
    }
}