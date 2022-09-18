// author: marthel
import { useState, FormEvent } from 'react'
import Button from '../../../components/button'
import Spinner from '../../../components/spinner'
import TicketButton from '../../../components/ticketButton'
import { TicketInterface } from '../../../shared/interface/common'
import TicketRegTextInput from '../../../components/ticketRegTextInput'

enum CheckoutPageEnum {
  confirmTicketPage,
  formPage,
  loadingPage,
  confirmationPage,
  exitModalComponent
}
export default function CreateCheckoutSession({
  selectedTicket,
  onClose,
  confirmSelectedTicketPurchase
}: {
  selectedTicket: TicketInterface | null
  onClose: () => void
  confirmSelectedTicketPurchase: () => void
}) {
  const [checkoutPage, setcheckoutPage] = useState<CheckoutPageEnum>()

  const registeringAttendeeForm = async (event: any) => {
    event.preventDefault()
    setcheckoutPage(CheckoutPageEnum.loadingPage)
    console.log('registeringAttendeeForm submitted data===================')
    console.log("first_name: ",event.target.first_name.value)
    console.log("last_name: ",event.target.last_name.value)
    console.log("address: ",event.target.address.value)
    console.log("city: ",event.target.city.value)
    console.log("state: ",event.target.state.value)
    console.log("zip_code: ",event.target.zip_code.value)
    console.log("country: ",event.target.country.value)
    console.log('===================')
    


    //at the bottom 
  }

  const checkoutSessionPage = () => {
    switch (checkoutPage) {
      case CheckoutPageEnum.formPage:
        // in this case
        return (
          <RegisterUserForm
            onSubmit={registeringAttendeeForm}
            onClick={() => {
              setcheckoutPage(CheckoutPageEnum.loadingPage)
            }}
          />
        )
      case CheckoutPageEnum.loadingPage:
        return (
          <DisplayIsLoading
            onClick={() => {
              setcheckoutPage(CheckoutPageEnum.confirmationPage)
            }}
          />
        )
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
      <TicketButton selected={true} ticket={selectedTicket} />
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
        This event is free to register, you don't need to add any payment info.
      </div>
      <div className="grow"></div>
      <Button text={'Continue'} onClick={onClick} active={true} />
    </div>
  )
}

function RegisterUserForm({
  onClick,
  onSubmit
}: {
  onClick: () => void
  onSubmit: (event: any) => void
}) {
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
            id={'country'}
            placeholder={'United States'}
            inputName={'country'}
            htmlFor={'country'}
            labelTitle={'Country '}
            width={'w-[228px]'}
          />
        </div>
        <div className="grow"></div>
        <div>
          <Button
            text={'Register new attendee'}
            type="submit"
            // onClick={() => {}}
            // onClick={onClick}
            active={true}
          />
        </div>
      </form>
    </div>
  )
}

//a use effect should be used for the user
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
