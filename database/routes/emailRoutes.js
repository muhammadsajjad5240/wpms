// below we require express
let express = require('express');
// below we require nodemailer
const nodemailer = require("nodemailer");
const adminSchema = require('../schemas/admin_schema');
// below we create express router
const emailRoutes = express.Router();
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "sajjadkhan42601@gmail.com",
    secure: true,
    pool: true,
    auth: {
        user: process.env.EMAIL || 'sajjadkhan42601@gmail.com',
        pass: process.env.PASSWORD || 'sajjad197'
    }
});
// below we create route to send email
emailRoutes.post('/send', function (req, res) {
    let NameClient = req.body.fullName;
    let userName = req.body.userName;
    let email = req.body.email;
    let clientId = req.body.clientId;
    let phone = req.body.phone;
    let address = req.body.address;
    res.send('Hello World');
    var mailOptions = {
        to: 'muhammadsajjad42601@gmail.com',
        subject: 'Client Detail',
        text: 'WPMS',
        html: "<h2 style='font-size:32px;text-align:center'>Congratulation Your Account Create Successfully</h2><h3 style='font-size:16px;line-height:10px;font-weight:600;'>Your Name :" + NameClient + "</h3><h3  style='font-size:16px;line-height:10px;font-weight:600;'>User Name :" + userName + "</h3><h3>Email :" + email + "</h3> <h3 style='font-size:16px;font-weight:600;line-height:16px;'> Client ID :" + clientId + "</h3><h3  style='font-size:16px;line-height:10px;font-weight:600;'>Phone :" + phone + "</h3><h3  style='font-size:16px;line-height:10px;font-weight:600;'>Address :" + address + "</h3><h3  style='font-size:24px;text-align:center;color:rgb(36, 142, 169);'>OUR CORE SERVICES</h3><p>Every project is an adventure for us but our core expertise lies in the areas of responsive website development, custom CMS websites and eCommerce stores building. We work in the pursuit of service excellence with complete customer satisfaction.</p><h2>Client image</h2>",
        attachments: [
            {   // utf-8 string as an attachment
                // filename: 'Waseem.pdf',
                path: './Waseem.pdf',
                filename: 'emp_1.jpg',
                path: './emp_1.jpg',
                cid: 'emp_1',
            },
        ],
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});
// below route to send account details
emailRoutes.post('/forgetPassword', function (req, res) {
    // let detail;
    let { user_name, forgetemail } = req.body
    adminSchema.find({ $and: [{ "userName": user_name }, { "email": forgetemail }] }).
        sort({ id: -1 }).
        exec(function (err, admin) {
            if (err) return res.json(err)
            let detail = admin;
            console.log(detail[0].fullName);
            let adminName = detail[0].fullName;
            let adminuserName = detail[0].userName;
            let adminemail = detail[0].email
            let adminpassword = detail[0].password;
            var mailOptions = {
                to: 'sajjadkhan42601@gmail.com',
                subject: 'Client Detail',
                text: 'WPMS',
                html: "<h2 style='font-size:32px;text-align:center'>Your Account Detail is given below:</h2><h3 style='font-size:16px;line-height:10px;font-weight:600;'>Your Name :" + adminName + "</h3><h3  style='font-size:16px;line-height:10px;font-weight:600;'>User Name :" + adminuserName + "</h3><h3>Email :" + adminemail + "</h3> <h3 style='font-size:16px;font-weight:600;line-height:16px;'> Password :" + adminpassword + "</h3>",
                // attachments: [
                //     {   // utf-8 string as an attachment
                //         // filename: 'Waseem.pdf',
                //         path: './Waseem.pdf',
                //         filename: 'emp_1.jpg',
                //         path: './emp_1.jpg',
                //         cid: 'emp_1',
                //     },
                // ],
            }
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    res.end("error");
                } else {
                    res.end("sent");
                }
            });
        });
    // // console.log(detail);
    // // let adminName = detail[0].password;
    // // let adminuserName = detail[0].password;
    // // let adminemail = detail[0].password
    // // let adminpassword = detail[0].password;
    // // var mailOptions = {
    // //     to: 'sajjadkhan42601@gmail.com',
    // //     subject: 'Client Detail',
    // //     text: 'WPMS',
    // //     html: "<h2 style='font-size:32px;text-align:center'>Your Account Detail is given below:</h2><h3 style='font-size:16px;line-height:10px;font-weight:600;'>Your Name :" + adminName + "</h3><h3  style='font-size:16px;line-height:10px;font-weight:600;'>User Name :" + adminuserName + "</h3><h3>Email :" + adminemail + "</h3> <h3 style='font-size:16px;font-weight:600;line-height:16px;'> Password :" + adminpassword + "</h3>",
    // //     // attachments: [
    // //     //     {   // utf-8 string as an attachment
    // //     //         // filename: 'Waseem.pdf',
    // //     //         path: './Waseem.pdf',
    // //     //         filename: 'emp_1.jpg',
    // //     //         path: './emp_1.jpg',
    // //     //         cid: 'emp_1',
    // //     //     },
    // //     // ],
    // // }
    // smtpTransport.sendMail(mailOptions, function (error, response) {
    //     if (error) {
    //         res.end("error");
    //     } else {
    //         res.end("sent");
    //     }
    // });
});
// below we export routes
module.exports = emailRoutes;