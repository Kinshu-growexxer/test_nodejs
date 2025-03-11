const nodemailer = require("nodemailer");

// Create a transporter using Mailtrap SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: process.env.MAILTRAP_PORT, // e.g., 2525
  auth: {
    user: process.env.MAILTRAP_USER, // Your Mailtrap username
    pass: process.env.MAILTRAP_PASS, // Your Mailtrap password
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: "Natours <admin@natours.io>", // Sender address
    to, // Recipient address
    subject, // Email subject
    text, // Plain text body
    html, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
