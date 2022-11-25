import { TIMEOUT } from 'dns'
import { off } from 'process'
import { useEffect, useState } from 'react'
import Button from '../../../components/button'
import { useUsers } from '../../../contexts/users'
import { UserInterface } from '../../../shared/interface/common'

enum RegisterComponentEnum {
  registerEvent,
  ConfirmRegistration,
  UserRegistered
}

export default function RegisterEventButton({
  setShowModal
}: {
  setShowModal: (toggle: boolean) => void
}) {
  const [startRegisterForm, setStartRegisterForm] = useState(false)
  const users = useUsers()

  useEffect(() => {}, [])
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
   *
   *
   * things to do here!!
   * pass the loggedInUser whole info, that is stored in the usersContext or authContext.
   * from that the data will be passed here directly and used for quickly registering the user right away.
   */
  return (
    <div
      id="register-event-button"
      className={`${
        startRegisterForm ? 'h-[210px] bg-[#FFF6C7]' : 'h-[85px] bg-[#DE6767]'
      } flex  items-center justify-center rounded-2xl shadow-md  transition-all  `}
    >
      {startRegisterForm ? (
        <YellowComponent
          loggedInUserData={users.loggedInUserData}
          setStartRegisterForm={() => {
            setStartRegisterForm(false)
          }}
        />
      ) : (
        <RedButton
          setStartRegisterForm={() => {
            setStartRegisterForm(true)
          }}
        />
      )}
    </div>
  )
}

function GreenComponent() {
  return (
    <div className="bg-white">
      <div>Ticket Confirmation</div>
      <div>Date of registration</div>
      <div>*fetched date from ticket id*</div>
      <div>2 buttons come here!</div>
    </div>
  )
}

function YellowComponent({
  loggedInUserData,
  setStartRegisterForm
}: {
  loggedInUserData: UserInterface | null
  setStartRegisterForm: () => void
}) {
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay))
  }

  const [delay, setDelay] = useState(true)
  useEffect(() => {
    const delayAnimation = async () => {
      await timeout(250)
      setDelay(false)
    }
    if (delay) {
      delayAnimation()
    }
  }, [])
  return (
    <div className={`${delay ? 'hidden' : 'block'} transition-all`}>
      <div className="text-[24px] font-bold transition-all">
        {delay ? '' : 'Please Confirm your info:'}
      </div>
      <div className="my-[8px] flex flex-col items-center space-y-[8px]">
        <div className="w-full">
          <div className="font-semibold">Username:</div>
          <div className=" rounded-md bg-white shadow-md">
            {loggedInUserData?.username}
          </div>
        </div>
        <div className="w-full">
          <div className="font-semibold shadow-md">Address:</div>
          <div className=" rounded-md bg-white">
            {loggedInUserData?.address}
          </div>
        </div>
        <Button
          text="confirm registration"
          active={true}
          onClick={setStartRegisterForm}
        />
      </div>
    </div>
  )
}

function RedButton({
  setStartRegisterForm
}: {
  setStartRegisterForm: () => void
}) {
  return (
    <button
      onClick={setStartRegisterForm}
      className="h-full w-full transition-shadow hover:shadow-xl"
    >
      <div className="text-[20px] font-bold text-white hover:cursor-pointer  ">
        Register Event
      </div>
    </button>
  )
}
