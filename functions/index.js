const functions = require('firebase-functions')
const app = require('firebase-admin')
const { faker } = require('@faker-js/faker')
process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080'
app.initializeApp({
  projectId: 'vent-d1d85'
})
const auth = app.auth()
const db = app.firestore()

console.log('firebase emulator running!!')
console.log('!!!!!!!PLEASE SHOW THIS!!!!!!!!!!!!!!!!!!!!!!!')

function setDummyEventsCollectionInDB() {
  try {
    ;[...Array(20).keys()].map(() =>
      db.collection('events').add({
        description: faker.commerce.productDescription(),
        end_date: '',
        start_date: '',
        img_url: '',
        title: faker.commerce.productName(),
        uid: 'owner of the event',
        tickets_max: 0,
        event_id: '',
        description: faker.commerce.productDescription(),
        location: {
          address: faker.address.streetAddress(),
          lat: faker.address.latitude(),
          long: faker.address.longitude()
        }
      })
    )
    console.log('database seed was successful')
  } catch (error) {
    console.error(error, 'database seed failed')
  }
}
setDummyEventsCollectionInDB()

function setDummyAuthUser() {
  try {
    auth.createUser({
      // uid: 'p2HmtVUTSwQ6PTniP9sIGjfs26f1',
      emailVerified: false,
      // phoneNumber: '+11234567890',
      phoneNumber: '+12223334444',
      password: '1234567890',
      disabled:false,
    })
    console.log('Test auth user added')
  } catch (error) {
    console.log(error, 'database seed failed')
  }
}
setDummyAuthUser()

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})
exports.helloWorld2 = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs2!', { structuredData: true })
  response.send('Hello from Firebase2!')
})
