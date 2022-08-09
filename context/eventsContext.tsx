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
import { ReactNode, useContext } from 'react'
import { createContext } from 'react'
import { EventInterface } from '../shared/interface/common'

interface Props {
  children?: ReactNode
}

interface EventsInterface {
  setCacheEventsData: ({
    cacheName,
    fetchedEventsData,
    url
  }: {
    cacheName: string
    fetchedEventsData: any
    url: string
  }) => void

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
  setCacheEventsData: () => undefined,
  fetchEventsData: () => undefined,
  newEventData: () => undefined
})

const EventsProvider = ({ children }: Props): JSX.Element => {
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
  const setCacheEventsData = ({
    cacheName,
    fetchedEventsData,
    url
  }: {
    cacheName: string
    fetchedEventsData: any
    url: string
  }) => {
    const cachedData = new Response(JSON.stringify(fetchedEventsData))
    console.log('====cacheEventContext:setCacheEventsData===')
    console.log(cachedData)
    console.log('===========================================')

    if ('caches' in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, cachedData)
        console.log('data cached in the webbrowser!!!')
      })
    }
  }

  const fetchEventsData = async ({
    collectionRef,
    numberOfEvents = 3
  }: {
    collectionRef: CollectionReference<DocumentData>
    numberOfEvents?: number
  }) => {
    const eventsRef = await getDocs(
      query(collectionRef, orderBy('timestamp', 'desc'), limit(numberOfEvents))
    )
    const eventsList: Array<EventInterface> = []
    for (const eventRef of eventsRef.docs) {
      const eventDoc: any = await getDoc(eventRef.data().eventReference)
      eventsList.push(newEventData(eventDoc))
    }
    return eventsList
  }

  return (
    <EventsContext.Provider
      value={{
        newEventData: newEventData,
        setCacheEventsData: setCacheEventsData,
        fetchEventsData: fetchEventsData
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

const useEvents = () => useContext(EventsContext)

export { useEvents, EventsProvider }
