/* eslint-disable eol-last */
/* eslint-disable max-len */
import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
// Imports the Google Cloud client library
import {PubSub} from "@google-cloud/pubsub";

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

/**
* Placeholder for documentation
* @param {any} data
* @param {any} pubSubClient
* @param {any} topicNameOrId
*/
async function publishMessage(data:any, pubSubClient:any, topicNameOrId:any) {
// Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);
  try {
    const messageId = await pubSubClient
        .topic(topicNameOrId)
        .publishMessage({data: dataBuffer});
    console.log(`Message ${messageId} published.`);
  } catch (error:any) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

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

exports.createTopicPublish = functions.https.onRequest(async (req, res) => {
  /**
  * TODO(developer): Uncomment these variables before running the sample.
   */
  const topicNameOrId = "dooglerTestTopic";
  const data = JSON.stringify({foo: "bar"});

  // Creates a client; cache this for further use
  const pubSubClient = new PubSub();

  try {
    await publishMessage(data, pubSubClient, topicNameOrId);
    functions.logger.log(
        "Function has been run"
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