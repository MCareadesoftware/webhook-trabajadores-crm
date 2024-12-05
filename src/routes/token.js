const express = require('express');
const router = express.Router();

const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const config = require('../config/configEnvs');

// GET /token/generate
router.post('/generate', function (req, res) {
    const clientName = "mc";

    const accessToken = new AccessToken(config.accountSid, config.apiKey, config.apiSecret, {
      ttl: 72000 // 20 horas de tiempo de expiración del token
    });

    accessToken.identity = clientName;

    const grant = new VoiceGrant({
      outgoingApplicationSid: config.appSid,
      incomingAllow: true,
    });

    accessToken.addGrant(grant);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ token: accessToken.toJwt() }));
});

module.exports = router;
