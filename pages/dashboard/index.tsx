import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { EventInterface } from '../../shared/interface/common'
import { db } from '../../services/firebase_config'
import {
  getDocs,
  getDoc,
  doc,
  query,
  DocumentData,
  limit,
  DocumentSnapshot,
  collection,
  orderBy,
  CollectionReference
} from '@firebase/firestore'
import { TbPhotoOff } from 'react-icons/tb'
import { useEventsCache } from '../../context/cacheEventContext'

export default function Dashboard() {
  const [fetched, setFetched] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<EventInterface[]>([])
  const [pastEvents, setPastEvents] = useState<EventInterface[]>([])
  const eventsCache = useEventsCache()

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
    const fetchEventsData = async ({
      collectionRef
    }: {
      collectionRef: CollectionReference<DocumentData>
    }) => {
      const eventsRef = await getDocs(
        query(collectionRef, orderBy('timestamp', 'desc'), limit(3))
      )
      const eventsList = []
      for (const eventRef of eventsRef.docs) {
        const eventDoc: any = await getDoc(eventRef.data().eventReference)
        eventsList.push(newEventData(eventDoc))
      }
      return eventsList
    }

    const fetchData = async () => {
      let pastEventsData
      let upcomingEventsData
      try {
        const userDocRef = doc(db, 'user', 'guJqAglqTLAzoMIQA6Gi')
        const pastEventsCollRef: CollectionReference<DocumentData> = collection(
          userDocRef,
          'pastEvents'
        )
        const upcomingEventsCollRefs: CollectionReference<DocumentData> =
          collection(userDocRef, 'upcomingEvents')
        pastEventsData = await fetchEventsData({
          collectionRef: pastEventsCollRef
        })
        upcomingEventsData = await fetchEventsData({
          collectionRef: upcomingEventsCollRefs
        })
        setPastEvents(pastEventsData)
        setUpcomingEvents(upcomingEventsData)

        eventsCache.setCacheEventsData({
          cacheName: 'pastEventsCache',
          url: 'http://localhost:3000/',
          // fetchedEventsData: pastEventsData
          fetchedEventsData: 'pastEventsData'
        })
        eventsCache.setCacheEventsData({
          cacheName: 'upcomingEventsCache',
          url: 'http://localhost:3000/',
          // fetchedEventsData: upcomingEventsData
          fetchedEventsData: 'upcomingEventsData'
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
    <div className="flex flex-col  space-y-[35px] bg-secondaryBg px-[20px] pb-[106px] pt-[35px] md:px-[112px] ">
      {!fetched ? (
        <div>Loading...</div>
      ) : (
        <>
          <EventsDisplay
            title={'upcoming events'}
            route={'dashboard/seeAll'}
            events={upcomingEvents}
          />
          <EventsDisplay
            title={'past events'}
            route={'dashboard/seeAll'}
            events={pastEvents}
          />
          {/* <EventsDisplay title={'past events'} route={'dashboard/seeAll'} events={eventData} /> */}
        </>
      )}
    </div>
  )
}

function EventsDisplay({
  title,
  route,
  events
}: {
  title: string
  route: string
  events: EventInterface[]
}) {
  const titleSectionStyle = 'text-[25px] md:text-[32px] font-bold'

  return (
    <div className="flex flex-col items-stretch space-y-[20px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-row items-end justify-between border-b border-disabled">
        <p className={titleSectionStyle}>{title}</p>
        <a className="hover:underline" href={route}>
          see all
        </a>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-row flex-wrap justify-evenly gap-[30px] 2xl:justify-start">
        {events.map((event, index) => {
          return <EventTile key={index.toString()} event={event} />
        })}
      </div>
    </div>
  )
}

function EventTile({ event }: { event: EventInterface }) {
  return (
    <Link href={`event/${event.id}`}>
      <div className="h-[460px] w-full max-w-[320px] rounded-3xl bg-white sm:h-[524px] sm:w-[380px] sm:max-w-[380px]">
        <div className="relative h-[384px] max-h-[320px] w-full max-w-[380px] rounded-3xl bg-gray-200 sm:max-h-full">
          {event.imgURL === '' ? (
            <div className="flex h-full w-full flex-col items-center justify-center text-gray-500">
              <TbPhotoOff className="h-[150px] w-[150px] " />
              <p>No image available</p>
            </div>
          ) : (
            <Image
              src={event.imgURL}
              layout="fill"
              loading="lazy"
              objectFit="cover"
              className="rounded-3xl"
            />
          )}
        </div>
        <ul className="p-[20px]">
          <li className="... truncate text-[24px] font-bold">
            {event.eventTitle}
          </li>
          <li className="... truncate text-[14px]">{event.orgTitle}</li>
          <li className="... truncate text-[14px]">{event.date}</li>
          <li className="... truncate text-[14px]">{event.address}</li>
        </ul>
      </div>
    </Link>
  )
}

const eventData = [
  {
    id: '1',
    eventTitle: 'eventTitle',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: ''
  },
  {
    id: '2',
    eventTitle: 'eventTitle1',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: ''
  },
  {
    id: '3',
    eventTitle: 'eventTitle2',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: ''
  },
  {
    id: '4',
    eventTitle: 'eventTitle3',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: ''
  },
  {
    id: '5',
    eventTitle: 'eventTitle4',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: ''
  },
  {
    id: '6',
    eventTitle: 'eventTitle5',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: ''
  }
]
