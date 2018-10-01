/*
 * File: /Users/michaelbeeson/Documents/VSCode/react-pwa/geo-bingo-firebase/functions/count-player.js
 */
"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// const countNode = "playerCount";
// const listNode = "playerUserList";
// const pathToCountNode = "/game/{gameId}/playerCount";
// const pathToListNodeChildren = "/game/{gameId}/playerUserList/{uid}";

// const playerCounter = new ListCounter({
//    countNode: "playerCount",
//    listNode: "playerUserList",
//    pathToCountNode: "/game/{gameId}/playerCount",
//    pathToListNodeChildren: "/game/{gameId}/playerUserList/{uid}"
// });
module.exports = class ListCounter {
  constructor(config) {
    if (!config.countNode) {
      throw new Error(
        'config.countNode string missing. Looks like "playerCount"'
      );
    }
    if (!config.listNode) {
      throw new Error(
        'config.listNode string missing. Looks like "playerCount"'
      );
    }
    if (!config.pathToCountNode) {
      throw new Error(
        'config.pathToCountNode string missing. Looks like "playerCount"'
      );
    }
    if (!config.pathToListNodeChildren) {
      throw new Error(
        'config.pathToListNodeChildren string missing. Looks like "playerCount"'
      );
    }
    this.countNode = config.countNode;
    this.listNode = config.listNode;
    this.pathToCountNode = config.pathToCountNode;
    this.pathToListNodeChildren = config.pathToListNodeChildren;

    this.listChangeFunction = functions.database
      .ref(this.pathToListNodeChildren)
      .onWrite(async change => {
        const collectionRef = change.after.ref.parent;
        const countRef = collectionRef.parent.child(this.countNode);

        let increment;
        if (change.after.exists() && !change.before.exists()) {
          increment = 1;
        } else if (!change.after.exists() && change.before.exists()) {
          increment = -1;
        } else {
          return null;
        }

        // Return the promise from countRef.transaction() so our function
        // waits for this async event to complete before it exits.
        await countRef.transaction(current => {
          return (current || 0) + increment;
        });
        console.log(`${this.countNode} updated`);
        return null;
      });

    this.recountFunction = functions.database
      .ref(this.pathToCountNode)
      .onDelete(async snap => {
        const counterRef = snap.ref;
        const collectionRef = counterRef.parent.child(this.listNode);

        // Return the promise from counterRef.set() so our function
        // waits for this async event to complete before it exits.
        const messagesData = await collectionRef.once("value");
        const num = messagesData.numChildren();
        return await counterRef.set(num);
      });
  }
};
