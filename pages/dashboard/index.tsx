// author: marthel
import { useEffect, useState } from 'react'
import { EventInterface } from '../../shared/interface/common'
import { db } from '../../services/firebase_config'
import { doc, collection } from '@firebase/firestore'
import { useEvents } from '../../context/eventsContext'
import EventsDisplay from './components/eventsDisplay'

export default function Dashboard() {
  const [fetched, setFetched] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<EventInterface[]>([])
  const [pastEvents, setPastEvents] = useState<EventInterface[]>([])
  const events = useEvents()

  useEffect(() => {
    const fetchData = async () => {
      let pastEventsData: any
      let upcomingEventsData: any
      try {
        const userDocRef = doc(db, 'user', 'guJqAglqTLAzoMIQA6Gi')
        pastEventsData = await events.fetchEventsData({
          collectionRef: collection(userDocRef, 'pastEvents')
        })
        upcomingEventsData = await events.fetchEventsData({
          collectionRef: collection(userDocRef, 'upcomingEvents')
        })
        setPastEvents(pastEventsData)
        setUpcomingEvents(upcomingEventsData)

        events.setCacheEventsData({
          cacheName: 'pastEventsCache',
          url: 'http://localhost:3000/',
          fetchedEventsData: pastEventsData
        })
        events.setCacheEventsData({
          cacheName: 'upcomingEventsCache',
          url: 'http://localhost:3000/',
          fetchedEventsData: upcomingEventsData
        })
        setFetched(true)
      } catch (e: any) {
        console.log('dashboard: error in retrieving data event')
        console.log(e)
        console.log('=========================================')
      }
    }
    if (!fetched) {
      fetchData()
    }
  }, [])

  return (
    <div className="flex flex-col space-y-[35px] bg-secondaryBg px-[20px] pb-[106px] pt-[35px] md:px-[112px]">
      {!fetched ? (
        <div>Loading...</div>
      ) : (
        <>
          <EventsDisplay
            title={'upcoming events'}
            route={'dashboard/seeAll'}
            query={{ events: 'upcoming' }}
            eventsData={upcomingEvents}
            seeAllOption={true}
          />
          <EventsDisplay
            title={'past events'}
            route={'dashboard/seeAll'}
            query={{ events: 'past' }}
            eventsData={pastEvents}
            seeAllOption={true}
          />
        </>
      )}
    </div>
  )
}
