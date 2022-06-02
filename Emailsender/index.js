"use strict";
require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing
   let testAccount = await nodemailer.createTestAccount();

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
         user: process.env.GMAIL_USERNAME, // generated ethereal user
         pass: process.env.GMAIL_PASSWORD, // generated ethereal password
      },
   });

   const handlebarOptions = {
      viewEngine: {
         extName: ".handlebars",
         partialsDir: path.resolve(__dirname, "view"),
         defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "view"),
      extName: ".handlebars",
   };

   transporter.use("compile", hbs(handlebarOptions));

   // send mail with defined transport object
   let info = await transporter.sendMail({
      from: "Jaye labandia <labandiajaye@gmail.com>", // sender address
      to: "backendf@gmail.com", // list of receivers
      subject: "Email example of node js", // Subject line
      text: "Hello world?", // plain text body
      // html: "<b>Hello world?</b>", // html body
      template: "index",
   });

   console.log("Message sent: %s", info.messageId);
   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

   // Preview only available when sending through an Ethereal account
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
