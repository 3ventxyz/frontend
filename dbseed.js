const app = require('firebase-admin')
const { faker } = require('@faker-js/faker')

//got something.
process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080'
app.initializeApp({
  projectId: 'vent-d1d85'
})
const db = app.firestore()

function getSeedData() {
  try {
    ;[...Array(10).keys()].map(() =>
      db.collection('events').add({
        author_name: faker.name.firstName() + ' ' + faker.name.lastName(),
        author_profile_pic: faker.image.imageUrl(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        address: {
          addr_1: faker.address.streetAddress(),
          addr_2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zipCode: faker.address.zipCode()
        }
      })
    )
    console.log('database seed was successful')
  } catch (error) {
    console.log(error, 'database seed failed')
  }
}

getSeedData()
