/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable eol-last */
/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
// import {firestore} from "firebase-admin";

admin.initializeApp();
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

/*
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
*/
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
*/

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
/* exports.newDogAdded = functions.firestore.document("/dogs/{documentId}/")
    .onCreate(async (snap, context) => {
      // Grab the current value of what was written to Firestore.
      // const owner = String(snap.data().owner);
      // functions.logger.log(owner);
      functions.logger.log("Sending email to: ", owner);

      const mailOptions = {
        from: "\"Spammy Corp.\" <noreply@firebase.com>",
        to: "jmugicagonz@hotmail.com",
        subject: "You have added a new Dog",
        text: "A new dog has been added to our database. You can check it on dooglers.xyz/googlers",
      };
      // Building Email message.
      const testSubject = "You have added a new Dog";
      mailOptions.subject = testSubject;
      mailOptions.text = "A new dog has been added to our database. You can check it on dooglers.xyz/googlers";

      try {
        await mailTransport.sendMail(mailOptions);
        functions.logger.log(
            "Email sent to:",
            owner
        );
      } catch (error) {
        functions.logger.error(
            "There was an error while sending the email:",
            error
        );
      }
      // Send back a message that we've successfully written the message
      functions.logger.log("Function is finishing either succesful or with error");
    }); */

exports.newDogAdded = functions.firestore
  .document("/dogs/{documentId}")
  .onUpdate(async (snap, _) => {
    // check if there is minderApplications in the firestore document
    if (!snap.after.data()?.minderApplications) {
      return;
    }

    const applications = snap.after.data().minderApplications;

    // mark the first "pending" as "email-sent"
    for (const application of applications) {
      if (application.status === "pending") {
        snap.after.ref.set(
          {
            minderApplications: [
              ...applications,
              {
                ...application,
                status: "email-sent",
              },
            ],
          },
          { merge: true }
        );

        // send the email to the owner
        const owner = String(snap.after.data().owner);

        functions.logger.log("Sending email to: ", owner);

        const mailOptions = {
          from: "MyDoogler <noreply@firebase.com>",
          to: owner,
          subject: `You have received a new application from ${application.minderEmail}`,
          text: application.message,
        };

        try {
          await mailTransport.sendMail(mailOptions);
          functions.logger.log("Email sent to:", owner);
        } catch (error) {
          functions.logger.error(
            "There was an error while sending the email:",
            error
          );
        }
        break;
      }
    }

    return null;
  });
