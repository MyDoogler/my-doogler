/* eslint-disable eol-last */
/* eslint-disable max-len */
import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jmugicagtest@gmail.com",
    pass: "nalygbvnlwfxjpam",
  },
});

exports.sendEmailDoogler = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = String(req.query.text);
  const mailOptions = {
    from: "\"Spammy Corp.\" <noreply@firebase.com>",
    to: "orankelly@google.com",
    subject: "Rego is on fire",
    text: "this is a test text",
  };
  // Building Email message.
  const testSubject = "This is a test subject";
  mailOptions.subject = testSubject;
  mailOptions.text = original;

  try {
    await mailTransport.sendMail(mailOptions);
    functions.logger.log(
        "Email sent to:",
        "jmugicag@google.com"
    );
  } catch (error) {
    functions.logger.error(
        "There was an error while sending the email:",
        error
    );
  }
  // Send back a message that we've successfully written the message
  res.json({result: "Function is finishing either succesful or with error"});
});
/*
admin.initializeApp();
// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
// Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection("messages").add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document("/messages/{documentId}/")
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log("Uppercasing", context.params.documentId, original);

      const uppercase = original.toUpperCase();

      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });
*/