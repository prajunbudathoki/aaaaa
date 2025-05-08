import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

// Create a transporter for SMTP
const transporter = createTransport({
  host: "localhost",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(options: Omit<Mail.Options, "from">) {
  return await transporter.sendMail({
    from: '"Big Bracket Pvt. Ltd" noreply@bigbracker.io',
    ...options,
  });
}
