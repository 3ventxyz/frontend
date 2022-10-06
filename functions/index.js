const functions = require('firebase-functions')
const app = require('firebase-admin')
const { faker } = require('@faker-js/faker')

process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080'
app.initializeApp()
const auth = app.auth()
const db = app.firestore()

if (process.env.FUNCTIONS_EMULATOR) {
  console.log('We are running emulators locally.')
  function setDummyEventsCollectionInDB() {
    try {
      ;[...Array(20).keys()].map(() => {
        var firstWord = faker.commerce.product()
        var randomIdNum = Math.floor(Math.random() * 909)
        var randomCapTickets = Math.floor(Math.random() * 21)
        var currentDate = new Date()
        var startDate = faker.date.between(
          currentDate,
          '2025-01-01T00:00:00.000Z'
        )
        var endDate = faker.date.between(startDate, '2025-01-01T00:00:00.000Z')
        var eventYear = startDate.getUTCFullYear()
        var eventId =
          firstWord + '-' + 'event' + '-' + eventYear + '-' + randomIdNum
        var eventTitle = firstWord + ' event ' + eventYear
        db.collection('events').add({
          description: faker.commerce.productDescription(),
          end_date: endDate,
          start_date: startDate,
          img_url: faker.image.abstract(640, 640, true),
          title: eventTitle,
          uid: 'owner of the event',
          tickets_max: randomCapTickets,
          event_id: eventId,
          description: faker.commerce.productDescription(),
          location: {
            address: faker.address.streetAddress(),
            lat: faker.address.latitude(),
            long: faker.address.longitude()
          }
        })
      })
      console.log('database seed was successful')
    } catch (error) {
      console.error(error, 'database seed failed')
    }
  }

  // function setDummyAuthUser() {
  //   //looks like any change made, it will be recalled here
  //   //try to add a conditional for this function so it cannot
  //   //throw another error again.
  //   try {
  //     auth.createUser({
  //       emailVerified: false,
  //       phoneNumber: '+12223334444',
  //       password: '1234567890',
  //       disabled:false,
  //     })
  //     console.log('Test auth user added')
  //   } catch (error) {
  //     console.log(error, 'database seed failed')
  //   }
  // }

  function setDummyUsersInDB() {
    try {
      ;[...Array(10).keys()].map(() => {
        db.collection('users').add({
          avatar: faker.internet.avatar(),
          bio: faker.commerce.productDescription(),
          discord_guilds: [],
          discord_id: '',
          discord_verified: false,
          email: faker.internet.email(),
          location: {
            address: '123 test st.',
            lat: faker.address.latitude(),
            long: faker.address.longitude()
          },
          organizations: [],
          phone_number: faker.phone.number('+###-###-#####'),
          qr_code: '',
          siwe_expiration_time: '',
          twitter_id: '',
          twitter_verified: false,
          username: faker.internet.userName(),
          wallet: ''
        })
      })
      console.log('setDummyUsersInDB: seed was successful')
    } catch (error) {
      console.error(error, 'database seed failed')
    }
  }

  setDummyEventsCollectionInDB()
  setDummyUsersInDB()
  // setDummyAuthUser()
}

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})
exports.helloWorld2 = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs2!', { structuredData: true })
  response.send('Hello from Firebase2!')
})
