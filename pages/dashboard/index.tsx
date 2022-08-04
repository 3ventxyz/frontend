import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { EventInterface } from '../shared/interface/common'
import { db } from '../../services/firebase_config'
import {
  collection,
  getDocs,
  getDoc,
  DocumentReference,
  DocumentData,
  DocumentSnapshot
} from '@firebase/firestore'

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
    <div className="space-y-[30px] bg-dashboard px-[20px] pt-[50px] pb-[106px] md:space-y-[69px] md:px-[112px] xl:pt-[148px]">
      {!fetched ? (
        <div>Loading...</div>
      ) : (
        <div>
          <EventsDisplay
            title={'Upcoming Events'}
            route={''}
            events={upcomingEvents}
          />
          <EventsDisplay title={'Past Events'} route={''} events={pastEvents} />
        </div>
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
    <div>
      <div className="flex flex-row items-baseline justify-between pb-[50px]">
        <h1 className={titleSectionStyle}>{title}</h1>
        <a className="hover:underline" href={route}>
          See all
        </a>
      </div>
      <div className="grid grid-cols-2 justify-center gap-y-3 gap-x-4 sm:grid-cols-3  sm:gap-x-12 sm:gap-y-5">
        {events.map((event, index) => {
          return (
            <div key={index.toString()}>
              <EventTile event={event} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function EventTile({ event }: { event: EventInterface }) {
  return (
    <Link href={`event/${event.id}`}>
      <div className="h-[250px] w-[150px] rounded-3xl bg-white  lg:h-[360px] lg:w-[240px] xl:h-[548px] xl:w-[380px]">
        <div className="relative h-[150px] w-full rounded-3xl bg-red-100  lg:h-[240px] xl:h-[384px]">
          <Image
            src={event.imgURL}
            layout="fill"
            loading="lazy"
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
        <div className="px-[21px] pt-[8px] xl:pt-[20px] xl:pb-[27px]">
          <ul>
            <li className="... truncate text-[20px] font-bold lg:text-[22px] xl:text-[24px]">
              {event.eventTitle}
            </li>
            <li className="... truncate text-[12px] lg:text-[13px] xl:text-[14px]">
              {event.orgTitle}
            </li>
            <li className="... truncate text-[12px] lg:text-[13px] xl:text-[14px]">
              {event.date}
            </li>
            <li className="... truncate text-[12px] lg:text-[13px] xl:text-[14px]">
              {event.address}
            </li>
          </ul>
        </div>
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
    imgURL: 'imgURL'
  },
  {
    id: '2',
    eventTitle: 'eventTitle1',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: 'imgURL'
  },
  {
    id: '3',
    eventTitle: 'eventTitle2',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: 'imgURL'
  },
  {
    id: '4',
    eventTitle: 'eventTitle3',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: 'imgURL'
  },
  {
    id: '5',
    eventTitle: 'eventTitle4',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: 'imgURL'
  },
  {
    id: '6',
    eventTitle: 'eventTitle5',
    orgTitle: 'orgTitle',
    date: 'date',
    address: 'address',
    imgURL: 'imgURL'
  }
]
