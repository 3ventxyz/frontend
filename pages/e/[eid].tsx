// author: marthel + ben
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TicketInterface, UserInterface } from '../../shared/interface/common'
import { Modal } from '../../components/utils/modal'
import { useEvents } from '../../contexts/events'
import { useAuth } from '../../contexts/auth'
import { useUsers } from '../../contexts/users'
import CreateCheckoutSession from './components/createCheckoutSession'
import LoadedEventPage from './components/LoadedEventPage'
import LoadingEventPage from './components/LoadingEventPage'
import DisplayQRCode from '../u/components/displayQRCode'
import useEventStatus from './hooks/event/useEventStatus'

enum EventPageEnum {
  fetchingData,
  fetchedData,
  purchasedTicket
}

export default function Event() {
  const [
    currStatus,
    { setShowModal, setShowQrCodeModal, setIsEventCreator, setEventPageStatus }
  ] = useEventStatus()

  const router = useRouter()
  const events = useEvents()
  const auth = useAuth()
  const users = useUsers()
  const { eid } = router.query

  const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(
    null
  )
  const confirmSelectedTicketPurchase = () => {
    setEventPageStatus(EventPageEnum.fetchingData)
    fetchData()
  }

  //TODO(2/6/2023, marthel): think a work around about this.
  const handleOnClose = () => {
    setShowModal(false)
    setShowQrCodeModal(false)
  }

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
    setEventPageStatus(EventPageEnum.fetchedData)
  }

  useEffect(() => {
    if (currStatus.eventPageStatus === EventPageEnum.fetchingData && eid) {
      fetchData()
    }
  }, [eid])

  const EventPage = () => {
    switch (currStatus.eventPageStatus) {
      case EventPageEnum.fetchedData:
        return (
          <LoadedEventPage
            setShowModal={setShowModal}
            isEventCreator={currStatus.isEventCreator}
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
        visible={currStatus.showModal}
        onClose={handleOnClose}
        width={'w-[500px]'}
        height={'h-[500px]'}
      >
        <DisplayQRCode />
      </Modal>
    </>
  )
}
