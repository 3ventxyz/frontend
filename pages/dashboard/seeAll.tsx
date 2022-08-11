// author: marthel
import { collection, doc } from '@firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useEvents } from '../../context/eventsContext'
import { db } from '../../services/firebase_config'
import { EventInterface } from '../../shared/interface/common'
import EventsDisplay from './components/eventsDisplay'
import { HiChevronLeft } from 'react-icons/hi'
import Button from '../../components/button'

export default function SeeAll() {
  const router = useRouter()
  const events = useEvents()
  const [title, setTitle] = useState('')
  // const [fetched, setIsFetched] = useState(false)
  const [eventsData, setEvents] = useState<Array<EventInterface>>([])
  const [mode, setMode] = useState('upcoming')

  useEffect(() => {
    if (typeof router.query.events === 'object') {
      setMode('upcoming')
    } else {
      setMode(router.query.events || 'upcoming')
    }
  }, [router.query.events])

  useEffect(() => {
    const setData = async () => {
      // if(!events) return

      let eventData: Array<EventInterface>
      const userDocRef = doc(db, 'user', 'guJqAglqTLAzoMIQA6Gi')

      switch (mode) {
        case 'upcoming':
          setTitle('all upcoming events')
          eventData = await events.fetchEventsData({
            collectionRef: collection(userDocRef, 'upcomingEvents'),
            numberOfEvents: 6
          })
          setEvents(eventData)
          break
        case 'past':
          setTitle('all past events')
          eventData = await events.fetchEventsData({
            collectionRef: collection(userDocRef, 'pastEvents'),
            numberOfEvents: 6
          })
          setEvents(eventData)
          break
        default:
          console.log('no setting error 404')
          break
      }
    }
    setData()
  }, [mode])

  return (
    <div className="flex flex-col items-center bg-secondaryBg px-[20px] pb-[106px] pt-[35px] md:px-[112px]">
      {/* <div className="flex flex-col bg-secondaryBg px-[20px] pb-[106px] pt-[35px] md:px-[112px]"> */}
      <div className="mx-auto mb-[20px] flex w-full max-w-[1200px] flex-row items-center justify-between border-b border-disabled pb-2">
        <div className="flex flex-row items-center">
          <button
            className="h-[40px]"
            onClick={() => {
              router.back()
            }}
          >
            <HiChevronLeft className="h-full" />
          </button>
          <p className="text-[25px] font-bold md:text-[32px]">{title}</p>
        </div>
        <div className="flex flex-row space-x-4">
          <Button
            text="upcoming"
            onClick={() => setMode('upcoming')}
            active={mode !== 'upcoming'}
            activeStyling={true}
          />
          <Button
            text="past"
            onClick={() => setMode('past')}
            active={mode !== 'past'}
            activeStyling={true}
          />
        </div>
      </div>

      <EventsDisplay
        title={title}
        route={''}
        query={undefined}
        eventsData={eventsData}
        showHeader={false}
      />
    </div>
  )
}
