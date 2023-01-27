// author: marthel
const { faker } = require('@faker-js/faker')

const userSize = 10
const eventSize = 10
const postsSize = 15
const listSize = 5

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
            wallet: '',
            email_verified: false
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
      ;[...Array(userSize).keys()].map(() => {
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
          wallet: '',
          email_verified: false
        }
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
      ;[...Array(eventSize).keys()].map((index) => {
        var adjective = faker.word.adjective(5)
        var firstWord = faker.commerce.product()
        var randomIdNum = Math.floor(Math.random() * 909)
        var randomCapTickets = Math.floor(Math.random() * 21) + userSize
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
            description: faker.lorem.lines(20),
            end_date: endDate,
            start_date: startDate,
            img_url: faker.image.abstract(640, 640, true),
            landing_portrait_url: faker.image.image(1050, 500, false),
            title: eventTitle,
            uid: index % 2 === 0 ? this.user1UID : this.user2UID,
            ticket_max: randomCapTickets,
            event_id: eventId,
            registered_attendees: 0,
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
   * Description:
   * it adds some users to the events as registered attendees.
   * These users will be added to  registered_attendees collection
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
            eventsRef
              .doc(`${event.id}`)
              .update({ registered_attendees: userSize })
            registeredAttendeesRef.doc(user.id).set({
              address: faker.address.streetAddress(),
              city: faker.address.city(),
              username: user.data().username,
              avatar: user.data().avatar,
              phone_number: '',
              state: faker.address.state(),
              uid: user.id,
              zip_code: faker.address.zipCode('#####'),
              date_of_registration: new Date()
            })
          })
        }
      })
    } catch (e) {
      console.error(
        e,
        'dataSeeder::setRegisteredAttendeesToEvents Error Caught'
      )
    }
  }

  async setRegisteredEventsToUsers() {
    try {
      const eventsRef = this.db.collection('events')
      const usersRef = this.db.collection('users')
      const eventsDocs = await eventsRef.get()
      const usersDocs = await usersRef.get()

      usersDocs.forEach((user) => {
        if (user.id !== this.user1UID && user.id !== this.user2UID) {
          eventsDocs.forEach((event) => {
            const registeredEventsRef = this.db.collection(
              `users/${user.id}/registered_events`
            )
            registeredEventsRef.doc(event.data().event_id).set({
              event_ref: this.db
                .collection('events')
                .doc(event.data().event_id),
              event_title: event.data().title,
              start_date: event.data().start_date,
              end_date: event.data().end_date
            })
          })
        }
      })
    } catch (e) {
      console.error(e, 'dataSeeder::setRegisteredEventsToUsers Error Caught')
    }
  }

  /**
   * Function: setSocialFeedDummyData
   * --description: it creates a collection of posts for each event doc.
   * each post document has an author(uid, user_name, avatar), date of creation, comment;  eid,
   * specifying where the post belongs to.
   */
  async setSocialFeedDummyData() {
    try {
      const eventsRef = this.db.collection('events')
      const usersRef = this.db.collection('users')
      const usersDocs = await usersRef.get()
      const eventsDocs = await eventsRef.get()
      const localUserDocs = []
      usersDocs.forEach((user) => {
        localUserDocs.push(user)
      })
      eventsDocs.forEach((event) => {
        ;[...Array(postsSize).keys()].map((index) => {
          let randomIndex = Math.floor(Math.random() * 100) % userSize
          let user = localUserDocs[randomIndex]
          eventsRef
            .doc(`${event.id}`)
            .collection('posts')
            .doc()
            .set({
              uid: user.id,
              username: user.data().username,
              avatar: user.data().avatar,
              post_content: faker.lorem.lines(3),
              date_posted: new Date()
            })
        })
      })
    } catch (e) {
      console.error(e, 'dataSeeder::setSocialFeedDummyData error caught')
    }
  }

  /**
   * function: setDummyAllowlistData
   * --description: it creates an array of generated allowlists, with data randomnly generated for each list.
   * Each generated dummy list is added right away to the 'lists' collection firestore,
   * this.db setting the generated data to their respective fields.
   */
  async setDummyAllowlistData() {
    try {
      ;[...Array(listSize).keys()].map(async () => {
        const dummyAllowlistData = {
          allowlist: faker.finance.ethereumAddress(),
          description: faker.commerce.productDescription(),
          discordGuild: faker.datatype.boolean(),
          discordGuildId: '605866305094156333',
          discordVerif: faker.datatype.boolean(),
          emailVerif: faker.datatype.boolean(),
          permalink: 'https://discord.gg/U4Qzdbz',
          title: faker.datatype.string(),
          twitterAccountId: '783214',
          twitterFollowing: faker.datatype.boolean(),
          twitterVerif: faker.datatype.boolean(),
          uid: await this.db.collection('users').doc(this.user1UID),
          walletVerif: faker.datatype.boolean()
        }
        this.db.collection('lists').add(dummyAllowlistData)
      })
      console.log('setAllowlistInDB: seed was successful')
    } catch (error) {
      console.error(error, 'database seed failed')
    }
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
    await this.setRegisteredAttendeesToEvents()
    await this.setRegisteredEventsToUsers()
    await this.setSocialFeedDummyData()
    await this.setDummyAllowlistData()
  }
}
