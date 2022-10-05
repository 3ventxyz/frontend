const app = require('firebase-admin')
const { faker } = require('@faker-js/faker')


// console.log('==================ENV VARS==================')
// console.log(process.env);
// console.log('==================')

process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080'
app.initializeApp({
  projectId: 'vent-d1d85'
})
const db = app.firestore()
const auth = app.auth()
const storage = app.storage()

//function setCreatedDummyEvents(){}
//function setRegisteredAttendeesToDummyEvents(){}
//function setRegisteredDummyEvents(){}
//function setResgiteredUserToDummyEvents(){}


/*
 * !!!other functions create for seeding and different testing:
 * create events that are close to the start date and during time event
 * register user to events that are close to the start date or during the time event happening.
 */

function setDummyAuthUser() {
  try {
    auth.createUser()

    console.log('database seed was successful')
  } catch (error) {
    console.log(error, 'database seed failed')
  }
}

//inside each user, it must have these collections
// created_events, upcoming_events(registered),
//  past_events(registered events that the user has created)

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

function setDummyEventsCollectionInDB() {
  // after this function is set you need to set a collection of created registered attendees. with its own data take your time.
  // description: faker.name.firstName() + ' ' + faker.name.lastName(),
  try {
    ;[...Array(20).keys()].map(() =>
      db.collection('events').add({
        description: faker.commerce.productDescription(),
        end_date: '',
        start_date: '',
        img_url:'',
        title: faker.commerce.productName(),
        uid:'owner of the event',
        tickets_max: 0,
        event_id: '',
        description: faker.commerce.productDescription(),
        location: {
          address: faker.address.streetAddress(),
          lat: faker.address.latitude(),
          long: faker.address.longitude(),
        }
      })
    )
    console.log('database seed was successful')
  } catch (error) {
    console.error(error, 'database seed failed')
  }
}


setDummyUsersInDB()
setDummyEventsCollectionInDB()
