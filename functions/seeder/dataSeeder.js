const { faker } = require('@faker-js/faker')

module.exports = class DataSeeder {
  constructor(firebaseApp) {
    this.app = firebaseApp
    this.db = this.app.firestore()
    this.auth = this.app.auth()
  }
  user1UID = ' '
  user2UID = ' '

  async setDummyAuthUser(email, phoneNumber, password) {
    var strippedUID = ' '
    var isUserCreated = true
    try {
      //check if a dummy user has been created with this email,
      //if it does return right away its uid
      var userData = await this.auth.getUserByEmail(email).catch((error) => {
        isUserCreated = false
        console.log(error, 'user not created, creating user')
        console.log(error, 'user not created, creating user')
      })
      if (isUserCreated) {
        console.log('user already created data:', userData)
        console.log('user id :', userData.uid)
        return userData.uid
      }
      var docSnap = await this.auth
        .createUser({
          emailVerified: true,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          disabled: false
        })
        .catch((error) => {
          console.log(error, 'setDummyAuthUserError: ' + phoneNumber)
        })
      if (docSnap) {
        strippedUID = `${docSnap.uid}`
        await this.db
          .collection('users')
          .doc(`${docSnap.uid}`)
          .set({
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
            phone_number: phoneNumber,
            qr_code: '',
            siwe_expiration_time: '',
            twitter_id: '',
            twitter_verified: false,
            username: faker.internet.userName(),
            wallet: ''
          })
      }
    } catch (error) {
      console.log(error, 'auth seed failed')
    }
    return strippedUID
  }

  async setDummyUsersInDB() {
    try {
      ;[...Array(10).keys()].map(() => {
        this.db.collection('users').add({
          avatar: faker.internet.avatar(),
          bio: faker.commerce.productDescription(),
          discord_guilds: [],
          discord_id: '',
          discord_verified: false,
          email: faker.internet.email(),
          location: {
            address: '123 dummy st.',
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

  setDummyEventsCollectionInDB() {
    try {
      ;[...Array(10).keys()].map((index) => {
        var adjective = faker.word.adjective(5)
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
          adjective +
          '' +
          firstWord +
          '-' +
          'event' +
          '-' +
          eventYear +
          '-' +
          randomIdNum
        var eventTitle = adjective + ' ' + firstWord + ' event ' + eventYear
        this.db
          .collection('events')
          .doc(`${eventId}`)
          .set({
            description: faker.commerce.productDescription(),
            end_date: endDate,
            start_date: startDate,
            img_url: faker.image.abstract(640, 640, true),
            title: eventTitle,
            uid: index % 2 === 0 ? this.user1UID : this.user2UID,
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

  async setDummyEventsToUserPropietaryDB() {
    //first get the seeded dummyevents from the events collection.
    const eventsRef = this.db.collection('events')
    var eventsDocs = await eventsRef.get()
    console.log('checking eventsRef is empty:', eventsRef.empty)
    console.log('eventsDocs obtained')
    console.log(eventsDocs)
    console.log('===========================')
    eventsDocs.forEach((doc) => {
      var docData = doc.data()
      console.log('===================setting data========')
      console.log('event Id:', doc.id)
      console.log('event uid:', docData['uid'])
      console.log(docData)
      console.log('===========================')
      if (docData['uid'] === this.user1UID) {
        this.db
          .collection(`users/${docData['uid']}/upcoming_events`)
          .doc(`${doc.id}`)
          .set({
            end_date: docData['end_date'],
            event_ref: this.db.doc(`events/${doc.id}`),
            event_title: docData['title'],
            start_date: docData['start_date']
          })
      } else if (docData['uid'] === this.user2UID) {
        this.db
          .collection(`users/${docData['uid']}/upcoming_events`)
          .doc(`${doc.id}`)
          .set({
            end_date: docData['end_date'],
            event_ref: this.db.doc(`events/${doc.id}`),
            event_title: docData['title'],
            start_date: docData['start_date']
          })
      }
    })
    //then iterate through each retrieved event.
    //if an event has the same uid from user1UID, add the event to the UID database from the users collection.
    //it will be added inside the upcoming_events collection, from the UID doc.
  }

  registerDummyUsersToEvents() {
    //iterate through the list, and as long that is not from the main
    //auth users. then update.

    //data to add in the registered_attendees collection for each event doc
    // --address:
    // --city:
    // --first_name:
    // --last_name:
    // --phone_number:
    // --state:
    // --uid:
    // --zip_code:
    // date_of_registration:

    //data to add to the registered_events collection in the ui doc
    //event_ref:
    //start_date:
    //date_of_registration:
  }

  async initDummyData() {
    this.user1UID = await this.setDummyAuthUser(
      'test123@gmail.com',
      '+13233546886',
      '1234567890'
    )
    this.user2UID = await this.setDummyAuthUser(
      'test321@gmail.com',
      '+10002223333',
      '0987654321'
    )
    await this.setDummyEventsCollectionInDB()
    await this.setDummyEventsToUserPropietaryDB()
    await this.setDummyUsersInDB()
  }
}
