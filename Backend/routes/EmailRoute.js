const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST /api/email/sendMail
router.post("/sendMail", async (req, res) => {
  const { to, subject = "Authentication code of ZennAura", message } = req.body;

  console.log("Incoming mail request:", { to, subject });

  if (!to || !message) {
    return res.status(400).json({ success: false, message: "Recipient and message are required" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Convert `to` into array if it's a single email
    const recipients = Array.isArray(to) ? to : [to];

    const mailOptions = {
      from: `"ZennAura Team" <${process.env.EMAIL_USER}>`,
      to: recipients.join(','),
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #4CAF50;">Your ZennAura Verification Code</h2>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <p style="margin-top: 30px;">Thank you,<br>ZennAura Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", recipients);
    return res.status(200).json({ success: true, message: "Email(s) sent successfully" });
  } catch (error) {
    console.error("❌ Error sending mail:", error.message);
    return res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
  }
});

module.exports = router;
