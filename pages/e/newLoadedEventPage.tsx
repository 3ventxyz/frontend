import { useEffect, useState } from 'react'
import LandingPortrait from './components/landingPortrait'
import RegisteredAttendees from './components/registeredAttendees'
import SocialFeed from './components/socialFeed'
import { TbPhoto } from 'react-icons/tb'
import { useRouter } from 'next/router'

/** these imports must be in a different place*/
import { doc, getDoc } from '@firebase/firestore'
import { db } from '../../services/firebase_config'
import LocationCard from './components/locationCard'
import DateCard from './components/dateCard'
import RegisterEventButton from './components/registerEventButton'
import { useEvents } from '../../contexts/events'
import { useUsers } from '../../contexts/users'

enum EventPageEnum {
  fetchingData,
  fetchedData,
  purchasedTicket
}

// useRef for passing the host data that is fetched from the eid page.
export default function NewLoadedPage({
  isEventCreator = false
}: {
  isEventCreator?: boolean
}) {
  const events = useEvents()
  const users = useUsers()

  return (
    <div className="flex h-auto w-screen flex-col items-center space-y-5 bg-secondaryBg px-[20px] pt-[35px] pb-[70px] md:pb-[106px] md:pt-[0px]">
      <div>
        <LandingPortrait
          host={users?.eventHostData}
          event={events?.accessedEventData}
        />
      </div>
      <div className="flex space-x-[15px] ">
        <div id="first-col" className="flex w-[625px] flex-col space-y-[20px]">
          <div className="w-[600px]">
            <h3>Details</h3>
            <div>{events?.accessedEventData?.description}</div>
          </div>
          <RegisteredAttendees
            isMobile={false}
            eid={events?.accessedEventData?.event_id}
          />
          <SocialFeed
            isMobile={false}
            avatar={
              users.loggedInUserData?.avatar !== undefined
                ? users.loggedInUserData?.avatar
                : ''
            }
            username={
              users.loggedInUserData?.username !== undefined
                ? users.loggedInUserData?.username
                : ''
            }
            eid={events?.accessedEventData?.event_id}
            uid={events?.accessedEventData?.uid}
          />
        </div>
        <div id="second-col" className="w-[330px] space-y-5 ">
          <LocationCard event={events?.accessedEventData} />
          <DateCard event={events?.accessedEventData} />
          <RegisterEventButton />
        </div>
      </div>
    </div>
  )
}
