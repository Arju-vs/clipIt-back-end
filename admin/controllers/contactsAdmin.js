const Contact = require("../../Modals/contact")
const nodemailer = require("nodemailer");


exports.submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // 1. Save to MongoDB
    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    // 2. Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Compose confirmation mail
    const mailOptions = {
      from: `"ClipIt Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your message: ${subject}`,
      text: `Hello ${name},\n\nThank you for contacting us. Here's what we received:\n\nSubject: ${subject}\nMessage: ${message}\n\nWe'll get back to you shortly.\n\n- ClipIt Support Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message submitted and confirmation email sent." });
  } catch (error) {
  res.status(500).json({ error: "Internal server error" });
}
};



exports.getContacts = async(req, res)=>{
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
      }
}

exports.sendReply = async (req, res) => {
    const { messageId, email, subject, message } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"ClipIt Support" <your_admin_email@gmail.com>`,  // Your verified Gmail
            to: email,  
            subject: subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);

        const updatedContact = await Contact.findByIdAndUpdate(
            messageId,
            { status: "Replied" },
            { new: true } // Return the updated document
          );
          console.log(updatedContact);
          
     
        const sendTestEmail = async () => {
            try {
                await transporter.verify();
                console.log("Email server is ready to send emails!");
            } catch (error) {
                console.error("Email server error:", error);
            }
        };
        
        sendTestEmail();

        return res.status(200).json({ success: true, message: "Reply sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        return res.status(500).json({ error: "Failed to send reply" });
    }
  };