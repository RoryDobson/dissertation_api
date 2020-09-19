// var nodemailer = require('nodemailer');
// const connection = require("../config");
// const db = connection.db;

// module.exports.send_email = function(req, res) {

//     var apiKey = req.body.key;

//     if (apiKey == "d85f3d4c6b") {
//         db.getConnection(function (err, db) {

//             var query = 'SELECT * FROM users';

//             db.query(query, function (error, results, fields) {
//                 if (error) throw error;

//                 res.send(results);
//             });
//         });
//     } else {
//         res.send({"error": apiKey, "success": false, "result": "Unknown API key"});
//     }

//     // var transporter = nodemailer.createTransport({
//     //     host: 'smtp.mail.yahoo.com',
//     //     // port: 465,
//     //     service: 'yahoo',
//     //     secure: false,
//     //     auth: {
//     //         user: 'rory.dobson@yahoo.com',
//     //         pass: 'mwbtwwievuwoualc'
//     //     },
//     //     debug: false,
//     //     logger: true
//     // });
    
//     // var emails = [
//     //     "rory.dobson@yahoo.com",
//     // ];
    
//     // var text = "To whom it may concern,\n\nI am a Computer Science student about to enter my fourth year, and I am exploring app ideas that I could create as my fourth year project. My initial idea was to create an app that would facilitate communications between hospitals and care homes/rehab housing etc. The idea was that care homes/rehab housing could advertise available spaces at their facility, so that hospital staff, while looking for placements for in-need inpatients, can easily access any spare beds in their local area or further. This idea was based primarily on a difficulty to find available spaces, and as an attempt to prevent unnecessary bed blocking.\n\nAs I explored this idea further, I began to wonder if the project would be viable and if it is a website that would benefit hospitals and care homes alike. I wondered whether you would have any thoughts about this? If the current system is efficient and doesn't need updating, would there be any other apps/websites that I could create that would help with a problem faced by the NHS?\n\nLooking forward to hearing from you, please let me know if there is anyone I should contact that might be able to help.\n\nMany thanks,\nRory Dobson";
    
//     // sendAll(emails);
    
//     // async function sendAll(emails) {
//     //     for(var i = 0, size = emails.length; i < size; i++){
//     //         let result = await sendMail(emails[i]);
//     //         console.log(result);
//     //     }
//     // }
    
//     // async function sendMail(email){
//     //     var mailOptions = {
//     //         from: 'rory.dobson@yahoo.com',
//     //         to: email,
//     //         subject: 'University project to assist the NHS',
//     //         text: text
//     //       };
          
//     //       transporter.sendMail(mailOptions, function(error, info){
//     //         if (error) {
//     //           console.log(error);
//     //           return error;
//     //         } else {
//     //           console.log('Email sent: ' + info.response);
//     //           return info.response;
//     //         }
//     //       });
//     // }
// }