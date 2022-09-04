// author: marthel
import { useEffect, useState } from 'react'
import { db } from '../services/firebase_config'
import { doc, collection } from '@firebase/firestore'
import { useEvents } from '../contexts/events'
import EventsDisplay from './eventsDisplay'

export default function Dashboard() {
  const events = useEvents()
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      let pastEventsData: any
      let upcomingEventsData: any
      try {
        const userDocRef = doc(db, 'users', '9z8ahI4aQIYR11Iz0QzWuVJsh943')
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
    <div className="flex w-screen flex-col space-y-[35px] bg-secondaryBg px-[20px] pb-[106px] pt-[35px] text-center md:px-[112px]">
      <EventsDisplay
        title={'upcoming events'}
        route={'dashboard/seeAll'}
        query={{ events: 'upcoming' }}
        eventsData={events.cachedUpcomingEvents}
        seeAllOption={true}
        isFetching={!fetched}
      />
      <EventsDisplay
        title={'past events'}
        route={'dashboard/seeAll'}
        query={{ events: 'past' }}
        eventsData={events.cachedPastEvents}
        seeAllOption={true}
        isFetching={!fetched}
      />
    </div>
  )
}
