import { useEffect } from 'react'
import {
  startOfToday,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInYears
} from 'date-fns'
import {
  EventInterface,
  PostInterface,
  UserInterface
} from '../../../shared/interface/common'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../../components/buttons/button'
import useEventStatus from '../hooks/event/useEventStatus'
import useEventValues from '../hooks/event/useEventValues'
import CreateEventTextInput from './createEventTextInput'
import { useEvents } from '../../../contexts/events'
import { EventModalOptions } from '../../../shared/enums/enums'

export default function SocialFeed({
  isMobile,
  userData,
  eventData
}: {
  isMobile: boolean
  userData: UserInterface | null
  eventData: EventInterface | null
}) {
  const [currStatus, { setIsFetchingPosts }] = useEventStatus()
  const [currValues, { fetchPosts, setComment, uploadPost }] = useEventValues()
  const events = useEvents()
  /**
   * --pass the posts collection reference of the event and fetch it here the docs. There must be a query for the most
   * recent posts to the oldest posts, and it should be the 10 recent posts.
   * Also, create a function that creates a new post doc in the collection that
   * is inside the eid doc. Where the user is at the current event page, each post will be created with
   * the click of 'new post' button.
   */

  const onTextChange = (name: string, value: string) => {
    setComment(value)
  }
  useEffect(() => {
    const fetchData = async () => {
      if (userData !== null && eventData !== null)
        fetchPosts(userData.uid, eventData.event_id)
      setIsFetchingPosts(false)
    }
    if (currStatus.isFetchingPosts) {
      fetchData()
    }
  }, [])
  return (
    <div id="social-feed-web" className="w-full">
      <div className="flex items-center justify-between pr-[10px]">
        <h4>Activity</h4>
        <span
          onClick={() => {
            events.setDisplayModal(true)
            events.setEventModalOption(EventModalOptions.viewAllPosts)
          }}
          className="text-blue-600 hover:cursor-pointer hover:underline"
        >
          view all comments
        </span>
      </div>
      <div id="comment-input" className="mr-[12px] flex space-x-2 pb-[10px] ">
        <div className="mt-[15px] hidden h-[50px] w-[50px] rounded-full bg-red-200 lg:block ">
          <Link href={`/u/${userData?.uid}`}>
            <div className="relative h-[50px] w-[50px] rounded-full hover:cursor-pointer ">
              <Image
                src={userData ? userData.avatar : ''}
                loading="lazy"
                layout="fill"
                objectFit="cover"
                className="rounded-full bg-gray-200"
              />
            </div>
          </Link>
        </div>
        <div className="flex w-full flex-col items-end space-y-2">
          <CreateEventTextInput
            id={''}
            placeholder="comment..."
            textArea={true}
            labelText={''}
            setTextValue={onTextChange}
            maxWidth={600}
            value={currValues.comment}
            maxWidthForm={600}
            name={'comment'}
          />
          <Button
            text={'comment'}
            active={currValues.comment !== '' ? true : false}
            onClick={async () => {
              if (userData && eventData) {
                await uploadPost(userData, eventData)
                setComment('')
              }
            }}
          />
        </div>
      </div>
      <hr />
      {/* use the max-height parameter so it can be resized based from the number of comments. */}
      <div
        id="social-feed-mobile"
        className="thin-scrollbar h-[500px] overflow-y-auto py-[5px]"
      >
        <div className="space-y-[5px]">
          {currValues.posts &&
            currValues.posts.map((post, index) => {
              console.log(post.avatar)
              return (
                <SocialFeedPost key={index} isMobile={isMobile} post={post} />
              )
            })}
        </div>
      </div>
      <hr />
    </div>
  )
}

/**
 * --it uses the avatar, username, uid for accessing their profile page,
 *   the content of the post. (currently use only text, later check
 * how to add images and gifs in each post and in the text area)
 */

function SocialFeedPost({
  isMobile,
  post
}: {
  isMobile: boolean
  post: PostInterface
}) {
  const calculateAgeOfPost = (dateTime: Date) => {
    const differenceDays = differenceInCalendarDays(startOfToday(), dateTime)
    const differenceMonths = differenceInCalendarMonths(
      startOfToday(),
      dateTime
    )
    const differenceYears = differenceInYears(startOfToday(), dateTime)
    if (differenceYears >= 1) {
      if (differenceYears > 1) {
        return `${differenceYears}` + ' years ago'
      }
      return 'a year ago'
    } else if (differenceMonths >= 1) {
      if (differenceMonths > 1) {
        return `${differenceMonths}` + ' months ago'
      }
      return 'a month ago'
    }
    if (differenceDays >= 30) {
      if (differenceDays <= 30 && differenceDays >= 2) {
        return `${differenceDays}` + ' days ago'
      }
      if (differenceDays == 1) {
        return 'yesterday'
      }
    }
    return 'today'
  }

  return isMobile ? (
    <div className="flex flex-col items-start space-x-2  px-[3px]">
      <div className="flex space-x-2">
        <Link href={`/u/${post.uid}`}>
          <div className="relative h-[25px] w-[25px] rounded-full hover:cursor-pointer ">
            <Image
              src={post.avatar ?? ''}
              loading="lazy"
              layout="fill"
              objectFit="cover"
              className="rounded-full bg-gray-200"
            />
          </div>
        </Link>
        <div className="flex flex-col items-start space-y-0">
          <div className="my-0 text-[21px]"></div>
          <p className="my-0 py-0 text-[15px]">
            <Link href={`/u/${post.uid}`}>
              <span className="font-bold hover:cursor-pointer hover:underline">
                {post.username}
              </span>
            </Link>
            commented
          </p>
          <div className="my-0 py-0 text-[12px]">
            {calculateAgeOfPost(post.date_posted)}
          </div>
        </div>
      </div>
      <div className="">{post.post_content}</div>
    </div>
  ) : (
    <div className="border-1 mr-[5px] flex flex-col rounded-2xl bg-white py-[8px] px-[8px] shadow-sm">
      <div className="flex items-start space-x-2 ">
        <div className="relative h-[45px] w-[45px] rounded-full hover:cursor-pointer ">
          <Link href={`/u/${post.uid}`}>
            <Image
              src={post.avatar ?? ''}
              loading="lazy"
              layout="fill"
              objectFit="cover"
              className="rounded-full bg-gray-200"
            />
          </Link>
        </div>
        <div className="flex w-fit flex-col items-start space-y-0">
          <div className="my-0 text-[21px]"></div>
          <p className="my-0 py-0 text-[15px]">
            <Link href={`/u/${post.uid}`}>
              <span className="font-bold hover:cursor-pointer hover:underline">
                {post.username}
              </span>
            </Link>{' '}
            commented
          </p>
          <div className="my-0 py-0 text-[15px]">
            {calculateAgeOfPost(post.date_posted)}
          </div>
          <div className="">{post.post_content}</div>
        </div>
      </div>
    </div>
  )
}
