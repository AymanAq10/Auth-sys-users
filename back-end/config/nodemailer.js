// config/nodemailer.js
const nodemailer = require("nodemailer");


// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,// Replace with your email service provider
  auth: {
    user: 'aakartit@gmail.com', // Use the environment variable
    pass: 'ddqvinoejkgitaot', // Use the environment variable
  },
});

module.exports = transporter;

