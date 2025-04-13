import nodemailer from "nodemailer";
import { resetPasswordEmail } from "./emailTemplate.js";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT, // Change to 587 if using TLS
  secure: true, // `true` for port 465, `false` for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationCode = async (to, subject, text) => {
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text: ` Your email verification code is  ${text} 
     This is valid for 10 minutes .`,
  });
  console.log("Message sent: %s", info.messageId);
};
export const sendResetPasswordEmail = async (
  to,
  subject,
  resetPasswordLink
) => {
  const emailHtml = resetPasswordEmail(resetPasswordLink);
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html: emailHtml,
  });
  console.log("Message sent: %s", info.messageId);
};
