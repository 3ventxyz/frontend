// author: marthel + ben
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TicketInterface, UserInterface } from '../../shared/interface/common'
import Modal from '../../components/modal'
import { useEvents } from '../../contexts/events'
import { useAuth } from '../../contexts/auth'
import { useUsers } from '../../contexts/users'
import CreateCheckoutSession from './components/createCheckoutSession'
import checkRegisteredAttendee from '../../services/check_registered_attendee'

import LoadedEventPage from './components/LoadedEventPage'
import LoadingEventPage from './components/LoadingEventPage'

enum EventPageEnum {
  fetchingData,
  fetchedData,
  purchasedTicket
}

export default function Event() {
  const [eventPageStatus, setEventPageStatus] = useState<EventPageEnum>(
    EventPageEnum.fetchingData
  )
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(
    null
  )
  const [showModal, setShowModal] = useState(false)
  const [isEventCreator, setIsEventCreator] = useState(false)

  const router = useRouter()
  const events = useEvents()
  const auth = useAuth()
  const users = useUsers()

  const { eid } = router.query

  const confirmSelectedTicketPurchase = () => {
    setEventPageStatus(EventPageEnum.fetchingData)
    fetchData();
  }

  const handleOnClose = () => setShowModal(false)

  const fetchData = async () => {
    const loggedInUserData: UserInterface = await users.fetchUserData({
      uid: auth.uid,
      isLoggedInUser: true
    })
    users.cacheLoggedInUserData(loggedInUserData)

    const eventId: any = eid
    const accessedEventData = await events.fetchAccessedEventData(eventId)
    events.cacheAccessedEventData(accessedEventData)

    const hostUser = await users.fetchUserData({
      uid: accessedEventData.uid
    })
    users.cacheEventHostData(hostUser)

    const isUserOwner = events.accessedEventData?.uid === loggedInUserData.uid
    setIsEventCreator(isUserOwner)
    if (!accessedEventData) return
    events.cacheAccessedEventData(accessedEventData)

    var isUserRegistered: boolean
    let ticket: TicketInterface = {
      ticketTitle: 'Free Attendee',
      registeredUsers: accessedEventData.registered_attendees,
      capLimit: accessedEventData.ticket_max,
      tokenId: '',
      price: 0
    }
    setSelectedTicket(ticket)
    isUserRegistered = await checkRegisteredAttendee({
      uid: auth.uid,
      eid: eventId
    })
    setEventPageStatus(EventPageEnum.fetchedData)
  }

  useEffect(() => {
    if (eventPageStatus === EventPageEnum.fetchingData && eid) {
      fetchData()
    }
  }, [eid])

  const EventPage = () => {
    switch (eventPageStatus) {
      case EventPageEnum.fetchedData:
        return (
          <LoadedEventPage
            setShowModal={setShowModal}
            isEventCreator={isEventCreator}
          />
        )
      default:
        return <LoadingEventPage />
    }
  }

  return (
    <>
      <div className="flex w-screen flex-col justify-center bg-secondaryBg px-[20px] pt-[35px] pb-[70px] sm:px-[210px] md:flex-row md:pb-[106px] md:pt-[35px] lg:space-x-[80px] xl:space-x-[291px]">
        {EventPage()}
      </div>
      <Modal
        visible={showModal}
        onClose={handleOnClose}
        width="w-[600px]"
        height="h-[600px]"
      >
        <CreateCheckoutSession
          selectedTicket={selectedTicket}
          onClose={() => setShowModal(false)}
          confirmSelectedTicketPurchase={confirmSelectedTicketPurchase}
          uid={auth.uid}
          eventId={
            events.accessedEventData ? events.accessedEventData.event_id : ' '
          }
          username={
            users.loggedInUserData?.username !== undefined
              ? users.loggedInUserData?.username
              : ''
          }
          avatar={
            users.loggedInUserData?.avatar !== undefined
              ? users.loggedInUserData?.avatar
              : ''
          }
        />
      </Modal>
    </>
  )
}
