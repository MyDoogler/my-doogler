const { https } = require('firebase-functions');

const sendEmail = https.onRequest((req, res) => {
  res.send({ status: 200 });
});

module.exports = sendEmail;