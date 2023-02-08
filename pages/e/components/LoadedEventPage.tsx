import LandingPortrait from './landingPortrait'
import RegisteredAttendees from './registeredAttendees'
import SocialFeed from './socialFeed'
import { useRouter } from 'next/router'
import LocationCard from './locationCard'
import DateCard from './dateCard'
import RegisterEventButton from './registerEventButton'
import { useEvents } from '../../../contexts/events'
import { useUsers } from '../../../contexts/users'
import { Button } from '../../../components/buttons/button'

// useRef for passing the host data that is fetched from the eid page.
export default function LoadedEventPage({
  isEventCreator = false,
  setShowModal
}: {
  setShowModal: (toggle: boolean) => void
  isEventCreator?: boolean
}) {
  const events = useEvents()
  const users = useUsers()
  const router = useRouter()

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
            userData={users.loggedInUserData}
            eventData={events.accessedEventData}
          />
        </div>
        <div id="second-col" className="w-[330px] space-y-5 ">
          <LocationCard event={events?.accessedEventData} />
          <DateCard event={events?.accessedEventData} />
          <RegisterEventButton setShowModal={setShowModal} />
          {isEventCreator ? (
            <div>
              <Button
                text={'edit event'}
                active={true}
                onClick={() => {
                  router.push(`edit?eid=${events.accessedEventData?.event_id}`)
                  console.log('redirecting user to edit event page')
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
