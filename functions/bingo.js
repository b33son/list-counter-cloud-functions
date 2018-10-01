"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

module.exports = functions.database
  .ref("/review/{gameId}/confirmedCount")
  .onUpdate(async snap => {
    const counterRef = snap.ref;
    const collectionRef = counterRef.parent.child(this.listNode);

    // Return the promise from counterRef.set() so our function
    // waits for this async event to complete before it exits.
    const messagesData = await collectionRef.once("value");
    const num = messagesData.numChildren();
    return await counterRef.set(num);
  });
