import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from 2Firebase!");
});


export const helloWorld2 = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs2!", {structuredData: true});
  response.send("Hello from 3Firebase at the second function!");
});
