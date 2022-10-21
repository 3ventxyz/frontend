# 3vent Frontend Repository

## First Time Installation + Set Up

- `yarn install` root level dependencies
- set up firebase local emulator:
  - `cd functions`
  - `yarn install` firebase local emulator dependencies
- run `firebase emulators:start` to launch our serverless backend (runs on localhost:4000)
- run `yarn dev` in a new terminal to launch our application (runs on localhost:3000)

## Regular Deployment

- run `firebase emulators:start` in a new terminal
- run `yarn dev` in a new terminal

### Troubleshooting

- Localhost port collision?
  - `sudo lsof -i :<PORT>`
  - `kill -15 <PID>`
- Dependency Versioning
  - you must be using Node v16.15.0 (for both firebase local emulator and our web app)
  - on MacOS
    - you can download [nvm](https://github.com/nvm-sh/nvm) using `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash`
    - reload your terminal
    - run `nvm install 16.15.0` and `nvm use 16.15.0`
  - firebase local emulator requires Java v8 and Java JDK version 19 [jdk install](https://www.oracle.com/java/technologies/downloads/#jdk19-mac)

## TODO

- move everything into a `src` folder except for `pages`

## BEST PRACTICES AS WE KNOW IT

### `GET` or `SET` FIREBASE

- import firebase dependencies

```javascript
import { db } from '../services/firebase_config'
import { doc, collection, getDoc } from '@firebase/firestore'
```

- reference a collection, document id of that collection, and fetch

```javascript
const documentReference = doc(db, COLLECTION_NAME, DOCUMENT_ID)
const snapshot = await getDoc(documentReference)
const data = snapshot.data()
```

- if using this logic in a react component, put it in a useEffect and control the calls

```javascript
  useEffect(() => {
    const fetch = async () => {
        FETCH LOGIC
    }

    if (BOOLEAN_CONDITION) {
      fetch()
    }
  }, [])
```

## FIREBASE EMULATORS SEEDER GUIDES
- Any update needed for the firebase emulator seeder, can be
  done in `seeder/dataSeeder.js` file, located in the 
  `functions` directory.

### updating the data fields for firestore emulators.
- To update the firestore database, please look for the desired function that you need to make changes, and update the doc fields inside these functions:  
    - `this.db./*...*/.set({/*doc fields*/})`
    - `this.db./*...*/.add({/*doc fields*/})`

#### Example
```javascript
  async seederFunctionName(){
    /**
     * ...
    */
   this.db
      .collection(collectionName)
      .doc(`${docId}`)
      .set({
        //add, delete, update any doc field
        //to reflect changes in firestore emulators
        description: ...,
        end_date: ...,
        start_date: ...,
        img_url: ...,
        title: ...,
        uid: ...,
        ticket_max: ...,
        event_id: ...,
        description: ...,
        location: {
          address: ...,
          lat: ...,
          long: ...
        }
      })
  /**
   * ...
  */
  }
```

### creating a new seeder function
- To create a new seeder function, you need to declare and define
  a new seeder function inside the dataSeeder class.

```javascript
  async newSeederFunctionName(){
    /**
    * data generated or retrieved for seeding firestore.
    **/
    this.db
    .collection('collectionName')
    .doc(`${docId}`)
    .set({
      /**
      * assigning dummy data to their respective fields.
      **/
      description: ...,
      name: ...,
      date: ...,
      twitterVerifs: ...,
    })
  }
```

- This new seeder function must be called inside the initDummyData function.
```javascript
  async initDummyData() {
    /*
    ** other functions being called ...
    */
    await this.newSeederFunctionName() //new seeder function added
  }
```
