const app = require('firebase-admin')
const DataSeeder = require('./seeder/dataSeeder.js')

process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080'
app.initializeApp()

const isDev = process.env.FUNCTIONS_EMULATOR !== 'production'

if (isDev) {
  const seeder = new DataSeeder(app)
  seeder.initDummyData()
}
