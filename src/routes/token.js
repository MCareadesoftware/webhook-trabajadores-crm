const express = require('express');
const router = express.Router();

const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const config = require('../config/configEnvs');

// GET /token/generate
router.post('/generate', function (req, res) {
    const page = req.body.page;
    const clientName = "mc";
    const worker = req.body.worker

    console.log(worker)
    console.log(page)

    const accessToken = new AccessToken(config.accountSid, config.apiKey, config.apiSecret);
    accessToken.identity = clientName;
    accessToken.worker = worker

    const grant = new VoiceGrant({
      outgoingApplicationSid: config.appSid,
      incomingAllow: true,

    });
    accessToken.addGrant(grant);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ token: accessToken.toJwt() }));
});

module.exports = router;
