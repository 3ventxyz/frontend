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
    <div className="bg-dashboard px-[20px] pb-[106px]  md:px-[112px] xl:pt-[35px] ">
      {!fetched ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col space-y-[35px]">
          <EventsDisplay
            title={'Upcoming Events'}
            route={''}
            events={upcomingEvents}
          />
          <EventsDisplay title={'Past Events'} route={''} events={eventData} />
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
      <div className="flex flex-row items-baseline justify-between">
        <h1 className={titleSectionStyle}>{title}</h1>
        <a className="hover:underline" href={route}>
          See all
        </a>
      </div>
      <div className="grid justify-center gap-y-[30px] gap-x-4 sm:gap-x-12 md:grid-cols-2  xl:grid-cols-3 xl:gap-y-[60px] ">
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
      <div className="h-[410px] w-[310px] rounded-3xl bg-white   lg:h-[548px] lg:w-[380px]">
        <div className="relative h-[310px] w-full rounded-3xl bg-gray-200   lg:h-[384px]">
          {event.imgURL === '' ? (
            <div className="flex h-full w-full flex-col items-center text-gray-500">
              <div className="grow"></div>
              <div>
                <div>
                  <TbPhotoOff className="h-[150px] w-[150px] " />
                </div>
                <div>No image available</div>
              </div>
              <div className="grow"></div>
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
