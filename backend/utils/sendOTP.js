const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: `"Instagram Clone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Verification Code",
    html: `
      <h2>Email Verification</h2>

        <p>Hello,</p>

  <p>Your verification code is</p>

  <h1
    style="
      letter-spacing:8px;
      color:#4f46e5;
    "
  >
  ${otp}
  </h1>

  <p>
    This code will expire in 5 minutes.
  </p>

  <p>
    If you didn't request this, ignore this email.
  </p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
