const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;

const config = require("../config/configEnvs");

// POST /calls/connect
router.post(
  "/connect",
  twilio.webhook({ validate: false }),
  function (req, res, next) {
    console.log(`Received request: ${req.method} ${req.url}`);

    console.log(req.body)

    var phoneNumber = req.body.phoneNumber;
    var callerId = config.twilioPhoneNumber;
    var workerId = req.body.workerId
    var twiml = new VoiceResponse();

    console.log(`${config.server}/api/twilioMiddleware/storeRecordings?workerId=${workerId}&phoneNumber=${phoneNumber}`)

    //Testeo
    var dial = 
    twiml.dial({ 
      callerId: callerId,
      record: "record-from-answer",
      recordingStatusCallback: `${config.server}/api/twilioMiddleware/storeRecordings?workerId=${workerId}&phoneNumber=${phoneNumber}`,
      recordingStatusCallbackMethod: "POST"
    });

    if (phoneNumber) {
      dial.number({}, phoneNumber);
    } else {
      dial.client({}, "mc");
      twiml.say(
        { language: "es-US", voice: "Polly.Penelope" },
        "Gracias por llamar a Monstruo Creativo"

      );
      


      // dial.client({}, "support_agent");
    }

    res.send(twiml.toString());
  }
);

module.exports = router;
