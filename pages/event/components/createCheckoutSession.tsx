// author: marthel
import { useState } from 'react'
import Button from '../../../components/button'
import Spinner from '../../../components/spinner'
import TicketButton from '../../../components/ticketButton'
import { TicketInterface } from '../../../shared/interface/common'
import TextInput from '../../../components/textInput'

export default function CreateCheckoutSession({
  selectedTicket,
  onClose,
  confirmSelectedTicketPurchase
}: {
  selectedTicket: TicketInterface | null
  onClose: () => void
  confirmSelectedTicketPurchase: () => void
}) {
  const [checkoutPage, setcheckoutPage] = useState(0)
  const nextCheckoutPage = () => {
    setcheckoutPage(checkoutPage + 1)
  }

  const checkoutSessionPage = () => {
    switch (checkoutPage) {
      case 1:
        return <RegisterUserForm onClick={nextCheckoutPage} />
      case 2:
        return <DisplayIsLoading onClick={nextCheckoutPage} />
      case 3:
        return <DisplayStatus onClick={nextCheckoutPage} />
      case 4:
        confirmSelectedTicketPurchase()
        onClose()
      default:
        return <SelectPaymentOption onClick={nextCheckoutPage} />
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-around py-[34px]">
      <h3 className="mb-[26px] text-[32px]">Your Order</h3>
      <TicketButton selected={true} ticket={selectedTicket} />
      <div className="flex h-full items-center justify-center">
        {checkoutSessionPage()}
      </div>
    </div>
  )
}

function SelectPaymentOption({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="grow"></div>
      <Button text={'Register user with ETH'} onClick={onClick} active={true} />
    </div>
  )
}

function RegisterUserForm({ onClick }: { onClick: () => void }) {
  const [variable, setVariable] = useState('')
  return (
    <div className="flex h-full w-[466px] flex-col items-center pt-[18px]">
      <form action="submit" className=" w-full space-y-[10px]">
        <div className="flex space-x-[10px]">
          <TextInput
            id={'first-name'}
            placeholder={'Joe'}
            labelText={'First name'}
            width={'w-[228px]'}
            setValue={setVariable}
          />

          <TextInput
            id={'last-name'}
            placeholder={'Doe'}
            labelText={'Last name'}
            width={'w-[228px]'}
            setValue={setVariable}
          />
        </div>
        <TextInput
          id={'address'}
          placeholder={'street address ...'}
          labelText={'Street address'}
          setValue={setVariable}
          width={'w-auto'}
        />
        <div className="flex space-x-[10px]">
          <TextInput
            id={'city'}
            placeholder={'Seattle'}
            labelText={'City'}
            width={'w-[228px]'}
            setValue={setVariable}
          />
          <TextInput
            id={'state'}
            placeholder={'CA'}
            labelText={'State '}
            width={'w-[228px]'}
            setValue={setVariable}
          />
        </div>
        <div className="flex space-x-[10px]">
          <TextInput
            id={'zip-code'}
            placeholder={'zip code'}
            labelText={'Zip code'}
            width={'w-[228px]'}
            setValue={setVariable}
          />
          <TextInput
            id={'country'}
            placeholder={'United States'}
            labelText={'Country '}
            width={'w-[228px]'}
            setValue={setVariable}
          />
        </div>
      </form>
      <div className="grow"></div>
      <div>
        <Button text={'Submit Order'} onClick={onClick} active={true} />
      </div>
    </div>
  )
}

function DisplayIsLoading({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="grow"></div>
      <Spinner />
      <div className="grow"></div>
      <div>
        <Button text={'Pending'} onClick={onClick} active={true} />
      </div>
    </div>
  )
}

function DisplayStatus({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex h-full flex-col items-center space-y-[20px]">
      <div className="grow"></div>
      <div className="flex  flex-col items-center justify-center space-y-[20px]">
        <h3 className="text-[32px] ">Success!</h3>
        <div className="text-[14px] font-normal">
          an email confirmation was sent to your inbox
        </div>
      </div>
      <div className="grow"></div>
      <div>
        <Button text={'Close window'} onClick={onClick} active={true} />
      </div>
    </div>
  )
}
