// author: marthel
import { doc, getDoc } from '@firebase/firestore'
import { db } from '../../../services/firebase_config'
import { ReactElement, useEffect, useState } from 'react'
import { EventInterface } from '../../../shared/interface/common'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../../../components/button'
export default function LoadedEventPage({
  event,
  children,
  isEventCreator = false
}: {
  event: EventInterface | null
  children: ReactElement
  isEventCreator?: boolean
}): JSX.Element {
  const [profileUrlImg, setProfileUrlImg] = useState('')
  const [hostName, setHostName] = useState('')

  const router = useRouter()
  
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', event?.uid || '')
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setProfileUrlImg(`${docSnap.data().avatar}`)
        setHostName(docSnap.data().username)
      } else {
        console.log('No such document!')
        router.push('/dashboard')
      }
    }
    if (event?.uid) {
      fetchData()
    }
  }, [event?.uid])

  return (
    <>
      <div className="flex h-full max-w-[373px] flex-col items-center lg:items-start ">
        <div
          id="event-details"
          className="mb-[50px] w-auto space-y-[15px] font-medium leading-[40px] md:space-y-[25px] md:text-[14px]"
        >
          <h3>{event?.title !== null ? event?.title : 'Event Title'}</h3>
          <div
            id="mobile-event-image"
            className="relative h-[310px] w-[310px] rounded-[67px] px-[50px] py-[50px] lg:hidden"
          >
            <Image
              src={event ? event.img_url : ''}
              layout="fill"
              loading="lazy"
              objectFit="cover"
              className="rounded-[67px]"
            />
          </div>
          <Link href={`/u/${event?.uid}`}>
            <div className="flex h-auto w-fit cursor-pointer flex-row items-center space-x-2  ">
              {profileUrlImg ? (
                <Image
                  src={profileUrlImg}
                  layout="fixed"
                  width="35px"
                  height="35px"
                  loading="lazy"
                  className="rounded-full bg-gray-200"
                />
              ) : (
                <div className="h-[35px] w-[35px] rounded-full bg-gray-200" />
              )}
              <div className="flex h-fit flex-col space-y-0">
                <div className="h-[22px] ">
                  <b className=" ">Host:</b>
                </div>
                <div>
                  <p className="">{hostName}</p>
                </div>
              </div>
            </div>
          </Link>
          <div className="leading-[25px]">
            <h4>Start date:</h4>
            {event?.start_date?.toDateString()},{' '}
            {event?.start_date?.toLocaleTimeString()}
          </div>
          <div className="leading-[25px]">
            <h4>End date:</h4>
            {event?.end_date?.toDateString()},{' '}
            {event?.end_date?.toLocaleTimeString()}
          </div>
          <div className="leading-[25px]">
            <h4>Location:</h4>
            {event?.location?.address}
          </div>
          {/* edit event component */}
          <div className="relative h-[200px] w-[200px] rounded-[20px] bg-green-100">
            <a
              rel="noreferrer noopener"
              target="_blank"
              href={`http://maps.google.com?q=${event?.location?.lat},${event?.location?.long}`}
            >
              <Image
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${event?.location?.lat},${event?.location?.long}&zoom=15&size=300x300&markers=size:mid%color:blue%7Clabel:E%7C${event?.location?.lat},${event?.location?.long}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
                layout="fill"
                loading="lazy"
                objectFit="cover"
                className="rounded-[20px]"
              />
            </a>
          </div>
          <div className="leading-[20px]">
            <h4>Event description:</h4>
            {event?.description}
          </div>
        </div>
        {children}
      </div>
      <div className="flex flex-col space-y-5">
        <div className="relative hidden h-[400px] w-[400px] rounded-[67px] bg-slate-400 px-[50px] py-[50px] lg:block">
          <Image
            src={event ? event.img_url : ''}
            layout="fill"
            loading="lazy"
            objectFit="cover"
            className="rounded-[67px]"
          />
        </div>
        {isEventCreator ? (
          <div>
            <Button
              text={'edit event'}
              active={true}
              onClick={() => {
                router.push(`edit?eid=${event?.event_id}`)
                console.log('redirecting user to edit event page')
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
