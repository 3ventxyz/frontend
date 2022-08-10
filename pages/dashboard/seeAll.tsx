// author: marthel
import { collection, doc } from '@firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useEvents } from '../../context/eventsContext'
import { db } from '../../services/firebase_config'
import { EventInterface } from '../../shared/interface/common'
import EventsDisplay from './components/eventsDisplay'

export default function SeeAll() {
  const router = useRouter()
  const eventsCont = useEvents()
  const [title, setTitle] = useState('')
  const [fetched, setIsFetched] = useState(false)
  const [eventsData, setEvents] = useState<Array<EventInterface>>([])
  const { events } = router.query
  useEffect(() => {
    const fetchData = async () => {
      let eventData: Array<EventInterface>
      const userDocRef = doc(db, 'user', 'guJqAglqTLAzoMIQA6Gi')
      switch (events) {
        case 'upcoming':
          setTitle('all upcoming events')
          eventData = await eventsCont.fetchEventsData({
            collectionRef: collection(userDocRef, 'upcomingEvents'),
            numberOfEvents: 6
          })
          setEvents(eventData)
          break
        case 'past':
          setTitle('all past events')
          eventData = await eventsCont.fetchEventsData({
            collectionRef: collection(userDocRef, 'pastEvents'),
            numberOfEvents: 6
          })
          setEvents(eventData)
          break
        default:
          console.log('no setting error 404')
          break
      }
      setIsFetched(true)
    }
    if (!fetched && events) {
      fetchData()
    }
  }, [events])
  return (
    <div className="flex flex-col bg-secondaryBg px-[20px] pb-[106px] pt-[35px] md:px-[112px]">
      {fetched ? (
        <EventsDisplay
          title={title}
          route={''}
          query={undefined}
          eventsData={eventsData}
        ></EventsDisplay>
      ) : (
        <>loading...</>
      )}
    </div>
  )
}
