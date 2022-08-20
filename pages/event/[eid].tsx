// author: marthel
import { TbPhotoOff, TbPhoto } from 'react-icons/tb'
import {
  doc,
  getDoc,
  getDocs,
  collection,
  DocumentData
} from '@firebase/firestore'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import TicketButton from '../../components/ticketButton'
import { db } from '../../services/firebase_config'
import { TicketInterface } from '../../shared/interface/common'
import { EventInterface } from '../../shared/interface/common'
import Image from 'next/image'
import Modal from '../../components/modal'
import { useEvents } from '../../context/eventsContext'
import Button from '../../components/button'
import CreateCheckoutSession from './components/createCheckoutSession'

/**
 * parts that will use the loading animation
 *  -- title
 *  -- date and address
 *  --google map image
 *  -- description
 *  -- the event image(the icon will be used for an easy fix)
 *  -- the ticket buttons.
 */

enum EventPageEnum {
  fetchingData,
  fetchedData,
  purchasedTicket
}

export default function Event() {
  // user id (this will probably be useContext)

  const [eventPageStatus, setEventPageStatus] = useState<EventPageEnum>(
    EventPageEnum.fetchingData
  )
  const [event, setEvent] = useState<EventInterface | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(
    null
  )
  const [showModal, setShowModal] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [ticketListData, setTicketListData] = useState<
    TicketInterface[] | null
  >(null)
  const router = useRouter()
  const events = useEvents()

  const { eid } = router.query

  const newTicketOption = (ticketDoc: any) => {
    const ticketData: TicketInterface = {
      ticketTitle: ticketDoc.data().ticket_title,
      registeredUsers: ticketDoc.data().registered_users,
      capLimit: ticketDoc.data().cap_limit,
      tokenId: ticketDoc.data().token_id,
      price: ticketDoc.data().ticket_price
    }
    return ticketData
  }

  const EventPage = () => {
    switch (eventPageStatus) {
      case EventPageEnum.fetchedData:
        return (
          <LoadedEventPage event={event}>
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
          <LoadedEventPage event={event}>
            <PurchasedTicketConfirmation selectedTicket={selectedTicket} />
          </LoadedEventPage>
        )
      default:
        return <LoadingEventPage/>
    }
  }

  const confirmSelectedTicketPurchase = () => {
    setEventPageStatus(EventPageEnum.purchasedTicket)
  }

  const handleOnClose = () => setShowModal(false)

  useEffect(() => {
    const fetchData = async () => {
      const eventId: any = eid
      const docRef = doc(db, 'events', eventId)
      const eventDoc = await getDoc(docRef)
      const eventData = events.newEventData(eventDoc)
      const fetchedTicketListData: Array<TicketInterface> = []
      if (!eventData) return
      setEvent(eventData)

      // fetch ticket data.
      const ticketDocs = await getDocs(collection(db, 'tickets'))

      ticketDocs.forEach((ticketDoc) => {
        fetchedTicketListData.push(newTicketOption(ticketDoc))
      })
      setTicketListData(fetchedTicketListData)
      setEventPageStatus(EventPageEnum.fetchedData)
    }
    if (eventPageStatus === EventPageEnum.fetchingData && eid) {
      fetchData()
    }
  }, [eid])

  return (
    <>
      <div className="flex w-screen flex-col bg-secondaryBg px-[20px] pt-[35px] pb-[70px] sm:px-[210px] md:flex-row md:space-x-[291px] md:pb-[106px] md:pt-[85px]">
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
        />
      </Modal>
    </>
  )
}

function LoadingEventPage() {
  return (
    <>
      <div className="flex h-full flex-col items-center lg:items-start animate-pulse">
        <div
          id="event-details"
          className="mb-[50px] w-auto  space-y-[15px] font-medium leading-[40px] md:space-y-[25px] md:text-[14px]"
        >
          <h3>
            Loading ...
          </h3>
          <div
            id="mobile-event-image"
            className="relative h-[310px] w-[310px] bg-gray-300 text-gray-400 rounded-[67px]  px-[50px] py-[50px] lg:hidden"
          >
            <TbPhoto className="h-[150px] w-[150px]" />
          </div>
          <div className="leading-[25px]">
            date <br />
            address
          </div>

          <div className="relative h-[100px] w-[100px] rounded-[20px] bg-green-200">
            google map image
          </div>
          <div className="leading-[20px]">description of the event</div>
        </div>
        tickets fetching
      </div>
      <div>
        <div className="relative hidden h-[400px] w-[400px] rounded-[67px] text-gray-400 bg-gray-300 px-[50px] py-[50px] lg:block">
           <TbPhoto className="h-[150px] w-[150px]" />
        </div>
      </div>
    </>
  )
}

