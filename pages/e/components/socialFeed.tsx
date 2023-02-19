import { useEffect } from 'react'
import { EventInterface, UserInterface } from '../../../shared/interface/common'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../../components/buttons/button'
import useEventStatus from '../hooks/event/useEventStatus'
import useEventValues from '../hooks/event/useEventValues'
import CreateEventTextInput from './createEventTextInput'
import { useEvents } from '../../../contexts/events'
import { EventModalOptions } from '../../../shared/enums/enums'
import SocialFeedPost from './socialFeedPost'

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
        id="social-feed-viwer"
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
