import { collection, doc, getDocs, limit, orderBy, query } from '@firebase/firestore'
import { db } from './firebase_config'

/**
 * TODO(09/11/2022) add a description for this function.
 */
export default async function FetchSocialFeedPosts(eid: string, uid: string) {
  const eventRef = doc(db, 'events', eid)
  const postsCollection = collection(eventRef, 'posts')

  const postsDocs = await getDocs(
    query(postsCollection, orderBy('date_posted', 'desc'), limit(15))
  )

  return postsDocs
}
