import dotenv from "dotenv";
import cron from "node-cron";
import nodemailer from "nodemailer";
dotenv.config();

// Load environment variables
const { GMAIL_USER, GMAIL_PASS, GMAIL_TO } = process.env;

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// Email options
const mailOptions = {
  from: GMAIL_USER,
  to: GMAIL_TO,
  subject: "Cron Test Email",
  text: "This is a test email sent every 1 minutes using Node.js cron job.",
};

// Run every 5 mins
cron.schedule("*/1 * * * *", () => {
  console.log("⏰ Sending email...");
  transporter
    .sendMail(mailOptions)
    .then((info) => console.log("✅ Email sent:", info.response))
    .catch((error) => console.error("❌ Error sending email:", error));
});

console.log("🚀 Cron job started. Emails will be sent every 1 minutes.");
