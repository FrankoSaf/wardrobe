const nodemailer = require("nodemailer");
const ExpressError = require("../ExpressError");

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const emailSender = async (mailTo, userId) => {
  try {
    await transporter.sendMail({
      from: '"Hello from us" <franko.safradin@hotmail.com>', // sender address
      to: mailTo, // list of receivers
      subject: "Please verify your email address", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Welcome to Worldrobe <a href="http://localhost:5000/auth/verify/${userId}">link</a><p>`, // html body
    });
  } catch (err) {
    throw new ExpressError(err);
  }
};

module.exports = { emailSender };
