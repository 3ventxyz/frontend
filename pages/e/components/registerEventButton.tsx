import { useEffect, useState } from 'react'
import { Button } from '../../../components/buttons/button'
import { useUsers } from '../../../contexts/users'
import { EventInterface, UserInterface } from '../../../shared/interface/common'
import { IoQrCode } from 'react-icons/io5'
import { useEvents } from '../../../contexts/events'
import checkRegisteredAttendee from '../../../services/fetch_registered_attendee_data'
import { useRouter } from 'next/router'
import useEventStatus from '../hooks/event/useEventStatus'
import useEventValues from '../hooks/event/useEventValues'

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
  setShowModal
}: {
  setShowModal: (toggle: boolean) => void
}) {
  const [styleComponent, setStyleComponent] = useState('h-[85px] bg-[#DE6767]')
  const users = useUsers()
  const events = useEvents()
  const [currStatus, { setRegisterPage, setIsDatabaseChecked }] =
    useEventStatus()
  const [currValues, { setDateOfRegistration }] = useEventValues()

  useEffect(() => {
    /**
     * fetch the registered user data to see if the user is already
     * registered or not.
     */
    const fetchData = async () => {
      //check database, if the user is registered
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
        setDateOfRegistration({
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
      setIsDatabaseChecked(true)
    }
    if (!currStatus.isDatabaseChecked) {
      fetchData()
    }
  }, [])

  const componentPage = () => {
    switch (currStatus.registerPage) {
      case RegisterComponentEnum.confirmuserInfo:
        // show the confirm info registration page.
        return (
          <YellowComponent
            loggedInUserData={users.loggedInUserData}
            eventData={events.accessedEventData}
            onClick={() => {
              setStyleComponent('h-[150px] bg-white')
              setRegisterPage(RegisterComponentEnum.userRegistered)
            }}
            setDateOfRegistration={setDateOfRegistration}
          />
        )
      case RegisterComponentEnum.userRegistered:
        // show that it has been a success in registering the page.
        return (
          <GreenComponent
            registeredUserData={currValues.dateOfRegistration}
            setShowModal={setShowModal}
          />
        )
      default:
        return (
          <RedButton
            onClick={() => {
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
  registeredUserData,
  setShowModal
}: {
  registeredUserData: any
  setShowModal: (toggle: boolean) => void
}) {
  const [delay, setDelay] = useState(true)
  const router = useRouter()

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
            setShowModal(true)
          }}
        />
        <Button
          text={'registered events'}
          active={true}
          onClick={() => {
            console.log('registered events')
            router.push('/u')
          }}
        />
      </div>
    </div>
  )
}

function YellowComponent({
  loggedInUserData,
  eventData,
  onClick,
  setDateOfRegistration
}: {
  loggedInUserData: UserInterface | null
  eventData: EventInterface | null
  onClick: () => void
  setDateOfRegistration: (date_of_registration: any) => void
}) {
  const [currStatus, { setRequestingRegistration }] = useEventStatus()
  const [currValues, { registerNewAttendee }] = useEventValues()
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
    if (loggedInUserData && eventData)
      await registerNewAttendee(loggedInUserData, eventData)
    setDateOfRegistration({ date_of_registration: new Date() })
    onClick()
  }
  return currStatus.requestingRegistration ? (
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
            setRequestingRegistration(true)
            registerUser()
          }}
        />
      </div>
    </div>
  )
}

function RedButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-full w-full transition-shadow hover:shadow-xl"
    >
      <div className="text-[20px] font-bold text-white hover:cursor-pointer">
        Register Event
      </div>
    </button>
  )
}
