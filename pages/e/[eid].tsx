// author: marthel + ben
import { doc, getDoc } from '@firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { db } from '../../services/firebase_config'
import { TicketInterface } from '../../shared/interface/common'
import { EventInterface } from '../../shared/interface/common'
import Modal from '../../components/modal'
import { useEvents } from '../../contexts/events'
import { useAuth } from '../../contexts/auth'
import CreateCheckoutSession from './components/createCheckoutSession'
import checkRegisteredAttendee from '../../services/check_registered_attendee'
import SelectAndPurchaseTicket from './components/selectAndPurchaseTicket'
import PurchasedTicketConfirmation from './components/purchasedTicketConfirmation'
import LoadedEventPage from './components/LoadedEventPage'
import LoadingEventPage from './components/LoadingEventPage'

enum EventPageEnum {
  fetchingData,
  fetchedData,
  purchasedTicket
}

export default function Event() {
  const [QRImgUrl, setQRImgUrl] = useState('')
  const [eventPageStatus, setEventPageStatus] = useState<EventPageEnum>(
    EventPageEnum.fetchingData
  )
  const [event, setEvent] = useState<EventInterface | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(
    null
  )
  const [showModal, setShowModal] = useState(false)
  const [isEventCreator, setIsEventCreator] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [ticketListData, setTicketListData] = useState<
    TicketInterface[] | null
  >(null)
  const router = useRouter()
  const events = useEvents()
  const auth = useAuth()
  const [username, setUsername] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')

  const { eid } = router.query

  const EventPage = () => {
    switch (eventPageStatus) {
      case EventPageEnum.fetchedData:
        return (
          <LoadedEventPage
            event={event}
            avatar={avatar}
            isEventCreator={isEventCreator}
          >
            <SelectAndPurchaseTicket
              ticketListData={ticketListData}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              selectedTicket={selectedTicket}
              setSelectedTicket={setSelectedTicket}
              setShowModal={setShowModal}
            />
          </LoadedEventPage>
        )
      case EventPageEnum.purchasedTicket:
        return (
          <LoadedEventPage event={event} avatar={avatar}>
            <PurchasedTicketConfirmation
              selectedTicket={selectedTicket}
              QRImgUrl={QRImgUrl}
            />
          </LoadedEventPage>
        )
      default:
        return <LoadingEventPage />
    }
  }

  const confirmSelectedTicketPurchase = () => {
    setEventPageStatus(EventPageEnum.purchasedTicket)
  }

  const handleOnClose = () => setShowModal(false)
  const fetchData = async () => {
    const docRef = doc(db, 'users', auth.uid)
    const userDoc = await getDoc(docRef)

    setUsername(userDoc.data()?.username)
    setAvatar(userDoc.data()?.avatar)
    const uid_qr_code = userDoc.data()?.qr_code
    setQRImgUrl(uid_qr_code)
    const eventId: any = eid
    const eventRef = doc(db, 'events', eventId)
    const eventDoc = await getDoc(eventRef)
    console.log(eventDoc)
    const eventData = events.newEventData(eventDoc)
    console.log(eventData)
    const fetchedTicketListData: Array<TicketInterface> = []
    var isUserRegistered: boolean
    const isUserOwner = eventData?.uid === userDoc.id
    setIsEventCreator(isUserOwner)
    if (!eventData) return
    setEvent(eventData)
    let ticket: TicketInterface = {
      ticketTitle: 'Free Attendee',
      registeredUsers: eventData.registered_attendees,
      capLimit: eventData.ticket_max,
      tokenId: '',
      price: 0
    }
    fetchedTicketListData.push(ticket)
    setTicketListData(fetchedTicketListData)

    /**
     * this block is good for user who is not the owner of the event.
     */
    //checking if the userIsRegistered
    isUserRegistered = await checkRegisteredAttendee({
      uid: auth.uid,
      eid: eventId
    })

    if (isUserRegistered) {
      setEventPageStatus(EventPageEnum.purchasedTicket)
    } else {
      setEventPageStatus(EventPageEnum.fetchedData)
    }
  }
  useEffect(() => {
    if (eventPageStatus === EventPageEnum.fetchingData && eid) {
      console.log('calling base fech')
      fetchData()
    }
  }, [eid])

  return (
    <>
      <div className="flex w-screen flex-col justify-center bg-secondaryBg px-[20px] pt-[35px] pb-[70px] sm:px-[210px] md:flex-row md:pb-[106px] md:pt-[85px] lg:space-x-[80px] xl:space-x-[291px]">
        {EventPage()}
      </div>
      <Modal
        visible={showModal}
        onClose={handleOnClose}
        width="w-[600px]"
        height="h-[600px]"
      >
        {/* TODO bring the username from the obtained uid data */}
        <CreateCheckoutSession
          selectedTicket={selectedTicket}
          onClose={() => setShowModal(false)}
          confirmSelectedTicketPurchase={confirmSelectedTicketPurchase}
          uid={auth.uid}
          eventId={event ? event.event_id : ' '}
          username={username}
          avatar={avatar}
        />
      </Modal>
    </>
  )
}
