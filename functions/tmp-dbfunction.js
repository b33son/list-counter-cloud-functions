/*
 * File: /Users/michaelbeeson/Documents/VSCode/react-pwa/geo-bingo-firebase/functions/tmp-dbfunction.js
 */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.simpleDbFunction = functions.database
  .ref("/review/{gameId}")
  .onCreate((snap, context) => {
    //const databaseRef = firebase.database().ref();
    const gameId = context.params.gameId;
    const rootRef = snap.ref.root;

    rootRef
      .child("bingo")
      .child("-LM4HJeE-MUqUIqU54Ew")
      .orderByKey()
      .on("value", bingoSnap => {
        console.log("bingoSnap", bingoSnap);
      });

    console.log("context", context);
    if (context.authType === "ADMIN") {
      // do something
    } else if (context.authType === "USER") {
      console.log(snap.val(), "written by", context.auth.uid);
    }
    return snap.ref.update({ text: "this updated from simpleDbFunction 2" });
  });
