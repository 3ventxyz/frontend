import { useEffect, useState } from 'react'
import Button from '../../../components/button'
import { useUsers } from '../../../contexts/users'
import { EventInterface, UserInterface } from '../../../shared/interface/common'
import { IoQrCode } from 'react-icons/io5'
import { useEvents } from '../../../contexts/events'
import registerAttendeeToEvent from '../../../services/register_attendee_to_event'
import checkRegisteredAttendee from '../../../services/fetch_registered_attendee_data'
import { useRouter } from 'next/router'

enum RegisterComponentEnum {
  registerEvent,
  confirmuserInfo,
  registeringUser,
  userRegistered
}

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay))
}

export default function RegisterEventButton({
  setShowRegisterModal,
  setShowQrCodeModal,
  setShowModal
}: {
  setShowRegisterModal: (toggle: boolean) => void
  setShowQrCodeModal: (toggle: boolean) => void
  setShowModal: (toggle: boolean) => void
}) {
  const [registerPage, setRegisterPage] = useState<RegisterComponentEnum>(
    RegisterComponentEnum.registerEvent
  )
  const [styleComponent, setStyleComponent] = useState('h-[85px] bg-[#DE6767]')
  const users = useUsers()
  const events = useEvents()
  const [registeredUserData, setRegisteredUserData] = useState<any>()
  const [checkedDatabase, setCheckedDatabase] = useState(false)
  useEffect(() => {
    /**
     * TODO: fetch the registered user data to see if the user is already
     * registered or not.
     */
    const fetchData = async () => {
      const registeredAttendeeData = await checkRegisteredAttendee({
        uid:
          users.loggedInUserData?.uid === undefined
            ? ''
            : users.loggedInUserData?.uid,
        eid:
          events.accessedEventData?.event_id === undefined
            ? ''
            : events.accessedEventData?.event_id
      })
      if (registeredAttendeeData.exists()) {
        setRegisteredUserData({
          date_of_registration: registeredAttendeeData
            .data()
            .date_of_registration.toDate()
        })
        setRegisterPage(RegisterComponentEnum.userRegistered)
        setStyleComponent('h-[150px] bg-white')
      } else {
        setRegisterPage(RegisterComponentEnum.registerEvent)
        setStyleComponent('h-[85px] bg-[#DE6767]')
      }
      setCheckedDatabase(true)
    }
    if (!checkedDatabase) {
      fetchData()
    }
  }, [])
  /**

  * quick approach first.
   * when the user clicks this button, this component will update its layout to show the entered info,
   * if the info is correct to the user's perspective, then they will click accept,
   *  and this component will update its layout and  will show the ticket info. with a text button saying "check your registered eevents"
   *
   * otherwise, if the user says that the info needs to be updated, show the modal component with the form for updating the info.
   * and after registering, it will be redirected to a page of upcoming registered events page.
   *
   *
   * DONE!!
   * things to do here!!
   * pass the loggedInUser whole info, that is stored in the usersContext or authContext.
   * from that the data will be passed here directly and used for quickly registering the user right away.

  **TODO (11/27) for tomorrow 11/28.
  ** -- set the modal components to this button component, so the qr code can be shown after registering or when the user needs
  to update its address quickly, before registering to the event. (today)
  ** -- implement the responsive design of this updated page. (tomorrow friday!!!)
  */

  const componentPage = () => {
    switch (registerPage) {
      case RegisterComponentEnum.confirmuserInfo:
        // show the confirm info registration page.
        return (
          <YellowComponent
            loggedInUserData={users.loggedInUserData}
            eventData={events.accessedEventData}
            setRegisterPage={() => {
              setStyleComponent('h-[150px] bg-white')
              setRegisterPage(RegisterComponentEnum.userRegistered)
            }}
            setRegisteredData={setRegisteredUserData}
          />
        )
      case RegisterComponentEnum.userRegistered:
        // show that it has been a success in registering the page.
        return (
          <GreenComponent
            nextPage={() => {}}
            registeredUserData={registeredUserData}
            setShowModal={setShowModal}
            setShowQrCodeModal={setShowQrCodeModal}
            setShowRegisterModal={setShowRegisterModal}
            qrCodeModal={() => {
              setStyleComponent('h-[85px] bg-[#DE6767]')
              setRegisterPage(RegisterComponentEnum.registerEvent)
            }}
          />
        )
      default:
        return (
          <RedButton
            setRegisterPage={() => {
              setStyleComponent('h-[210px] bg-[#FFF6C7]')
              setRegisterPage(RegisterComponentEnum.confirmuserInfo)
            }}
          />
        )
    }
  }

  return (
    <div
      id="register-event-button"
      className={`${styleComponent} flex items-center justify-center rounded-2xl shadow-md transition-all`}
    >
      {componentPage()}
    </div>
  )
}

