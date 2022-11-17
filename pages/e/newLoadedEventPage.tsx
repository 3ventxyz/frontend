import { useEffect, useState } from 'react'
import { EventInterface } from '../../shared/interface/common'
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
              {event?.description}
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
          <DateCard event={event} />
          <RegisterEventButton />
        </div>
      </div>
    </div>
  )
}
