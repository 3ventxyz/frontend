import { doc, DocumentData, getDoc, QuerySnapshot } from '@firebase/firestore'
import { createContext, ReactNode, useContext, useState } from 'react'
import FetchRegisteredAttendees from '../services/fetch_registered_attendees'
import { db } from '../services/firebase_config'
import { UserInterface } from '../shared/interface/common'
/***
 *
 *
 * in the users context, should have the function for fetching the user doc
 * from firebasee, and returns the data that is properly set with an object.
 * it can have the username and avatar. And th
 *
 */

interface Props {
  children?: ReactNode
}

interface UsersInterface {
  loggedInUserData: UserInterface | null
  eventHostData: UserInterface | null
  registeredAttendeesList: UserInterface[] | null
  fetchUserData: ({
    uid,
    isLoggedInUser
  }: {
    uid: string
    isLoggedInUser?: boolean
  }) => Promise<any> | void
  fetchRegisteredAttendeesList: (eid: string) => Promise<any> | void
  cacheEventHostData: (user: UserInterface) => void | void
  cacheLoggedInUserData: (user: UserInterface) => void | void
  cacheRegisteredAttendeesList: (user: UserInterface[]) => void | void
}

const UsersContext = createContext<UsersInterface>({
  loggedInUserData: null,
  eventHostData: null,
  registeredAttendeesList: null,
  fetchUserData: () => undefined,
  fetchRegisteredAttendeesList: () => undefined,
  cacheEventHostData: () => undefined,
  cacheLoggedInUserData: () => undefined,
  cacheRegisteredAttendeesList: () => undefined
})

const UsersProvider = ({ children }: Props): JSX.Element => {
  const [eventHostData, setEventHostData] = useState<UserInterface | null>(null)
  const [loggedInUserData, setLoggedInUserData] =
    useState<UserInterface | null>(null)
  const [registeredAttendeesList, setRegisteredAttendeesList] = useState<
    UserInterface[] | null
  >(null)

  const fetchUserData = async ({
    uid,
    isLoggedInUser = false
  }: {
    uid: string
    isLoggedInUser?: boolean
  }) => {
    const docRef = doc(db, 'users', uid)
    const userDoc = await getDoc(docRef)
    const userData: UserInterface = {
      username: userDoc.data()?.username,
      avatar: userDoc.data()?.avatar,
      uid: uid,
      qr_code: isLoggedInUser ? userDoc.data()?.qr_code : null,
      address: userDoc.data()?.location['address'],
    }
    return userData
  }

  const fetchRegisteredAttendeesList = async (eid: string) => {
    const registeredAtteendees: UserInterface[] = []
    var attendeesDocs: QuerySnapshot<DocumentData> =
      await FetchRegisteredAttendees(eid)

    for (const attendeeDoc of attendeesDocs.docs) {
      const newAttendee: UserInterface = {
        avatar: attendeeDoc.data().avatar,
        uid: attendeeDoc.data().uid,
        username: attendeeDoc.data().username,
        address: attendeeDoc.data().location['address']
      }
      registeredAtteendees.push(newAttendee)
    }
    return registeredAtteendees
  }

  const cacheEventHostData = (user: UserInterface) => {
    setEventHostData(user)
  }
  const cacheLoggedInUserData = (user: UserInterface) => {
    setLoggedInUserData(user)
  }

  const cacheRegisteredAttendeesList = (
    registeredAttendees: UserInterface[]
  ) => {
    setRegisteredAttendeesList(registeredAttendees)
  }

  return (
    <UsersContext.Provider
      value={{
        loggedInUserData: loggedInUserData,
        eventHostData: eventHostData,
        registeredAttendeesList: registeredAttendeesList,
        fetchUserData: fetchUserData,
        fetchRegisteredAttendeesList: fetchRegisteredAttendeesList,
        cacheEventHostData: cacheEventHostData,
        cacheRegisteredAttendeesList: cacheRegisteredAttendeesList,
        cacheLoggedInUserData: cacheLoggedInUserData
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

const useUsers = () => useContext(UsersContext)

export { useUsers, UsersProvider }
