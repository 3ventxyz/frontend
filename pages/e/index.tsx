import { useEffect, useState } from 'react'
import { EventInterface } from '../../shared/interface/common'
import LandingPortrait from './components/landingPortrait'
import RegisteredAttendees from './components/registeredAttendees'
import SocialFeed from './components/socialFeed'

enum EventPageEnum {
  fetchingData,
  fetchedData,
  purchasedTicket
}

export default function EventUpdated() {
  /**qr code display */
  /** */

  const [eventPageStatus, setEventPageStatus] = useState<EventPageEnum>(
    EventPageEnum.fetchingData
  )
  const [event, setEvent] = useState<EventInterface | null>(null)

  useEffect(() => {}, [])
  return (
    <div className="flex h-auto w-screen flex-col items-center bg-secondaryBg px-[20px] pt-[35px] pb-[70px]   md:pb-[106px] md:pt-[40px]">
      <div>
        <LandingPortrait
          title={'title'}
          host={'hostname'}
          avatar={'imgurl'}
          event={event}
        />
      </div>
      <div className="flex">
        <div id="first-col" className="flex flex-col">
          <div className='w-[500px]'>
            <h4>Details</h4>
            <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui faucibus in ornare quam viverra orci sagittis. Tempus imperdiet nulla malesuada pellentesque. Sit amet tellus cras adipiscing enim eu turpis egestas. Lectus arcu bibendum at varius vel pharetra. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Tempus egestas sed sed risus pretium quam vulputate. Viverra justo nec ultrices dui sapien. Scelerisque in dictum non consectetur a. Adipiscing elit pellentesque habitant morbi. Tellus mauris a diam maecenas sed enim ut sem viverra. Elit duis tristique sollicitudin nibh sit amet commodo nulla. Turpis egestas sed tempus urna et pharetra pharetra. Et tortor at risus viverra adipiscing at in tellus. Semper feugiat nibh sed pulvinar. Convallis aenean et tortor at risus.
            </div>
          </div>
          <RegisteredAttendees isMobile={false} />
          <SocialFeed isMobile={false} avatar={''} username={''} />
        </div>
        <div id="second-col">
          <div>location card</div>
          <div>date and time card</div>
          <div>register ticket card</div>
        </div>
      </div>
    </div>
  )
}
