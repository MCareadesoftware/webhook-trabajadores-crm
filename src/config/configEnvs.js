
require("dotenv").config();

module.exports = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    appSid: process.env.TWILIO_APP_SID,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET,
    server: process.env.SERVER,
    port: process.env.PORT || 3000,
  };    