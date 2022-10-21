// author: marthel
import { TbPhoto, TbMap } from 'react-icons/tb'
import Spinner from '../../../components/spinner'

export default function LoadingEventPage() {
  return (
    <>
      <div className="flex h-full max-w-[373px] animate-pulse flex-col items-center lg:items-start">
        <div
          id="event-details"
          className="mb-[50px] w-full space-y-[15px] font-medium leading-[40px] md:space-y-[25px] md:text-[14px]"
        >
          <div className="h-[45px] w-full rounded-lg bg-gray-300"></div>
          {/* username icon*/}
          <div className="flex h-auto w-fit cursor-pointer flex-row items-center space-x-2  ">
            <div className=" h-[35px] w-[35px] rounded-3xl bg-gray-200"></div>
            <div className="flex h-fit flex-col space-y-0">
              <div className="h-[22px] ">
                <b className=" ">Host:</b>
              </div>
              <div>
                <p className="">username</p>
              </div>
            </div>
          </div>
          <div
            id="mobile-event-image"
            className="relative h-[310px] w-[310px] rounded-[67px] bg-gray-300 px-[50px]  py-[50px] text-gray-400 lg:hidden"
          >
            <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
              <TbPhoto className="h-[150px] w-[150px]" />
            </div>
          </div>

          {/* start and end date */}
          <div className="flex flex-col space-y-[8px] leading-[25px]">
            <h4>Start date:</h4>
            <div className="h-[19px] w-[180px] rounded-lg bg-gray-300"></div>
          </div>
          <div className="flex flex-col space-y-[8px] leading-[25px]">
            <h4>End date:</h4>
            <div className="h-[19px] w-[180px] rounded-lg bg-gray-300"></div>
          </div>
          {/* location */}
          <div className="leading-[25px]">
            <h4>Location:</h4>
            <div className="h-[19px] w-[280px] rounded-lg bg-gray-300"></div>
          </div>
          <div className="flex h-[200px] w-[200px] items-center justify-center rounded-[20px] bg-green-200">
            <TbMap className="h-[50px] w-[50px]" />
          </div>
          {/* description */}
          <div className="leading-[20px]">
            <h4>Event description:</h4>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <div className="h-[19px] w-full rounded-lg bg-gray-300 leading-[20px]"></div>
            <div className="h-[19px] w-full rounded-lg bg-gray-300 leading-[20px]"></div>
            <div className="h-[19px] w-full rounded-lg bg-gray-300 leading-[20px]"></div>
          </div>
        </div>
        <div className="flex h-[364px] w-[320px] flex-col items-center justify-center space-y-[19px] md:w-[373px]">
          <Spinner />
        </div>
      </div>
      <div>
        <div className="relative hidden h-[400px] w-[400px] rounded-[67px] bg-gray-300 px-[50px] py-[50px] text-gray-400 lg:block">
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
            <TbPhoto className="h-[150px] w-[150px]" />
          </div>
        </div>
      </div>
    </>
  )
}
