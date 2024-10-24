const nodemailer = require("nodemailer");
const path = require("path");

// Configuration
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "92a2116578a55c",
    pass: "d36abda854f025",
  },
});

// Function to send email
const sendEmail = (to, subject, text, attachments = []) => {
  const mailOptions = {
    from: "cinemax_manila@gmail.com",
    to: to,
    subject: subject,
    text: text,
    // Add html content if needed
    html: `<p>${text}</p>`,
    attachments: attachments.map((file) => ({
      filename: file.originalname,
      path: file.path,
      contentType: file.mimetype,
      disposition: "attachment", // Ensures it's sent as an attachment
    })),
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
