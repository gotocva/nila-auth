

const authConfig = require('../../config/auth-config');
const { transport } = require('./index');

const otpContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
            text-align: center;
        }

        p {
            color: #666666;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .otp-code {
            background-color: #f0f0f0;
            padding: 10px 20px;
            text-align: center;
            font-size: 24px;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        .cta-button {
            display: block;
            width: 200px;
            margin: 0 auto;
            background-color: #007bff;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
            border-radius: 4px;
            text-decoration: none;
        }

        .cta-button:hover {
            background-color: #0056b3;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>One Time Password (OTP) for Your Account</h1>
        <p>Dear User,</p>
        <p>Your One Time Password (OTP) is:</p>
        <div class="otp-code">{{OTP_CODE}}</div>
        <p>This OTP is valid for a short period of time. Please do not share it with anyone.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <div class="footer">
            <p>Best regards,<br>NilaJS</p>
        </div>
    </div>
</body>
</html>

`;


const sendOtp = (email, otp) => {

    return new Promise((resolve, reject) => {

        const content = otpContent.replace('{{OTP_CODE}}', otp);


        const mailOptions = {
          from: authConfig.env.SMTP_EMAIL,
          to: email,
          subject: 'Your One Time Password (OTP) for Account Verification',
          html: content
        };
        
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
            return console.log(error);
          }
          console.log(info);
          console.log('Message sent: %s', info.messageId);
          resolve(info);
        });
    })
}



module.exports = {
    sendOtp
}