

const nodemailer = require('nodemailer');
const authConfig = require('../../config/auth-config');


const transport = nodemailer.createTransport({
  host: authConfig.env.SMTP_HOST || "smtp.zoho.com",
  port: authConfig.env.SMTP_PORT || 587,
  auth: {
    user: authConfig.env.SMTP_EMAIL || "contact@sivabharathy.in",
    pass: authConfig.env.SMTP_PASSWORD || "ntnxMHjqcYfr"
  }
});

module.exports = {
    transport
}
