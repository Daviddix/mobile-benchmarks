const dotenv = require("dotenv")
const {Resend} = require("resend");
const otpModel = require("../models/otp.model");
const resend = new Resend(process.env.RESEND_API_KEY);

function generateOtp(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sentOtpEmailWithResend(emailAddress, otpNumber, username){
    try {
        const { data, error } = await resend.emails.send({
      from: 'Mobile Benchmarks <auth@marketing.nsikandavid.dev>',
      to: emailAddress,
      subject: 'Your Mobile Benchmarks Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hi ${username},</h2>
          <p>Your verification code for Mobile Benchmarks is:</p>
          <h1 style="font-size: 42px; letter-spacing: 5px; text-align: center; padding: 15px; background: #f1f1f1; border-radius: 5px;">${otpNumber}</h1>
          <p>This code will expire in 5 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
          <p>Regards,<br>Mobile Benchmarks Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email with Resend:', error);
      throw new Error('Failed to send OTP email');
    }

    return data;        
    } catch (error) {
        console.log(error)
        throw new Error("Couldn't send email")
    }
}

async function OtpIsVerified(userId, otpToVerify) {
  const otpRecord = await otpModel.findOne({ userId });

  console.log("OTP document is", otpRecord)
  console.log("user provided OTP is", otpToVerify)
  console.log("user id to check against OTP is", userId)
  
  if (!otpRecord) {
    return false;
  }
  
  if (otpRecord.otp === otpToVerify.toString()) {
    await otpModel.deleteOne({ userId });
    return true;
  }
  
  return false;
}

module.exports = {
    generateOtp,
    sentOtpEmailWithResend,
    OtpIsVerified
}