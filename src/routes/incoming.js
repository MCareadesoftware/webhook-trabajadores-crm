const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

const config = require('../config/configEnvs');

router.post('/answer', twilio.webhook({ validate: false }), (req, res) => {
   // twiml.say('Thank you for calling! Your call is important to us.');
    var callerId = config.twilioPhoneNumber;

    // Add any additional handling or routing logic for incoming calls here
    const twiml = new VoiceResponse();

    // Use <Record> to record the caller's message
     const dial=twiml.dial({callerId:callerId})
 
     dial.client({}, "mc");


    // End the call with <Hangup>

    // Render the response as XML in reply to the webhook request



    res.send(twiml.toString());

  });


  module.exports = router;
