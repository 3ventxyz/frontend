import { useEffect, useState } from 'react'
import { db } from '../../services/firebase_config'
import { useEvents } from '../../contexts/events'
import { useAuth } from '../../contexts/auth'
import { EventInterface } from '../../shared/interface/common'
import { useRouter } from 'next/router'
import { Button } from '../../components/buttons/button'
import EventTile from '../../components/events/eventTile'
import { collection, doc } from '@firebase/firestore'
import Allowlists from '../../components/allowlist/allowlist'

export default function Creator() {
  const events = useEvents()
  const auth = useAuth()
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      let createdEventsData: any
      try {
        const userDocRef = doc(db, 'users', auth.uid)
        if (!events.cachedUpcomingEvents) {
          createdEventsData = await events.fetchEventsData({
            collectionRef: collection(userDocRef, 'upcoming_events')
          })
          events.cacheUpcomingEvents(createdEventsData)
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
      <CreatedEventsDisplay
        title={'your created events'}
        eventsData={events.cachedUpcomingEvents}
        isFetching={!fetched}
      />
      <Allowlists />
    </div>
  )
}

function CreatedEventsDisplay({
  title,
  eventsData,
  isFetching
}: {
  title: string
  eventsData: EventInterface[] | null
  isFetching: boolean
}) {
  const titleSectionStyle = 'text-[25px] md:text-[32px] font-bold'
  const router = useRouter()

  return (
    <div className="flex flex-col items-center space-y-[20px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-row items-center justify-between border-b border-disabled pb-2">
        <p className={titleSectionStyle}>{title}</p>
        <Button
          text={'Create Event'}
          active={true}
          onClick={() => {
            router.push('/e/create')
          }}
        />
      </div>
      {isFetching ? (
        <div className="grid h-fit w-fit grid-cols-1 place-content-center gap-[30px] lg:grid-cols-2 2xl:grid-cols-3">
          <EventTile eventData={null} />
          <EventTile eventData={null} />
          <EventTile eventData={null} />
        </div>
      ) : eventsData?.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center space-y-4">
          <h4>
            You haven&apos;t created any events yet!{' '}
            <span
              onClick={() => {
                router.push('/e/create')
              }}
              className="cursor-pointer text-blue-500 hover:underline"
            >
              Start here.
            </span>
          </h4>
        </div>
      ) : (
        <div className="grid h-fit w-fit grid-cols-1 place-content-center gap-[30px] lg:grid-cols-2 2xl:grid-cols-3">
          {eventsData &&
            eventsData.map((eventData, index) => {
              return <EventTile key={index.toString()} eventData={eventData} />
            })}
        </div>
      )}
    </div>
  )
}
