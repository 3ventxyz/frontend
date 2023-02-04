import LandingPortrait from './landingPortrait'
import RegisteredAttendees from './registeredAttendees'
import SocialFeed from './socialFeed'
import { useRouter } from 'next/router'
import RegisterEventButton from './registerEventButton'
import { useEvents } from '../../../contexts/events'
import { useUsers } from '../../../contexts/users'
<<<<<<< HEAD
import { Button } from '../../../components/buttons/button'
import { EventDetails } from './eventDetails'
=======
import Button from '../../../components/buttons/button'
import { EventDetails } from './eventDetails'
>>>>>>> b7d9db5 (dateCard and locationCard moved to eventDetails; eventDetails sticked to the top of event page)

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
      <div className="flex space-x-[15px]">
        <div id="first-col" className="flex w-[625px] flex-col space-y-[20px]">
          <div className="w-[600px]">
            <h3>Event Description</h3>
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
        <div id="second-col" className="w-[330px]">
          <div className="sticky top-[100px] space-y-5">
            <EventDetails event={events?.accessedEventData} />
            {/* TODO(2/2/2023) Marthel: Update this button to have a modal component. That it can help
          to update the logged in user to update his/her info to register. And add a special disabler, for the 
          host. */}
            <RegisterEventButton setShowModal={setShowModal} />
            {/* ================================================== */}
            {isEventCreator ? (
              <div>
                <Button
                  text={'edit event'}
                  active={true}
                  onClick={() => {
                    router.push(
                      `edit?eid=${events.accessedEventData?.event_id}`
                    )
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
    </div>
  )
}
