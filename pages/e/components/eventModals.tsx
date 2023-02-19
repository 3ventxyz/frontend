import { useEffect } from 'react'
import { Modal } from '../../../components/utils/modal'
import { useEvents } from '../../../contexts/events'
import { useUsers } from '../../../contexts/users'
import { EventModalOptions } from '../../../shared/enums/enums'
import DisplayQRCode from '../../u/components/displayQRCode'
import useEventStatus from '../hooks/event/useEventStatus'
import useEventValues from '../hooks/event/useEventValues'
import RegisteredAttendee from './registeredAttendee'
import SocialFeedPost from './socialFeedPost'

export default function EventModals({
  showModal,
  handleOnClose,
  modalOption
}: {
  showModal: boolean
  handleOnClose: () => void
  modalOption: EventModalOptions
}) {
  // const num: number = 0
  switch (modalOption) {
    case EventModalOptions.registrationForm:
      return (
        <Modal
          visible={showModal}
          onClose={handleOnClose}
          width={'w-[500px]'}
          height={'h-[500px]'}
        >
          <div className="h-[400px] w-[400px] bg-green-300 ">
            ok let&pos;s update your new info for the event.
          </div>
        </Modal>
      )
    case EventModalOptions.seeAllAttendees:
      return (
        <Modal
          visible={showModal}
          onClose={handleOnClose}
          width={'w-[650px]'}
          height={'h-[500px]'}
        >
          <AllRegisteredAttendeesModal />
        </Modal>
      )
    case EventModalOptions.viewAllPosts:
      return (
        <Modal
          visible={showModal}
          onClose={handleOnClose}
          width={'w-[600px]'}
          height={'h-[450px]'}
        >
          <AllPostsModal />
        </Modal>
      )
    default:
      return (
        <Modal
          visible={showModal}
          onClose={handleOnClose}
          width={'w-[500px]'}
          height={'h-[500px]'}
        >
          <DisplayQRCode />
        </Modal>
      )
  }
}

function AllPostsModal() {
  const events = useEvents()
  const users = useUsers()
  const userData = users.loggedInUserData
  const eventData = events.accessedEventData
  const [currStatus, { setIsFetchingPosts }] = useEventStatus()
  const [currValues, { fetchPosts, setComment, uploadPost }] = useEventValues()

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
    <div className="">
      <h4>Viewing all posts</h4>
      <>
        <hr />
        {currStatus.isFetchingPosts ? (
          <>Loading</>
        ) : (
          <div
            id="social-feed-viwer"
            className="thin-scrollbar h-[400px] overflow-y-auto  py-[5px]"
          >
            <div className="space-y-[5px]">
              {currValues.posts &&
                currValues.posts.map((post, index) => {
                  console.log(post.avatar)
                  return (
                    <SocialFeedPost key={index} isMobile={false} post={post} />
                  )
                })}
            </div>
          </div>
        )}
        <hr />
      </>
    </div>
  )
}

function AllRegisteredAttendeesModal() {
  const [currStatus, { setIsFetchingAttendees }] = useEventStatus()
  const [currValues, { fetchAttendees }] = useEventValues()
  const events = useEvents()
  const eid = events.accessedEventData?.event_id? events.accessedEventData?.event_id :''

  useEffect(() => {
    const fetchData = async () => {
      fetchAttendees(eid)
      setIsFetchingAttendees(false)
    }
    if (currStatus.isFetchingAttendees) {
      fetchData()
    }
  }, [])
  return (
    <div className="w-auto  ">
      <h4>All Registered Attendees</h4>
      <hr />
      <div className="thin-scrollbar grid h-[450px]  grid-cols-5 gap-y-1 overflow-y-auto  py-[5px]">
        {currValues.attendees &&
          currValues.attendees.map((attendee, index) => {
            return <RegisteredAttendee key={attendee.uid} attendee={attendee} />
          })}
        {currValues.attendees &&
          currValues.attendees.map((attendee, index) => {
            return <RegisteredAttendee key={attendee.uid} attendee={attendee} />
          })}
      </div>
      <hr />
    </div>
  )
}