function LoadedEventPage({
  event,
  children
}: {
  event: EventInterface | null
  children: ReactElement
}): JSX.Element {
  return (
    <>
      <div className="flex h-full flex-col items-center lg:items-start ">
        <div
          id="event-details"
          className="mb-[50px] w-auto  space-y-[15px] font-medium leading-[40px] md:space-y-[25px] md:text-[14px]"
        >
          <h3>
            {event?.eventTitle !== null ? event?.eventTitle : 'Event Title'}
          </h3>
          <div
            id="mobile-event-image"
            className="relative h-[310px] w-[310px] rounded-[67px]  px-[50px] py-[50px] lg:hidden"
          >
            <Image
              src={event ? event.imgURL : ''}
              layout="fill"
              loading="lazy"
              objectFit="cover"
              className="rounded-[67px]"
            />
          </div>
          <div className="leading-[25px]">
            {event?.date} <br />
            {event?.address}
          </div>

          <div className="relative h-[100px] w-[100px] rounded-[20px] bg-green-100">
            <Image
              src={`https://maps.googleapis.com/maps/api/staticmap?center=City+Hall,New+York,NY&zoom=15&size=205x205&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
              layout="fill"
              loading="lazy"
              objectFit="cover"
              className="rounded-[20px]"
            />
          </div>
          <div className="leading-[20px]">description of the event</div>
        </div>
        {children}
      </div>
      <div>
        <div className="relative hidden h-[400px] w-[400px] rounded-[67px] bg-slate-400 px-[50px] py-[50px] lg:block">
          <Image
            src={event ? event.imgURL : ''}
            layout="fill"
            loading="lazy"
            objectFit="cover"
            className="rounded-[67px]"
          />
        </div>
      </div>
    </>
  )
}

function SelectAndPurchaseTicket({
  ticketListData,
  selectedTicket,
  setSelectedTicket,
  selectedIndex,
  setSelectedIndex,
  setShowModal
}: {
  ticketListData: Array<TicketInterface> | null
  selectedIndex: number | null
  setSelectedIndex: (index: number) => void
  selectedTicket: TicketInterface | null
  setSelectedTicket: (ticket: TicketInterface) => void
  setShowModal: (toggle: boolean) => void
}) {
  return (
    <div
      id="ticketbuilder"
      className="flex w-[320px] flex-col items-center space-y-[19px] md:w-[373px]"
    >
      {ticketListData?.map((ticket: TicketInterface, index) => {
        return (
          <button
            key={index.toString()}
            className="w-full"
            onClick={() => {
              setSelectedTicket(ticket)
              setSelectedIndex(index)
            }}
          >
            <TicketButton
              key={index.toString()}
              selected={selectedIndex === index}
              ticket={ticket}
            />
          </button>
        )
      })}
      <Button
        text={'Register'}
        onClick={() => {
          setShowModal(true)
        }}
        active={selectedTicket !== null}
      />
    </div>
  )
}

function PurchasedTicketConfirmation({
  selectedTicket
}: {
  selectedTicket: TicketInterface | null
}) {
  return (
    <div className="flex flex-col space-y-[26px]">
      <TicketButton selected={true} ticket={selectedTicket} />
      <div className="space-y-[13px]">
        <div className="text-[14px] font-bold">
          add your ticket to your apple wallet
        </div>
        <div className="relative h-[34px] w-[114px]">
          apple wallet
          <Image
            src={'/assets/featureIcons/apple-wallet.svg'}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="space-y-[13px]">
        <div className="text-[14px] font-bold">
          Present this QR code to enter your event
        </div>
        <div className="relative h-[242px] w-[242px]">
          <Image src={'/assets/qr-code.png'} layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  )
}
