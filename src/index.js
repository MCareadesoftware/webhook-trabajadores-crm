const express = require('express');
const ngrok = require('@ngrok/ngrok');
var bodyParser = require('body-parser');
var cors = require("cors");

var token = require('./routes/token');
var call = require('./routes/call');
var incoming = require('./routes/incoming');

const localtunnel = require('localtunnel');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/token', token);
app.use('/call', call);

app.use('/incoming', incoming);


// Create an Express route
app.get('/', (req, res) => {
  res.send('Monstruo Creativo Webhook server');
});
// Start the Express server
const server = app.listen(port, () => {
  console.log(`Node.js web server at ${port} is running...`);
  



  // Get your endpoint online with ngrok
  // ngrok.connect({
  //   addr: port,
  //   authtoken: process.env.NGROK_AUTH_TOKEN, // Use your ngrok auth token here
  // })
  // .then((url) => {
  //   console.log(`Ingress established at: ${url.url()}`);
  // })
  // .catch((error) => {
  //   console.error('Error establishing ngrok connection:', error);
  //   process.exit(1);
  // });
});

// Handle process termination to close ngrok tunnel
process.on('SIGTERM', () => {
  if (server) {
    server.close(() => {
      console.log('Express server closed.');
      ngrok.disconnect();
      process.exit(0);
    });
  }
});