import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { EventInterface } from '../../shared/interface/common'
import { db } from '../../services/firebase_config'
import {
  collection,
  getDocs,
  getDoc,
  DocumentReference,
  DocumentData,
  DocumentSnapshot
} from '@firebase/firestore'
import { TbPhotoOff } from 'react-icons/tb'

export default function Dashboard() {
  const [fetched, setFetched] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<EventInterface[]>([])
  const [pastEvents, setPastEvents] = useState<EventInterface[]>([])

  useEffect(() => {
    const fetchData = async () => {
      let pastEventsRefs: Array<DocumentReference> = []
      let upcomingEventsRefs: Array<DocumentReference> = []
      var pastEventsDocs: Array<DocumentSnapshot<DocumentData>> = []
      var upcomingEventsDocs: Array<DocumentSnapshot<DocumentData>> = []
      var upcomingEventsData: Array<EventInterface> = []
      var pastEventsData: Array<EventInterface> = []

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

      const query = await getDocs(collection(db, 'user'))
      if (!query) {
        return
      }

      query.forEach((userRef) => {
        userRef.data().pastEvents.forEach((pastEventRef: DocumentReference) => {
          pastEventsRefs.push(pastEventRef)
          console.log(pastEventRef)
        })
        userRef
          .data()
          .upcomingEvents.forEach((upcomingEventRef: DocumentReference) => {
            upcomingEventsRefs.push(upcomingEventRef)
            console.log(upcomingEventRef)
          })
      })

      for (const pastEventRef of pastEventsRefs) {
        const pastEventDoc = await getDoc(pastEventRef)
        pastEventsDocs.push(pastEventDoc)
      }

      for (const upcomingEventRef of upcomingEventsRefs) {
        const upcomingEventDoc = await getDoc(upcomingEventRef)
        upcomingEventsDocs.push(upcomingEventDoc)
      }

      pastEventsData = pastEventsDocs.map<EventInterface>(newEventData)
      upcomingEventsData = upcomingEventsDocs.map<EventInterface>(newEventData)

      setUpcomingEvents(upcomingEventsData)
      setPastEvents(pastEventsData)
      setFetched(true)
    }
    if (!fetched) {
      fetchData()
    }
  }, [])

  return (
    <div className="bg-secondaryBg flex flex-col space-y-[35px] px-[20px] pb-[106px] md:px-[112px] pt-[35px] ">
      {!fetched ? (
        <div>Loading...</div>
      ) : (
        <>
          <EventsDisplay
            title={'upcoming events'}
            route={''}
            events={upcomingEvents}
          />
          <EventsDisplay title={'past events'} route={''} events={eventData} />
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
      <div className="flex flex-row mx-auto w-full max-w-[1200px] items-end justify-between border-b border-disabled">
        <p className={titleSectionStyle}>{title}</p>
        <a className="hover:underline" href={route}>
          see all
        </a>
      </div>
      <div className="mx-auto max-w-[1200px] justify-evenly 2xl:justify-start gap-[30px] flex flex-row flex-wrap">
        {events.map((event, index) => {
          return (
            <EventTile key={index.toString()} event={event} />
          )
        })}
      </div>
    </div>
  )
}

function EventTile({ event }: { event: EventInterface }) {
  return (
    <Link href={`event/${event.id}`}>
      <div className="w-full max-w-[320px] sm:max-w-[380px] rounded-3xl bg-white h-[460px] sm:h-[524px] sm:w-[380px]">
        <div className="relative w-full max-h-[320px] sm:max-h-full max-w-[380px] rounded-3xl bg-gray-200 h-[384px]">
          {event.imgURL === '' ? (
            <div className="flex h-full w-full flex-col justify-center items-center text-gray-500">
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
            <li className="... truncate text-[14px]">
              {event.orgTitle}
            </li>
            <li className="... truncate text-[14px]">
              {event.date}
            </li>
            <li className="... truncate text-[14px]">
              {event.address}
            </li>
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
