import nodemailer from "nodemailer";
import { randomInt, createHash } from "crypto";

export function generateOTP(length = 6) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += randomInt(0, 10);
  }
  return otp;
}

export function hashOtp(otp: string) {
  return createHash("sha256").update(otp).digest("hex");
}

export async function sendVerificationEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"CAPTCHA Solver" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <p>Your verification code:</p>
      <h2 style="letter-spacing: 4px">${otp}</h2>
      <p>This code expires in 2 minutes.</p>
      <p>If you didn't request this code, you can safely ignore this email.</p>
    `,
  });
}