function GreenComponent({
  qrCodeModal,
  nextPage,
  registeredUserData,
  setShowModal,
  setShowRegisterModal,
  setShowQrCodeModal
}: {
  qrCodeModal: () => void
  nextPage: () => void
  registeredUserData: any
  setShowModal: (toggle: boolean) => void
  setShowRegisterModal: (toggle: boolean) => void
  setShowQrCodeModal: (toggle: boolean) => void
}) {
  const [delay, setDelay] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const delayAnimation = async () => {
      await timeout(350)
      setDelay(false)
    }

    if (delay) {
      delayAnimation()
    }
  }, [])

  return (
    <div
      className={`${
        delay ? ' text-opacity-0' : 'text-opacity-100'
      }  w-full space-y-2 bg-white px-[8px]  text-black transition-all`}
    >
      <div className="flex items-center space-x-1">
        <IoQrCode className="h-[60px] w-[60px]" />
        <div>
          <div className="text-[24px] font-bold ">Ticket Confirmation:</div>
          <div className="font-semibold">Date of registration:</div>
          <div>
            {registeredUserData.date_of_registration.toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) +
              ', ' +
              registeredUserData.date_of_registration.toLocaleTimeString(
                'en-US',
                {
                  hour: '2-digit',
                  minute: '2-digit'
                }
              )}
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          text={'view QR'}
          active={true}
          onClick={() => {
            console.log('viewing qr')
            setShowQrCodeModal(true)
            setShowModal(true)
          }}
        />
        <Button
          text={'registered events'}
          active={true}
          onClick={() => {
            console.log('registered events')
            router.push('/u');
            // setShowRegisterModal(true)
            // setShowModal(true)
          }}
        />
      </div>
    </div>
  )
}

function YellowComponent({
  loggedInUserData,
  eventData,
  setRegisterPage,
  setRegisteredData
}: {
  loggedInUserData: UserInterface | null
  eventData: EventInterface | null
  setRegisterPage: () => void
  setRegisteredData: (date_of_registration: any) => void
}) {
  const [request, setRequest] = useState(false)
  const [delay, setDelay] = useState(true)
  useEffect(() => {
    const delayAnimation = async () => {
      await timeout(350)
      setDelay(false)
    }
    if (delay) {
      delayAnimation()
    }
  }, [])

  const registerUser = async () => {
    await registerAttendeeToEvent(
      {
        address:
          loggedInUserData?.address === undefined
            ? ''
            : loggedInUserData?.address,
        phone_number: '+111 222 33333',
        uid: loggedInUserData?.uid === undefined ? '' : loggedInUserData?.uid,
        date_of_registration: new Date(),
        username:
          loggedInUserData?.username === undefined
            ? ''
            : loggedInUserData?.username,
        avatar:
          loggedInUserData?.avatar === undefined ? '' : loggedInUserData?.avatar
      },
      eventData?.event_id === undefined ? '' : eventData?.event_id
    )
    setRegisteredData({ date_of_registration: new Date() })

    setRegisterPage()
  }
  return request ? (
    <div className="animate-pulse text-[24px] font-bold">Loading...</div>
  ) : (
    <div
      className={`${
        delay
          ? 'bg-opacity-0 text-opacity-0'
          : 'bg-opacity-100 text-opacity-100'
      }  text-black transition-all`}
    >
      <div className={` text-[24px] font-bold transition-all`}>
        {'Please Confirm your info:'}
      </div>
      <div className="my-[8px] flex flex-col items-center space-y-[8px]">
        <div className="w-full">
          <div className="font-semibold">Username:</div>
          <div
            className={`${
              delay ? 'shadow-[0px] bg-opacity-0' : 'bg-opacity-100 shadow-md'
            } rounded-md bg-white `}
          >
            {loggedInUserData?.username}
          </div>
        </div>
        <div className="w-full">
          <div className="font-semibold ">Address:</div>
          <div
            className={`${
              delay ? 'shadow-[0px] bg-opacity-0' : 'bg-opacity-100 shadow-md'
            } rounded-md bg-white `}
          >
            {loggedInUserData?.address}
          </div>
        </div>
        <Button
          text={delay ? 'Loading...' : 'confirm registration'}
          active={!delay}
          onClick={() => {
            setRequest(true)
            registerUser()
          }}
        />
      </div>
    </div>
  )
}

function RedButton({ setRegisterPage }: { setRegisterPage: () => void }) {
  return (
    <button
      onClick={setRegisterPage}
      className="h-full w-full transition-shadow hover:shadow-xl"
    >
      <div className="text-[20px] font-bold text-white hover:cursor-pointer">
        Register Event
      </div>
    </button>
  )
}
