const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "lela.stehr@ethereal.email",
    pass: "A6khEfU4CaKKnS4pEs",
  },
});

class EmailService {
  static async sendMail({ from, to, subject = "Mail", html }) {
    try {
      let info = await transporter.sendMail({
        from: 'ekluv19@gmail.com',
        to,
        subject,
        text: html, // plain text body
        html, // html body
      });
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  }
}

module.exports = EmailService;

