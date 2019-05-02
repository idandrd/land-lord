import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
export const addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  await sendEmail(original);
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin
    .database()
    .ref("/messages")
    .push({ original });
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});

async function sendEmail(title: string) {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const sendGridApiKey = functions.config().sendgrid.key;
  sgMail.setApiKey(sendGridApiKey);
  const msg = {
    to: "idandrd@gmail.com",
    from: "LandLord@landlord.com",
    subject: `${title} LandLord Daily Tasks`,
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>You have some tasks you need to do today!</strong>"
  };
  await sgMail.send(msg);
}
