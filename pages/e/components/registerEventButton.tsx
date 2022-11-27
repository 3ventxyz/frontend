import { useEffect, useState } from 'react'
import Button from '../../../components/button'
import { useUsers } from '../../../contexts/users'
import { UserInterface } from '../../../shared/interface/common'
import { IoQrCode } from 'react-icons/io5'

enum RegisterComponentEnum {
  registerEvent,
  confirmuserInfo,
  registeringUser,
  userRegistered
}

export default function RegisterEventButton({
  setShowModal
}: {
  setShowModal: (toggle: boolean) => void
}) {
  const [registerPage, setRegisterPage] = useState<RegisterComponentEnum>(
    RegisterComponentEnum.registerEvent
  )
  const [styleComponent, setStyleComponent] = useState('h-[85px] bg-[#DE6767]')
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
   * things to do here!!
   * pass the loggedInUser whole info, that is stored in the usersContext or authContext.
   * from that the data will be passed here directly and used for quickly registering the user right away.
   */

  const componentPage = () => {
    switch (registerPage) {
      case RegisterComponentEnum.confirmuserInfo:
        // show the confirm info registration page.

        return (
          <YellowComponent
            loggedInUserData={users.loggedInUserData}
            setRegisterPage={() => {
              setStyleComponent('h-[150px] bg-white')
              setRegisterPage(RegisterComponentEnum.userRegistered)
            }}
          />
        )
      case RegisterComponentEnum.userRegistered:
        // show that it has been a success in registering the page.
        return GreenComponent()
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
      className={`
      ${styleComponent} flex  items-center justify-center rounded-2xl shadow-md  transition-all  `}
    >
      {componentPage()}
    </div>
  )
}

function GreenComponent() {
  return (
    <div className="w-full space-y-2  bg-white px-[8px]">
      <div className="flex items-center space-x-1">
        <IoQrCode className="h-[60px] w-[60px]" />
        <div>
          <div className="text-[24px] font-bold ">Ticket Confirmation:</div>
          <div className="font-semibold">Date of registration:</div>
          <div>*Wed, Nov 16, 2022, 7:00 PM*</div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          text={'view QR'}
          active={true}
          onClick={() => {
            console.log('viewing qr')
          }}
        />
        <Button
          text={'registered events'}
          active={true}
          onClick={() => {
            console.log('registered events')
          }}
        />
      </div>
    </div>
  )
}

function YellowComponent({
  loggedInUserData,
  setRegisterPage
}: {
  loggedInUserData: UserInterface | null
  setRegisterPage: () => void
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
          onClick={setRegisterPage}
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
      <div className="text-[20px] font-bold text-white hover:cursor-pointer  ">
        Register Event
      </div>
    </button>
  )
}
