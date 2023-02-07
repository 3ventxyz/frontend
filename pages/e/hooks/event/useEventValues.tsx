import { DocumentData, QuerySnapshot } from '@firebase/firestore'
import { useState } from 'react'
import FetchRegisteredAttendees from '../../../../services/fetch_registered_attendees'
import FetchSocialFeedPosts from '../../../../services/fetch_social_feed_posts'
import registerAttendeeToEvent from '../../../../services/register_attendee_to_event'
import uploadComment from '../../../../services/upload_comment'
import {
  EventInterface,
  PostInterface,
  UserInterface
} from '../../../../shared/interface/common'

interface eventValuesInterface {
  comment: string
  registeredUserData: any
  posts: PostInterface[]
  attendees: UserInterface[]
}

interface useEventValuesProps {
  setComment: (comment: string) => void
  setRegisteredUserData: (registeredUserData: any) => void
  uploadPost: (userData: UserInterface, eventData: EventInterface) => void
  registerNewAttendee: (
    userData: UserInterface,
    eventData: EventInterface
  ) => void
  fetchPosts: (uid: string, eid: string) => void
  fetchAttendees: (uid: string, eid: string) => void
  setPosts: (posts: PostInterface[]) => void
  setAttendees: (attendees: UserInterface[]) => void
}

//this one can be used for download and upload data
//that is used locally only inside one page, and not through
//the whole app.
export default function  useEventValues(
  initialState: eventValuesInterface
): [eventValuesInterface, useEventValuesProps] {
  const [currValues, setValues] = useState<eventValuesInterface>(initialState)

  const setComment = (comment: string) => {
    setValues({ ...currValues, comment: comment })
  }

  const setPosts = (posts: PostInterface[]) => {
    setValues({ ...currValues, posts: posts })
  }

  //is dangerous to have the any type, fix this
  const setRegisteredUserData = (registeredUserData: any) => {
    setValues({ ...currValues, registeredUserData: registeredUserData })
  }

  const setAttendees = (attendees: UserInterface[]) => {
    setValues({ ...currValues, attendees: attendees })
  }

  // upload the new post to firebase
  const uploadPost = async (
    userData: UserInterface,
    eventData: EventInterface
  ) => {
    await uploadComment({
      uid: userData.uid,
      eid: eventData.event_id,
      username: userData.username,
      content: currValues.comment,
      avatar: userData.avatar
    })
    const newPost: PostInterface = {
      avatar: userData.avatar,
      date_posted: new Date(),
      post_content: currValues.comment,
      uid: userData.uid,
      username: userData.username
    }
    setComment('')
    let localPosts = currValues.posts
    localPosts?.splice(0, 0, newPost)
    setPosts(localPosts)
  }

  // upload the new attendee to firebase
  const registerNewAttendee = async (
    userData: UserInterface,
    eventData: EventInterface
  ) => {
    await registerAttendeeToEvent(
      {
        address: userData?.address === undefined ? '' : userData?.address,
        phone_number: '+111 222 33333',
        uid: userData?.uid === undefined ? '' : userData?.uid,
        date_of_registration: new Date(),
        username: userData?.username === undefined ? '' : userData?.username,
        avatar: userData?.avatar === undefined ? '' : userData?.avatar
      },
      eventData?.event_id === undefined ? '' : eventData?.event_id
    )
    setRegisteredUserData({ date_of_registration: new Date() })
  }

  //fetch posts data and set them
  const fetchPosts = async (uid: string, eid: string) => {
    const arrayOfPosts: Array<PostInterface> = []
    var postsDocs: QuerySnapshot<DocumentData> = await FetchSocialFeedPosts(
      eid,
      uid
    )
    for (const postDoc of postsDocs.docs) {
      const newPost: PostInterface = {
        avatar: postDoc.data().avatar,
        date_posted: new Date(postDoc.data().date_posted.toDate()),
        post_content: postDoc.data().post_content,
        uid: postDoc.data().uid,
        username: postDoc.data().username
      }
      arrayOfPosts.push(newPost)
    }
    setPosts(arrayOfPosts)
  }

  //fetch the attendees data and set them
  const fetchAttendees = async (uid: string, eid: string) => {
    const arrayOfAttendees: Array<UserInterface> = []
    var attendeesDocs: QuerySnapshot<DocumentData> =
      await FetchRegisteredAttendees(eid)
    for (const attendeeDoc of attendeesDocs.docs) {
      const newAttendee: UserInterface = {
        address: '',
        qr_code: '',
        avatar: attendeeDoc.data().avatar,
        uid: attendeeDoc.data().uid,
        username: attendeeDoc.data().username
      }
      arrayOfAttendees.push(newAttendee)
    }
    setAttendees(arrayOfAttendees)
  }

  return [
    currValues,
    {
      setComment,
      setPosts,
      setRegisteredUserData,
      setAttendees,
      uploadPost,
      registerNewAttendee,
      fetchPosts,
      fetchAttendees
    }
  ]
}
