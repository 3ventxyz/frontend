import { useEffect, useState } from 'react'
import { EventInterface } from '../../shared/interface/common'
import LandingPortrait from './components/landingPortrait'
import RegisteredAttendees from './components/registeredAttendees'
import SocialFeed from './components/socialFeed'
import { TbPhoto } from 'react-icons/tb'
import { BsCalendar3 } from 'react-icons/bs'
import { useRouter } from 'next/router'

/** these imports must be in a different place*/
import { doc, getDoc } from '@firebase/firestore'
import { db } from '../../services/firebase_config'
import LocationCard from './components/locationCard'

enum EventPageEnum {
  fetchingData,
  fetchedData,
  purchasedTicket
}

export default function NewLoadedPage({
  event,
  avatar,
  username,
  isEventCreator = false
}: {
  event: EventInterface | null
  avatar: string
  username: string
  isEventCreator?: boolean
}) {
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
    <div className="flex h-auto w-screen flex-col items-center space-y-5 bg-secondaryBg px-[20px] pt-[35px] pb-[70px] md:pb-[106px] md:pt-[0px]">
      <div>
        <LandingPortrait
          title={'title'}
          host={'hostname'}
          avatar={'imgurl'}
          event={event}
        />
      </div>
      <div className="flex space-x-[15px] ">
        <div id="first-col" className="flex flex-col space-y-[20px] ">
          <div className="w-[600px]">
            <h3>Details</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui
              faucibus in ornare quam viverra orci sagittis. Tempus imperdiet
              nulla malesuada pellentesque. Sit amet tellus cras adipiscing enim
              eu turpis egestas. Lectus arcu bibendum at varius vel pharetra.
              Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla
              facilisi. Tempus egestas sed sed risus pretium quam vulputate.
              Viverra justo nec ultrices dui sapien. Scelerisque in dictum non
              consectetur a. Adipiscing elit pellentesque habitant morbi. Tellus
              mauris a diam maecenas sed enim ut sem viverra. Elit duis
              tristique sollicitudin nibh sit amet commodo nulla. Turpis egestas
              sed tempus urna et pharetra pharetra. Et tortor at risus viverra
              adipiscing at in tellus. Semper feugiat nibh sed pulvinar.
              Convallis aenean et tortor at risus.
            </div>
          </div>
          <RegisteredAttendees isMobile={false} eid={event?.event_id} />
          {/* <SocialFeed
            isMobile={false}
            avatar={avatar}
            username={username}
            eid={event?.event_id}
            uid={event?.uid}
          /> */}
        </div>
        <div id="second-col" className="w-[330px] space-y-5 ">
          <LocationCard event={event} />
          <div
            id="date-card"
            className="flex h-[100px]  space-x-3 rounded-2xl bg-white px-[10px]"
          >
            <div className="flex h-[100px] w-[60px] items-center justify-center">
              <BsCalendar3 className="h-[60px] w-[60px]" />
            </div>
            <div id="date-text" className="flex flex-col justify-center">
              <div className="text-[24px] font-bold ">Date and time:</div>
              <div>
                Wed, Nov 16, 2022, 7:00 PM - Fri, Nov 18, 2022, 8:00 PM PST
              </div>
            </div>
          </div>

          <div
            id="register-event-button"
            className="flex h-[85px]  items-center justify-center rounded-2xl bg-white"
          >
            <div className="text-[20px] font-bold">Register Event</div>
          </div>
        </div>
      </div>
    </div>
  )
}
