const connection = require("../../config");
const db = connection.db;

module.exports.upload = function(req, res) {
    var apiKey = req.body.key;
    var title = req.body.title;
    var content = req.body.content;
    var date = req.body.date;

    if(apiKey == "d85f3d4c6b"){
        db.getConnection(function (error, db){
            var query = 'INSERT INTO blog SET ?';

            var post = {"date": date, "title": title, "content": content}

            db.query(query, post, function (error, results, fields){
                if(error) throw error;

                res.send({"success": true, "blogs": results, "result": "Entry uploaded"});
            });
        });
    } else {
        res.send({"success": false, "result": "Unkown API key"});
    }
}