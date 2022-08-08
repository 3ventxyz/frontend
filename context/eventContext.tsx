import { ReactNode, useContext, useEffect, useState } from 'react'
import {
  EventInterface,
  TicketInterface,
  UserProfileEvents
} from '../shared/interface/common'
import { db } from '../services/firebase_config'
import {
  // collection,
  getDocs,
  getDoc,
  doc,
  query,
  DocumentReference,
  DocumentData,
  limit,
  DocumentSnapshot,
  collection,
  orderBy,
  QuerySnapshot
} from '@firebase/firestore'
import { createContext } from 'react'
import { Events } from 'react-scroll'

const newEventData = (eventDoc: DocumentSnapshot<DocumentData>) => {
  const eventData: EventInterface = {
    address: eventDoc.data()?.address,
    date: eventDoc.data()?.date,
    id: eventDoc.data()?.id,
    eventTitle: eventDoc.data()?.eventTitle,
    orgTitle: eventDoc.data()?.orgTitle,
    imgURL: eventDoc.data()?.imgURL
  }
  return eventData
}

interface Props {
  children?: ReactNode
}

/**
 * functions to add inside this interface !!!
 //   fetchPastEvents: ({userId}: {userId:string}) => void
 // fetchNextPastEvents:()=>void,
 // fetchNextUpcomingEvents:()=>void,
 //getCachedPastEvents: if data has been fetched, then obtained the cached data instead.
 //getCachedUpcomingEvents: if data has been fetched, then obtained the cached data instead.
 */
interface EventsInterface {
  upcomingEventsData?: Array<EventInterface> | null,
  pastEventsData?: Array<EventInterface> | null,
  fetchUpcomingEventsData: ({ userDocRef }: { userDocRef: DocumentReference<DocumentData> }) => Promise<void> | void,
  fetchPastEventsData: ({ userDocRef }: { userDocRef: DocumentReference<DocumentData> }) => Promise<void> | void
}

const EventsContext = createContext<EventsInterface>({
  fetchUpcomingEventsData: () => undefined,
  fetchPastEventsData: () => undefined,
})

const EventsProvider = ({ children }: Props): JSX.Element => {

  const [upcomingEvents, setUpcomingEvents] = useState<EventInterface[]>([])
  const [pastEvents, setPastEvents] = useState<EventInterface[]>([])
  let tmpPastEvents: any;
  let tmpUpcomingEvents: any;

  const fetchUpcomingEventsData = async ({ userDocRef }: { userDocRef: DocumentReference<DocumentData> }) => {
    const upcomingEventsRefs = await getDocs(query(collection(userDocRef, 'upcomingEvents'), orderBy('timestamp', 'desc'), limit(3)))
    const upcomingEventsData = []
    for (const upcomingEventRef of upcomingEventsRefs.docs) {
      const upcomingEventDoc: any = await getDoc(upcomingEventRef.data().eventReference)
      upcomingEventsData.push(newEventData(upcomingEventDoc))
    }
    if (upcomingEventsData.length > 0) {
      tmpUpcomingEvents = upcomingEventsData
      // setUpcomingEvents(upcomingEventsData)
      // return upcomingEventsData
    }
    // return null
    //events data finish
  }

  
  const fetchPastEventsData = async ({ userDocRef }: { userDocRef: DocumentReference<DocumentData> }) => {

    const pastEventsRefs = await getDocs(query(collection(userDocRef, 'pastEvents'), orderBy('timestamp', 'desc'), limit(3)))
    let pastEventsData = []

    for (const pastEventRef of pastEventsRefs.docs) {
      const pastEventDoc: any = await getDoc(pastEventRef.data().eventReference)
      pastEventsData.push(newEventData(pastEventDoc))
    }
    if (pastEventsData.length > 0) {
      console.log('eventContext::fetchPastEventsData:=======================================')
      console.log('1.-eventContext::fetchPastEventsData: past events data, BEFORE SETTING DATA')
      console.log(pastEventsData)
      console.log('2.-eventContext::fetchPastEventsData: calling setPastEvents to set pastEvents')
      setPastEvents(pastEventsData)
      console.log('3.-eventContext::fetchPastEventsData: data SET, showing var from pastEvents')
      console.log(pastEvents)
      console.log('eventContext::fetchPastEventsData:=======================================')
    }
    // return null;
  }

  const newEventData = (eventDoc: DocumentSnapshot<DocumentData>) => {
    const eventData: EventInterface = {
      address: eventDoc.data()?.address,
      date: eventDoc.data()?.date,
      id: eventDoc.data()?.id,
      eventTitle: eventDoc.data()?.eventTitle,
      orgTitle: eventDoc.data()?.orgTitle,
      imgURL: eventDoc.data()?.imgURL
    }
    return eventData
  }

  useEffect(() => {

    setUpcomingEvents(tmpUpcomingEvents)
    setPastEvents(tmpPastEvents)
  }, [tmpPastEvents, tmpUpcomingEvents])
  return <EventsContext.Provider
    value={{
      fetchPastEventsData: fetchPastEventsData,
      fetchUpcomingEventsData: fetchUpcomingEventsData,
      upcomingEventsData: upcomingEvents,
      pastEventsData: pastEvents
    }}

  >{children}</EventsContext.Provider>
}

const useEvents = () => useContext(EventsContext)

export { useEvents, EventsProvider }
