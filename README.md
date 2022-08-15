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