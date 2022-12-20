// author: marthel
import Link from 'next/link'
import { EventInterface } from '../../shared/interface/common'
import EventTile from './eventTile'

/**Events Display
 * Input:
 *  -title: string, text that is used for the title of the main event.
 *  -route: string, eid that is used for redirecting to show all the events.
 *  -query: string, eid that is also used for redirecting to show all the events.
 *  -eventsData: EventInterface[] | null, data that is passed for build a list of event tiles.
 *  -seeAllOption?: boolean, it allows to display the seeAll button at the right corner.
 *  -showHeader?: boolean, TODO ???
 *  -isFetching: boolean, it allows to display the loading animation.
 *  -emptyMessage: string, it is used when there are no events for notifying the user.
 */

export default function EventsDisplay({
  title,
  route,
  query,
  eventsData,
  seeAllOption = false,
  showHeader = true,
  isFetching,
  emptyMessage
}: {
  title: string
  route: string
  query: any
  eventsData: EventInterface[] | null
  seeAllOption?: boolean
  showHeader?: boolean
  isFetching: boolean
  emptyMessage: string
}) {
  const titleSectionStyle = 'text-[25px] md:text-[32px] font-bold'

  if (
    title === 'your created events' &&
    !isFetching &&
    eventsData?.length === 0
  ) {
    return <></>
  }

  return (
    <div className="flex flex-col items-center space-y-[20px]">
      {showHeader && (
        <div className="mx-auto flex w-full max-w-[1200px] flex-row items-center justify-between border-b border-disabled pb-2">
          <p className={titleSectionStyle}>{title}</p>
          {seeAllOption ? (
            <Link href={{ pathname: route, query: query }}>
              <div className="cursor-pointer hover:underline">see all</div>
            </Link>
          ) : (
            <></>
          )}
        </div>
      )}
      {isFetching ? (
        <div className="grid h-fit w-fit grid-cols-1 place-content-center gap-[30px] lg:grid-cols-2 2xl:grid-cols-3">
          <EventTile eventData={null} />
          <EventTile eventData={null} />
          <EventTile eventData={null} />
        </div>
      ) : eventsData?.length === 0 ? (
        <div className="flex w-full flex-row items-center justify-center ">
          <h4>{emptyMessage}</h4>
        </div>
      ) : (
        <div className="grid h-fit w-fit grid-cols-1 place-content-center gap-[30px] lg:grid-cols-2 2xl:grid-cols-3">
          {eventsData &&
            eventsData.map((eventData, index) => {
              return <EventTile key={index.toString()} eventData={eventData} />
            })}
        </div>
      )}
    </div>
  )
}
