import { useEffect, useState } from 'react'
import { EventInterface } from '../../shared/interface/common'
import LandingPortrait from './components/landingPortrait'
import RegisteredAttendees from './components/registeredAttendees'
import SocialFeed from './components/socialFeed'
import { TbPhoto, TbMap } from 'react-icons/tb'
import { BsCalendar3 } from 'react-icons/bs'
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
    <div className="flex h-auto w-screen flex-col items-center space-y-5 bg-secondaryBg px-[20px] pt-[35px] pb-[70px] md:pb-[106px] md:pt-[40px]">
      <div>
        <LandingPortrait
          title={'title'}
          host={'hostname'}
          avatar={'imgurl'}
          event={event}
        />
      </div>
      <div className="flex space-x-[15px] ">
        <div
          id="first-col"
          className="flex flex-col space-y-[20px] bg-green-500"
        >
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
          <RegisteredAttendees isMobile={false} />
          <SocialFeed isMobile={false} avatar={''} username={''} />
        </div>
        <div id="second-col" className="space-y-5 w-[330px] bg-yellow-500">
          <div
            id="location-card"
            className="flex h-[150px] space-x-3 rounded-2xl bg-white"
          >
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-2xl bg-green-200">
              <TbMap className="h-[50px] w-[50px]" />
            </div>
            <div id="location-text " className="w-[100px] flex flex-col items-center">
              <div className="text-[24px] font-bold">location</div>
              <div className="text-wrap">
                123 test ave, los angeles, california, 90032, USA
              </div>
            </div>
          </div>

          <div
            id="date-card"
            className="flex h-[100px]  space-x-3 rounded-2xl bg-white px-[10px]"
          >
            <div className="flex h-[100px] w-[60px] items-center justify-center">
              <BsCalendar3 className="h-[60px] w-[60px]" />
            </div>
            <div id="date-text" className='flex flex-col justify-center'>
              <div className="text-[24px] font-bold ">Date and time:</div>
              <div>Wed, Nov 16, 2022, 7:00 PM - Fri, Nov 18, 2022, 8:00 PM PST</div>
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
