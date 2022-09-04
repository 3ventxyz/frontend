// author: marthel
import {
  CollectionReference,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  query,
  orderBy,
  DocumentSnapshot
} from '@firebase/firestore'
import { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'
import { EventInterface } from '../shared/interface/common'

interface Props {
  children?: ReactNode
}

interface EventsInterface {
  cachedUpcomingEvents: EventInterface[] | null
  cachedPastEvents: EventInterface[] | null
  cacheUpcomingEvents: (events: EventInterface[]) => void | void
  cachePastEvents: (events: EventInterface[]) => void | void
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
  cachePastEvents: () => undefined,
  cachedPastEvents: null,
  cachedUpcomingEvents: null
})

const EventsProvider = ({ children }: Props): JSX.Element => {
  const [cachedUpcomingEvents, setCachedUpcomingEvents] = useState<
    EventInterface[] | null
  >(null)
  const [cachedPastEvents, setCachedPastEvents] = useState<
    EventInterface[] | null
  >(null)

  const cacheUpcomingEvents = (events: EventInterface[]) => {
    setCachedUpcomingEvents(events)
  }
  const cachePastEvents = (events: EventInterface[]) => {
    setCachedPastEvents(events)
  }

  // TODO (Marthel): add a timer that will clear and set null, the cachedEventsData.

  const newEventData = (eventDoc: DocumentSnapshot<DocumentData>) => {
    const eventData: EventInterface = {
      address: eventDoc.data()?.address,
      date: eventDoc.data()?.date,
      id: eventDoc.data()?.id,
      eventTitle: eventDoc.data()?.event_title,
      organization: eventDoc.data()?.organization,
      imgURL: eventDoc.data()?.img_url
    }
    return eventData
  }

  const fetchEventsData = async ({
    collectionRef,
    numberOfEvents = 3
  }: {
    collectionRef: CollectionReference<DocumentData>
    numberOfEvents?: number
  }) => {
    const eventsRef = await getDocs(
      query(
        collectionRef,
        orderBy('date_of_event', 'desc'),
        limit(numberOfEvents)
      )
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
        cachedUpcomingEvents: cachedUpcomingEvents,
        cachedPastEvents: cachedPastEvents,
        newEventData: newEventData,
        fetchEventsData: fetchEventsData,
        cacheUpcomingEvents: cacheUpcomingEvents,
        cachePastEvents: cachePastEvents
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

const useEvents = () => useContext(EventsContext)

export { useEvents, EventsProvider }
