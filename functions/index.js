const functions = require('firebase-functions')
const app = require('firebase-admin')
const DataSeeder = require('./seeder/dataSeeder.js')
const { default: next } = require('next')
process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080'
app.initializeApp()

const isDev = process.env.FUNCTIONS_EMULATOR !== 'production'
const server = next({ dev: isDev, conf: { distDir: '.next' } })
const nextjsHandle = nextApp.getRequestHanlder()
if (isDev) {
  const seeder = new DataSeeder(app)
  seeder.initDummyData()
}

exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res))
})

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})
exports.helloWorld2 = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs2!', { structuredData: true })
  response.send('Hello from Firebase2!')
})

// exports.isFirebaseEmulatorsRunning = functions.https.onRequest(() => {
//   if (process.env.FUNCTIONS_EMULATOR) {
//     //how can you retrieve a value from the firebase cloud functions to
//     //the front end??
//     return true
//   }
//   return false
// })
