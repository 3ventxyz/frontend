// author: marthel
import {
  CollectionReference,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  query,
  orderBy,
  DocumentSnapshot,
  doc
} from '@firebase/firestore'
import { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'
import { db } from '../services/firebase_config'
import updateCreatedEventToUser from '../services/update_created_event_to_user'
import { uploadEventInfo } from '../services/upload_event_info'
import {
  EventHostInterface,
  EventInterface,
  TicketInterface
} from '../shared/interface/common'

interface Props {
  children?: ReactNode
}

interface EventsInterface {
  accessedEventData: EventInterface | null
  cachedUpcomingEvents: EventInterface[] | null
  cachedPastEvents: EventInterface[] | null
  cachedRegisteredEvents: EventInterface[] | null
  cacheUpcomingEvents: (events: EventInterface[]) => void | void
  cacheRegisteredEvents: (events: EventInterface[]) => void | void
  cachePastEvents: (events: EventInterface[]) => void | void
  cacheAccessedEventData: (event: EventInterface) => void | void
  fetchAccessedEventData: (eid: string) => Promise<any> | void
  submitEventToFirebase: (
    newEventData: EventInterface,
    eventHost: EventHostInterface
  ) => Promise<any> | void
  fetchEventsData: ({
    collectionRef,
    numberOfEvents
  }: {
    collectionRef: CollectionReference<DocumentData>
    numberOfEvents?: number
  }) => Promise<any> | void

  newEventData: (
    eventDoc: DocumentSnapshot<DocumentData>
  ) => EventInterface | void
}

const EventsContext = createContext<EventsInterface>({
  fetchEventsData: () => undefined,
  newEventData: () => undefined,
  cacheUpcomingEvents: () => undefined,
  cacheRegisteredEvents: () => undefined,
  cachePastEvents: () => undefined,
  cacheAccessedEventData: () => undefined,
  fetchAccessedEventData: () => undefined,
  submitEventToFirebase: () => undefined,
  cachedPastEvents: null,
  cachedUpcomingEvents: null,
  cachedRegisteredEvents: null,
  accessedEventData: null
})

const EventsProvider = ({ children }: Props): JSX.Element => {
  const [cachedUpcomingEvents, setCachedUpcomingEvents] = useState<
    EventInterface[] | null
  >(null)
  const [cachedPastEvents, setCachedPastEvents] = useState<
    EventInterface[] | null
  >(null)
  const [cachedRegisteredEvents, setCachedRegisteredEvents] = useState<
    EventInterface[] | null
  >(null)
  const [accessedEventData, setAcessedEventData] =
    useState<EventInterface | null>(null)

  const cacheUpcomingEvents = (events: EventInterface[]) => {
    setCachedUpcomingEvents(events)
  }
  const cachePastEvents = (events: EventInterface[]) => {
    setCachedPastEvents(events)
  }
  const cacheRegisteredEvents = (events: EventInterface[]) => {
    setCachedRegisteredEvents(events)
  }
  const cacheAccessedEventData = (event: EventInterface) => {
    setAcessedEventData(event)
  }

  const submitEventToFirebase = async (
    newEventData: EventInterface,
    eventHost: EventHostInterface
  ) => {
    try {
      await uploadEventInfo(newEventData)
      await updateCreatedEventToUser(eventHost)
    } catch (e) {
      console.log('error at events context')
      console.error(e)
    }
  }

  // TODO (Marthel): add a timer that will clear and set null, the cachedEventsData.

  const newEventData = (eventDoc: DocumentSnapshot<DocumentData>) => {
    const eventData: EventInterface = {
      description: eventDoc.data()?.description,
      start_date: eventDoc.data()?.start_date?.toDate(),
      event_id: eventDoc.data()?.event_id,
      uid: eventDoc.data()?.uid,
      title: eventDoc.data()?.title,
      location: eventDoc.data()?.location,
      img_url: eventDoc.data()?.img_url,
      landing_portrait_url: eventDoc.data()?.landing_portrait_url,
      end_date: eventDoc.data()?.end_date?.toDate(),
      ticket_max: eventDoc.data()?.ticket_max,
      registered_attendees: eventDoc.data()?.registered_attendees,
      tags: eventDoc.data()?.tags
    }
    return eventData
  }

  const fetchAccessedEventData = async (eid: string) => {
    setAcessedEventData(null)
    const eventRef = doc(db, 'events', eid)
    const eventDoc = await getDoc(eventRef)
    const accessedEventData = newEventData(eventDoc)
    console.log(eventDoc)
    return accessedEventData
  }

  const fetchEventsData = async ({
    collectionRef,
    numberOfEvents = 3
  }: {
    collectionRef: CollectionReference<DocumentData>
    numberOfEvents?: number
  }) => {
    const eventsRef = await getDocs(
      query(collectionRef, orderBy('start_date', 'desc'), limit(numberOfEvents))
    )
    const eventsList: EventInterface[] = []
    for (const eventRef of eventsRef.docs) {
      const eventDoc: any = await getDoc(eventRef.data().event_ref)
      eventsList.push(newEventData(eventDoc))
    }
    return eventsList
  }

  return (
    <EventsContext.Provider
      value={{
        accessedEventData: accessedEventData,
        cachedUpcomingEvents: cachedUpcomingEvents,
        cachedPastEvents: cachedPastEvents,
        cachedRegisteredEvents: cachedRegisteredEvents,
        submitEventToFirebase: submitEventToFirebase,
        newEventData: newEventData,
        cacheAccessedEventData: cacheAccessedEventData,
        fetchEventsData: fetchEventsData,
        cacheUpcomingEvents: cacheUpcomingEvents,
        cachePastEvents: cachePastEvents,
        cacheRegisteredEvents: cacheRegisteredEvents,
        fetchAccessedEventData: fetchAccessedEventData
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

const useEvents = () => useContext(EventsContext)

export { useEvents, EventsProvider }
