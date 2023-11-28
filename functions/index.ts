import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {getEmailData} from "../app/components/emailData";

admin.initializeApp();

exports.sendEmail = functions.firestore
  .document("mail/{docId}")
  .onCreate(async (snap: functions.firestore.DocumentSnapshot) => {
    // Get the email address from the document
    const emailAddress = snap.get("email");

    // Generate the email data
    const emailData = getEmailData(emailAddress);

    // Add the email data to the document
    return snap.ref.set(emailData, {merge: true});
  });
