const Contact = require('../Modals/contact')
const nodemailer = require("nodemailer");
require("dotenv").config()

exports.getContacts= async(req,res) =>{
console.log("inside getContacts ");
try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Contact({
       name, email, subject, message 
      });
    await newMessage.save();
    console.log("Message saved to MongoDB");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    const mailOptions = {
        from: `"${req.body.name}"`,
        to: process.env.EMAIL_USER,
        subject: req.body.subject,
        text: `You received a new message from ${req.body.name} (${req.body.email}):\n\n${req.body.message}`,
        replyTo: req.body.email,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}