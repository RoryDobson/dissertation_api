var nodemailer = require('nodemailer');

module.exports.send_email = function(req, res) {

    var apiKey = req.body.key;
    var user_email = req.body.email;
    var subject = req.body.subject;
    var content = req.body.content;

    if (apiKey == "d85f3d4c6b") {
        var transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            // port: 465,
            service: 'yahoo',
            secure: false,
            auth: {
                user: 'rory.dobson@yahoo.com',
                pass: 'mwbtwwievuwoualc'
            },
            debug: false,
            logger: true
        });
        
        var emails = [
            "rmd5@hw.ac.uk",
        ];
        
        sendAll(emails);
        
        async function sendAll(emails) {
            for(var i = 0, size = emails.length; i < size; i++){
                let result = await sendMail(emails[i]);
                console.log(result);
            }
        }
        
        async function sendMail(email){
            var mailOptions = {
                from: 'rory.dobson@yahoo.com',
                to: email,
                subject: subject,
                text: content + "\n\n" + user_email
            };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  return error;
                } else {
                  console.log('Email sent: ' + info.response);
                  return info.response;
                }
            });
        }
    } else {
        res.send({"error": apiKey, "success": false, "result": "Unknown API key"});
    }
}