const functions = require('firebase-functions')
const app = require('firebase-admin')
const DataSeeder = require('./seeder/dataSeeder.js')
process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080'
app.initializeApp()

if (process.env.FUNCTIONS_EMULATOR) {
  const seeder = new DataSeeder(app)
  seeder.initDummyData()
}

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})
exports.helloWorld2 = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs2!', { structuredData: true })
  response.send('Hello from Firebase2!')
})

exports.isFirebaseEmulatorsRunning = functions.https.onRequest(()=>{
  if(process.env.FUNCTIONS_EMULATOR){
    //how can you retrieve a value from the firebase cloud functions to 
    //the front end??
    return true;
  }
  return false;
})
