// import DateCard from './dateCard'
import { EventDetails } from './eventDetails'
import LandingPortrait from './landingPortrait'

export default function LoadingEventPage() {
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
              <div className="h-[20px] animate-pulse rounded-lg bg-gray-400"></div>
              <div className="h-[20px] animate-pulse rounded-lg bg-gray-400"></div>
              <div className="h-[20px] animate-pulse rounded-lg bg-gray-400"></div>
              <div className="h-[20px] animate-pulse rounded-lg bg-gray-400"></div>
            </div>
          </div>
        </div>
        <div id="second-col" className="w-[330px] space-y-5 ">
          <div className="sticky top-[100px]">
            <EventDetails event={null} />
          </div>
        </div>
      </div>
    </div>
  )
}
