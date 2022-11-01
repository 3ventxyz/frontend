// author: marthel
const { faker } = require('@faker-js/faker')

module.exports = class DataSeeder {
  constructor(firebaseApp) {
    this.app = firebaseApp
    this.db = this.app.firestore()
    this.auth = this.app.auth()
    /**add here an array of dummy users for local use. */
    this.dummyUsers = new Array(12)
  }
  user1UID = ' '
  user2UID = ' '

  /**
   * function: setDummyAuthUser
   * --description: it creates a user in the firebase auth, this.auth, for logging in the front end;
   *    and sets their uid document in firestore, this.db, for accessing their data.
   *    if the user already exists in the auth database, then its skipped.
   */
  async setDummyAuthUser(email, phoneNumber, password) {
    var strippedUID = ' '
    var isUserCreated = true
    try {
      //check if a dummy user has been created with this email,
      //if it does return right away its uid
      var userData = await this.auth.getUserByEmail(email).catch((error) => {
        isUserCreated = false
      })
      if (isUserCreated) {
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
            tw_verifs: [],
            twitter_name: [],
            username: faker.internet.userName(),
            wallet: ''
          })
      }
    } catch (error) {
      console.log(error, 'auth seed failed')
    }
    return strippedUID
  }

  /**
   * function: setDummyUsersInDB
   * --description: it creates an array of generated dummy users, with data randomly generated for each dummy user.
   * Each generated dummy user is added right away to the 'users' collection firestore,
   * this.db, setting the generated data to their respective fileds.
   */
  async setDummyUsersInDB() {
    try {
      ;[...Array(10).keys()].map(() => {
        const dummyUserData = {
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
          tw_verifs: [],
          twitter_name: [],
          username: faker.internet.userName(),
          wallet: ''
        }
        /*add the dummyUserToTheLocalArray.*/
        this.db.collection('users').add(dummyUserData)
      })
      console.log('setDummyUsersInDB: seed was successful')
    } catch (error) {
      console.error(error, 'database seed failed')
    }
  }

  /**
   * function: setDummyEventsCollectionInDB
   * --description: it creates an array of generated events, with data randomly generated for each dummy event.
   * it creates an array of generated dummy users, with data randomly generated for each dummy user.
   * Each generated dummy user is added right away to the 'users' collection firestore,
   * this.db, setting the generated data to their respective fileds.
   * Also, each event sets the user id, uid, from the already authenticated users.
   */
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
          '-' +
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
            ticket_max: randomCapTickets,
            event_id: eventId,
            registered_attendees: 0,
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

  /**
   * function: setDummyEventsToUserPropietaryDB
   * --description: it adds the event reference(eventRef), along other data, to the user document; who created the event.
   *   This data is added to the 'upcoming_events' collection, inside the uid doc.
   */
  async setDummyEventsToUserPropietaryDB() {
    const eventsRef = this.db.collection('events')
    var eventsDocs = await eventsRef.get()
    eventsDocs.forEach((doc) => {
      var docData = doc.data()
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
  }

  /**
   * Function: setDummyPosts
   * --description: it creates a collection of posts at the root of the database.
   * each post document has an author(uid, user_name, avatar), date of creation, comment; and an empty eid space,
   * specifying where the post belongs to.
   */
  async setDummyPosts() {
    try {
      const usersRef = this.db.collection('users')
      var usersDocs = await usersRef.get()
      usersDocs.forEach((user) => {
        ;[...Array(2).keys()].map((index) => {
          this.db
            .collection('posts')
            .doc()
            .set({
              uid: user.id,
              username: user.data().username,
              avatar: user.data().avatar,
              post_content: faker.lorem.lines(3),
              date_posted: new Date(),
              eid: ''
            })
        })
      })
    } catch (e) {
      console.error(e, 'setDummyPosts error caught')
    }
  }

  /**
   * TODO:
   * add some users to the events registered_attendees collection(or array of registered_attendees objects)
   * these users should appear in the front end as a guidance that users are registered in the backend.
  * IMPORTANT: UPDATE THE REGISTERED_ATTENDEES COUNTER FROM THE EVENT DOC!!!!! 
  */
  async setRegisteredAttendeesToEvents() {
    try {
      const eventsRef = this.db.collection('events')
      const usersRef = this.db.collection('users')
      const eventsDocs = await eventsRef.get()
      const usersDocs = await usersRef.get()
      usersDocs.forEach((user) => {
        //for each user, register them to an event as an attendee.
        if (user.id !== this.user1UID && user.id !== this.user2UID) {
          eventsDocs.forEach((event) => {
            const registeredAttendeesRef = this.db.collection(
              `events/${event.id}/registered_attendees`
            )
            registeredAttendeesRef.doc(user.id).set({
              address: faker.address.streetAddress(),
              city: faker.address.city(),
              username: user.data().username,
              phone_number: '',
              state: faker.address.state(),
              uid: user.id,
              zip_code: faker.address.zipCode('#####'),
              date_of_registrattion: new Date()
            })
          })
        }
      })
    } catch (e) {}
  }

  async setRegisteredEventsToUsers() {
    try {
      const eventsRef = this.db.collection('events')
      const usersRef = this.db.collection('users')
      const eventsDocs = await eventsRef.get()
      const usersDocs = await usersRef.get()
      console.log(`running setRegisteredEventsToUsers`)

      eventsDocs.forEach((event) => {
        //for each user, register them to an event as an attendee.
        // if (user.id !== this.user1UID && user.id !== this.user2UID) {
        usersDocs.forEach((user) => {
          const registeredEventsRef = this.db.collection(
            `users/${user.id}/registered_events`
          )
          // console.log(`registering eid: ${event.id}, user:${user.id}`)

          registeredEventsRef.doc(event.data().event_id).set({
            event_ref: this.db.collection('events').doc(event.data().event_id),
            event_title: event.data().title,
            start_date: event.data().start_date,
            end_date: event.data().end_date,
            //this has been the problem all along!!!!
            // date_registered: event.data().date_of_registration
          })
        })
        // }
      })
    } catch (e) {
      console.error(e, 'setRegisteredEventsToUsers error caught')
    }
  }

  async setSocialFeedToEvents() {
    /**
     * TODO:
     * after users are registered to an event, they should have the ability to give comments on the social feed
     * of the event. So add posts based from those registered users, to the db of the event. Each post will be stored in the
     * posts collection that is located at the root of the database and the post id is stored in the posts doc field of the event doc.
     */
  }

  /**
   * function: initDummyData
   * description: this function runs the functions, that seeds the generated dummy
   * data to firebase emulators.
   */
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
    await this.setDummyPosts()
    await this.setRegisteredAttendeesToEvents()
    await this.setRegisteredEventsToUsers()

    /**WIP */
    // await this.setSocialFeedToEvents()
  }
}
