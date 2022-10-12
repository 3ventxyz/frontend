# 3vent Frontend Repository 

## Getting Started

- `yarn install`
- `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


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
### Initializing and running firebase emulators and firebase cloud functions

- after git cloning this repo, please call ```yarn -i``` for installing the needed dependencies and try to run ```firebase emulators:start```
- If there was an error with the deploy, you will have to initialize firebase, by calling ```firebase init```
- During the firebase init, please select these packages: storage, firestore, functions, emulators. And set every value by default.
- NOTE: when prompting the option to install all dependencies with npm, please set to N. as you will need to call ```yarn -i``` again after finishing the firebase installation.
- When prompting which language for the firebase cloud functions, please select javascript.
- Once you have firebase installed and called ```yarn -i```
- AFTER ALL THESE STEPS you should be able to call ```firebase emulators:start``` at any time, without the need to do all the work stated above again.
