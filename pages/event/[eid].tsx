// author: marthel
import { doc, getDoc } from '@firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TicketButton from '../../components/ticketButton'
import { db } from '../../services/firebase_config'
import { TicketInterface } from '../../shared/interface/common'
import { EventInterface } from '../../shared/interface/common'
import Image from 'next/image'
import Modal from '../../components/modal'
import { useEvents } from '../../context/eventsContext'
import Button from '../../components/button'
import CreateCheckoutSession from './components/createCheckoutSession'

export default function Event() {
  // user id (this will probably be useContext)

  const [fetched, setFetched] = useState(false)
  const [event, setEvent] = useState<EventInterface>()
  const [selectedTicket, setSelectedTicket] = useState<
    TicketInterface | undefined
  >()
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const [showModal, setShowModal] = useState(false)
  const [ticketPurchased, setTicketPurchased] = useState(false)
  const router = useRouter()
  const events = useEvents()

  const { eid } = router.query

  useEffect(() => {
    const fetchData = async () => {
      const eventId: any = eid
      const docRef = doc(db, 'events', eventId)
      const eventDoc = await getDoc(docRef)
      const eventData = events.newEventData(eventDoc)
      if (!eventData) return
      setEvent(eventData)
      setFetched(true)
    }
    if (!fetched && eid) {
      fetchData()
    }
  }, [eid])

  const confirmSelectedTicketPurchase = () => {
    setTicketPurchased(true)
  }

  const handleOnClose = () => setShowModal(false)

  return (
    <>
      <div className="flex flex-col bg-secondaryBg px-[20px] pt-[35px] pb-[106px] md:flex-row md:space-x-[291px] md:px-[210px] md:pt-[85px]">
        {fetched ? (
          <>
            <div className="flex h-full flex-col items-center  md:items-start ">
              <div
                id="event-details"
                className=" w-auto space-y-[15px]   font-medium leading-[35px]  md:mb-[50px] md:space-y-[25px] md:text-[14px] md:leading-[19px]"
              >
                <h3>
                  {event?.eventTitle !== null
                    ? event?.eventTitle
                    : 'Event Title'}
                </h3>
                <div
                  id="mobile-event-image"
                  className="relative h-[310px] w-[310px] rounded-[67px]  px-[50px] py-[50px] md:hidden"
                >
                  <Image
                    src={event ? event.imgURL : ''}
                    layout="fill"
                    loading="lazy"
                    objectFit="cover"
                    className="rounded-[67px]"
                  />
                </div>
                <div>
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
              {!ticketPurchased ? (
                <SelectAndPurchaseTicket
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  selectedTicket={selectedTicket}
                  setSelectedTicket={setSelectedTicket}
                  setShowModal={setShowModal}
                />
              ) : (
                <PurchasedTicketConfirmation selectedTicket={selectedTicket} />
              )}
            </div>
            <div>
              <div className="relative hidden h-[400px] w-[400px] rounded-[67px] bg-slate-400 px-[50px] py-[50px] md:block">
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
        ) : (
          <div>Loading</div>
        )}
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

function SelectAndPurchaseTicket({
  selectedIndex,
  setSelectedIndex,
  selectedTicket,
  setSelectedTicket,
  setShowModal
}: {
  selectedIndex: number | undefined
  setSelectedIndex: (index: number) => void
  selectedTicket: TicketInterface | undefined
  setSelectedTicket: (ticket: TicketInterface) => void
  setShowModal: (toggle: boolean) => void
}) {
  return (
    <div
      id="ticketbuilder"
      className=" flex w-[320px] flex-col items-center space-y-[19px] md:w-[373px]"
    >
      {TicketListData.map((ticket: TicketInterface, index) => {
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
        active={selectedTicket !== undefined}
      />
    </div>
  )
}

function PurchasedTicketConfirmation({
  selectedTicket
}: {
  selectedTicket: TicketInterface | undefined
}) {
  return (
    <div className="flex flex-col space-y-[26px]">
      <TicketButton
        selected={true}
        ticket={
          selectedTicket || {
            ticketTitle: '',
            registeredUsers: '',
            tokenId: '',
            price: ''
          }
        }
      />
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

const TicketListData = [
  {
    ticketTitle: 'Ticket 1',
    registeredUsers: '0/10000000000',
    tokenId: '#213',
    price: '$ 0.25'
  },
  {
    ticketTitle: 'Ticket 2',
    registeredUsers: '55/1000',
    tokenId: '#213',
    price: '$ 11.00'
  },
  {
    ticketTitle: 'Ticket 3',
    registeredUsers: '2/10',
    tokenId: '#213',
    price: '$ 30.00'
  },
  {
    ticketTitle: 'Ticket 4',
    registeredUsers: '3/3',
    tokenId: '#213',
    price: '$ 2,000.00'
  }
]
