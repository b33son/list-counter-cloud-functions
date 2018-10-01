// const dbFunction = require("./tmp-dbfunction");
// exports.simpleDbFunction = dbFunction.simpleDbFunction;

// const countPlayer = require("./count-player");
// exports.countPlayerChange = countPlayer.countPlayerChange;
// exports.recountPlayers = countPlayer.recountPlayers;

const ListCounter = require("./list-counter");
const playerCounter = new ListCounter({
  countNode: "playerCount",
  listNode: "playerUserList",
  pathToCountNode: "/review/{gameId}/playerCount",
  pathToListNodeChildren: "/review/{gameId}/playerUserList/{uid}"
});
exports.countPlayerChange = playerCounter.listChangeFunction;
exports.recountPlayers = playerCounter.recountFunction;

const confirmedCounter = new ListCounter({
  countNode: "confirmedCount",
  listNode: "confirmedList",
  pathToCountNode: "/review/{gameId}/confirmedCount",
  pathToListNodeChildren: "/review/{gameId}/confirmedList/{uid}"
});
exports.countConfirmedChange = confirmedCounter.listChangeFunction;
exports.recountConfirmed = confirmedCounter.recountFunction;

const disputedCounter = new ListCounter({
  countNode: "disputedCount",
  listNode: "disputedList",
  pathToCountNode: "/review/{gameId}/disputedCount",
  pathToListNodeChildren: "/review/{gameId}/disputedList/{uid}"
});
exports.countDisputedChange = disputedCounter.listChangeFunction;
exports.recountDisputed = disputedCounter.recountFunction;

///////// EXAMPLE & NOTES ////////////

//   Testing Firebase Cloud Functions
//    * Overview: https://firebase.google.com/docs/functions/unit-testing
//    * Example: https://github.com/firebase/functions-samples/tree/master/quickstarts/uppercase/functions/test

//  https://rominirani.com/google-cloud-functions-tutorial-using-the-local-functions-emulator-bd351bbe61de

// b33-mbp:geo-bingo-firebase b33$ functions debug simpleDbFunction - DEPRECIATED

//  Set a breakpoint. Should trigger breakpoint when running the following:

// b33-mbp:geo-bingo-firebase b33$ functions inspect simpleDbFunction
//  In VSCode, create attach Node.js debugger. Launch.json:
// {
//   "type": "node",
//   "request": "attach",
//   "name": "Attach",
//   "port": 9229
// }
// b33-mbp:geo-bingo-firebase b33$ functions call simpleDbFunction

// b33-mbp:geo-bingo-firebase b33$ functions call simpleDbFunction --data '{"params": {"gameId": "-LM4HJeE-MUqUIqU54Ew"}}'
