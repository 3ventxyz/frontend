// author: marthel
import { useState, FormEvent } from 'react'
import { Button } from '../../../components/buttons/button'
import { Spinner } from '../../../components/utils/spinner'
import { TicketButton } from '../../../components/buttons/ticketButton'
import { TicketInterface } from '../../../shared/interface/common'
import {TicketRegTextInput} from '../../../components/inputs/ticketRegTextInput'
import registerAttendeeToEvent from '../../../services/register_attendee_to_event'

enum CheckoutPageEnum {
  confirmTicketPage,
  formPage,
  loadingPage,
  confirmationPage,
  exitModalComponent
}
export default function CreateCheckoutSession({
  selectedTicket,
  uid,
  username,
  avatar,
  eventId,
  onClose,
  confirmSelectedTicketPurchase
}: {
  selectedTicket: TicketInterface | null
  avatar: string
  onClose: () => void
  uid: string
  eventId: string
  username: string
  confirmSelectedTicketPurchase: () => void
}) {
  const [checkoutPage, setcheckoutPage] = useState<CheckoutPageEnum>()

  const registeringAttendeeForm = async (event: any) => {
    event.preventDefault()
    setcheckoutPage(CheckoutPageEnum.loadingPage)
    await registerAttendeeToEvent(
      {
        address: event.target.address.value,
        phone_number: event.target.phone_number.value,
        uid: uid,
        date_of_registration: new Date(),
        username: username,
        avatar: avatar
      },
      eventId
    )
    setcheckoutPage(CheckoutPageEnum.confirmationPage)
  }

  const checkoutSessionPage = () => {
    switch (checkoutPage) {
      case CheckoutPageEnum.formPage:
        return <RegisterUserForm onSubmit={registeringAttendeeForm} />
      case CheckoutPageEnum.loadingPage:
        return <DisplayIsLoading />
      case CheckoutPageEnum.confirmationPage:
        return (
          <DisplayStatus
            onClick={() => {
              setcheckoutPage(CheckoutPageEnum.exitModalComponent)
            }}
          />
        )
      case CheckoutPageEnum.exitModalComponent:
        confirmSelectedTicketPurchase()
        onClose()
      default:
        return (
          <SelectPaymentOption
            onClick={() => {
              setcheckoutPage(CheckoutPageEnum.formPage)
            }}
          />
        )
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-around py-[34px]">
      <h3 className="mb-[26px] text-[32px]">Your Order</h3>
      <TicketButton
        selected={true}
        ticket={selectedTicket}
        isDisabled={false}
      />
      <div className="flex h-full items-center justify-center">
        {checkoutSessionPage()}
      </div>
    </div>
  )
}

function SelectPaymentOption({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex h-full flex-col items-center">
      <div className="grow"></div>
      <div>
        {
          "This event is free to register, you don't need to add any payment info."
        }
      </div>
      <div className="grow"></div>
      <Button text={'Continue'} onClick={onClick} active={true} />
    </div>
  )
}

function RegisterUserForm({ onSubmit }: { onSubmit: (event: any) => void }) {
  return (
    <div className="flex h-full w-[466px] flex-col items-center pt-[18px]">
      <form
        action="submit"
        onSubmit={onSubmit}
        className=" w-full space-y-[10px]"
      >
        <div className="flex space-x-[10px]">
          <TicketRegTextInput
            id={'first_name'}
            placeholder={'Joe'}
            inputName={'first-name'}
            htmlFor={'first_name'}
            labelTitle={'First name'}
            width={'w-[228px]'}
          />

          <TicketRegTextInput
            id={'last_name'}
            placeholder={'Doe'}
            inputName={'last-name'}
            htmlFor={'last_name'}
            labelTitle={'Last name'}
            width={'w-[228px]'}
          />
        </div>
        <TicketRegTextInput
          id={'address'}
          placeholder={'street address ...'}
          inputName={'address'}
          htmlFor={'address'}
          labelTitle={'Street address'}
        />
        <div className="flex space-x-[10px]">
          <TicketRegTextInput
            id={'city'}
            placeholder={'Seattle'}
            inputName={'city'}
            htmlFor={'city'}
            labelTitle={'City'}
            width={'w-[228px]'}
          />
          <TicketRegTextInput
            id={'state'}
            placeholder={'CA'}
            inputName={'state'}
            htmlFor={'state'}
            labelTitle={'State '}
            width={'w-[228px]'}
          />
        </div>
        <div className="flex space-x-[10px]">
          <TicketRegTextInput
            id={'zip_code'}
            placeholder={'zip code'}
            inputName={'zip-code'}
            htmlFor={'zip_code'}
            labelTitle={'Zip code'}
            width={'w-[228px]'}
          />
          <TicketRegTextInput
            id={'phone_number'}
            placeholder={'(323) 000 0000'}
            inputName={'phone_number'}
            htmlFor={'phone_number'}
            labelTitle={'Phone number '}
            width={'w-[228px]'}
          />
        </div>
        <div className="grow"></div>
        <div>
          <Button text={'Register new attendee'} type="submit" active={true} />
        </div>
      </form>
    </div>
  )
}

function DisplayIsLoading() {
  return (
    <div className="flex h-full flex-col">
      <div className="grow"></div>
      <Spinner />
      <div className="grow"></div>
      <div>
        <Button text={'Please wait ...'} onClick={() => {}} active={false} />
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
