import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc
} from '@firebase/firestore'
import { db } from './firebase_config'

export default async function uploadComment({
  eid,
  uid,
  username,
  content,
  avatar
}: {
  eid: string
  uid: string
  username: string
  content: string
  avatar: string
}) {
  // TODO (07/11/2022): build the logic for createNewPost.

  const eventRef = doc(db, 'events', eid)
  const postsCollection = collection(eventRef, 'posts')
  // const post
  await addDoc(postsCollection, {
    uid: uid,
    username: username,
    post_content: content,
    avatar: avatar,
    date_posted: new Date()
  })

  // return postsDocs;
}
