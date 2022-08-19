// author: marthel
import { useEffect, useState } from 'react'
import { db } from '../../services/firebase_config'
import { doc, collection } from '@firebase/firestore'
import { useEvents } from '../../context/eventsContext'
import EventsDisplay from './components/eventsDisplay'

export default function Dashboard() {
  const [fetched, setFetched] = useState(false)
  const events = useEvents()

  useEffect(() => {
    const fetchData = async () => {
      let pastEventsData: any
      let upcomingEventsData: any
      try {
        const userDocRef = doc(db, 'user', 'guJqAglqTLAzoMIQA6Gi')
        if (!events.cachedPastEvents) {
          pastEventsData = await events.fetchEventsData({
            collectionRef: collection(userDocRef, 'past_events')
          })
          events.cachePastEvents(pastEventsData)
        }
        if (!events.cachedUpcomingEvents) {
          upcomingEventsData = await events.fetchEventsData({
            collectionRef: collection(userDocRef, 'upcoming_events')
          })
          events.cacheUpcomingEvents(upcomingEventsData)
        }
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
    <div className="flex w-screen flex-col space-y-[35px] bg-secondaryBg px-[20px] pb-[106px] pt-[35px] md:px-[112px]">
      {!fetched ? (
        <div>Loading...</div>
      ) : (
        <>
          <EventsDisplay
            title={'upcoming events'}
            route={'dashboard/seeAll'}
            query={{ events: 'upcoming' }}
            eventsData={events.cachedUpcomingEvents}
            seeAllOption={true}
          />
          <EventsDisplay
            title={'past events'}
            route={'dashboard/seeAll'}
            query={{ events: 'past' }}
            eventsData={events.cachedPastEvents}
            seeAllOption={true}
          />
        </>
      )}
    </div>
  )
}
