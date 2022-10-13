const functions = require('firebase-functions')
const app = require('firebase-admin')
const DataSeeder = require('./seeder/dataSeeder.js')
process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080'
app.initializeApp()

const isDev = process.env.FUNCTIONS_EMULATOR !== 'production'
if (isDev) {
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

