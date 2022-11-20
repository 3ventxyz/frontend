import DateCard from './components/dateCard'
import LandingPortrait from './components/landingPortrait'
import LocationCard from './components/locationCard'
import RegisterEventButton from './components/registerEventButton'

export default function NewLoadingEventPage() {
  return (
    <div className="flex h-auto w-screen flex-col items-center space-y-5 bg-secondaryBg px-[20px] pt-[35px] pb-[70px] md:pb-[106px] md:pt-[0px]">
      <div>
        <LandingPortrait host={null} event={null} />
      </div>
      <div className="flex space-x-[15px] ">
        <div id="first-col" className="flex w-[625px] flex-col space-y-[20px]">
          <div className="w-[600px]">
            <h3>Details</h3>
            <div className="space-y-1">
              <div className="h-[20px] animate-pulse rounded-lg bg-gray-400"></div>
              <div className="h-[20px] animate-pulse rounded-lg bg-gray-400"></div>
              <div className="h-[20px] animate-pulse rounded-lg bg-gray-400"></div>
              <div className="h-[20px] animate-pulse rounded-lg bg-gray-400"></div>
            </div>
          </div>
          {/* <RegisteredAttendees
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
			  /> */}
        </div>
        <div id="second-col" className="w-[330px] space-y-5 ">
          <LocationCard event={null} />
			  <DateCard event={null} />
			  <RegisterEventButton />
        </div>
      </div>
    </div>
  )
}
