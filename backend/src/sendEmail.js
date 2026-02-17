const dotenv = require("dotenv");
let nodemailer = require("nodemailer");

dotenv.config();

const { EMAIL, EMAIL_PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});
let mailOptions = {
  from: EMAIL,
  subject: "Sending Email using Node.js",
};

async function sendMail({ to, html }) {
  try {
    const sendingEmail = await transporter.sendMail({
      ...mailOptions,
      to,
      html,
    });
    return sendingEmail;
  } catch {
    throw error;
  }
}

module.exports = sendMail;
