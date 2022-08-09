import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc
} from '@firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TicketButton from '../../components/ticketButton'
import { db } from '../../services/firebase_config'
import { TicketInterface } from '../../shared/interface/common'
import { EventInterface } from '../../shared/interface/common'
import Image from 'next/image'
import Modal from '../../components/modal'

export default function Event() {
  // TODO: fetch event data
  // user id (this will probably be useContext)

  const [fetched, setFetched] = useState(false)
  const [event, setEvent] = useState<EventInterface>()
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface>()
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  // get event id
  const { eid } = router.query

  useEffect(() => {
    const newEventData = (eventDoc: DocumentSnapshot<DocumentData>) => {
      const eventData: EventInterface = {
        address: eventDoc.data()?.address,
        date: eventDoc.data()?.date,
        id: eventDoc.data()?.id,
        eventTitle: eventDoc.data()?.eventTitle,
        orgTitle: eventDoc.data()?.orgTitle,
        imgURL: eventDoc.data()?.imgURL
      }
      return eventData
    }
    const fetchData = async () => {
      //get and set the data from firebase
      //get EventInterface for the correct eventID
      const eventId: any = eid
      console.log('============fetchData::eid============')
      console.log(eid)
      console.log('=================================')
      const docRef = doc(db, 'events', eventId)
      const eventDoc = await getDoc(docRef)
      setEvent(newEventData(eventDoc))
      setFetched(true)
    }
    if (!fetched) {
      fetchData()
    }
  }, [])

  const purchaseSelectedTier = () => {
    console.log(`==========Purchasing selected tier=========`)
    console.log(`ticketTitle: ${selectedTicket?.ticketTitle}`)
    console.log(`registeredUsers: ${selectedTicket?.registeredUsers}`)
    console.log(`tokenId: ${selectedTicket?.tokenId}`)
    console.log(`price: ${selectedTicket?.price}`)
    console.log(`=========`)
  }

  const handleOnClose = () => setShowModal(false)

  return (
    <div className="bg-dashboard flex flex-row space-x-[291px] px-[210px] pt-[85px] pb-[106px]">
      {/* TODO build the event page, after a user clicks the button 'create event' */}
      {fetched ? (
        <>
          <div className="flex h-full flex-col">
            <div
              id="event-details"
              className="mb-[50px] space-y-[20px] text-[14px] font-medium leading-[19px]"
            >
              <h3>
                {event?.eventTitle !== null ? event?.eventTitle : 'Event Title'}
              </h3>
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
              <div>description of the event</div>
            </div>
            <div
              id="ticketbuilder"
              className="flex w-[373px] flex-col items-center space-y-[19px]"
            >
              {TicketListData.map((ticket: TicketInterface, index) => {
                return (
                  <button
                    key={ticket.tokenId}
                    className="w-full"
                    onClick={() => {
                      setSelectedTicket(ticket)
                    }}
                  >
                    <TicketButton ticket={ticket} />
                  </button>
                )
              })}
              <button
                onClick={() => {
                  purchaseSelectedTier()
                }}
              >
                <div
                  onClick={() => {
                    setShowModal(true)
                  }}
                  className="h-[40px]  w-[97px] rounded-xl bg-white px-[20px] py-[10px] text-[14px] font-semibold"
                >
                  Register
                </div>
              </button>
            </div>
          </div>
          <div className="h-full">
            <div className="relative h-[400px] w-[400px] rounded-[67px] bg-slate-400 px-[50px] py-[50px]">
              <Image
                src={event ? event.imgURL : ''}
                layout="fill"
                loading="lazy"
                objectFit="cover"
                className="rounded-[20px]"
              />
            </div>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
      <Modal visible={showModal} onClose={handleOnClose} />
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
