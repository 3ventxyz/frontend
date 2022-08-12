import { useState } from 'react'
import Button from '../../../components/button'
import TicketButton from '../../../components/ticketButton'
import { TicketInterface } from '../../../shared/interface/common'
import TextInput from './textInput'

export default function CreateCheckoutSessionModal({
  selectedTicket,
  onClose
}: {
  selectedTicket: TicketInterface
  onClose: () => void
}) {
  const [checkoutPage, setcheckoutPage] = useState(0)
  const nextCheckoutPage = () => {
    setcheckoutPage(checkoutPage + 1)
  }

  const pageModal = () => {
    switch (checkoutPage) {
      case 1:
        return <RegisterUserForm onClick={nextCheckoutPage} />
      case 2:
        return <DisplayIsLoading onClick={nextCheckoutPage} />
      case 3:
        return <DisplayStatus onClick={nextCheckoutPage} />
      case 4:
        onClose()
      default:
        return (
          <div className="h-[300px]">
            <div className="h-full"></div>
            <div>
              <Button
                text={'Register user'}
                onClick={() => {
                  nextCheckoutPage()
                }}
                active={true}
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="mt-[34px] flex flex-col items-center justify-around ">
      <h3 className="mb-[26px] text-[32px]">Your Order</h3>
      <TicketButton
        selected={true}
        ticket={
          selectedTicket || {
            price: '',
            registeredUsers: '',
            ticketTitle: '',
            tokenId: ''
          }
        }
      />
      <div className="my-[18px] flex h-[320px] items-center justify-center">
        {pageModal()}
      </div>
    </div>
  )
}

function RegisterUserForm({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex w-[466px] flex-col items-center space-y-[39px]">
      <form action="submit" className="mt-[30px] w-full space-y-[10px]">
        <div className="flex space-x-[10px]">
          <TextInput
            id={'first-name'}
            placeholder={'Joe'}
            inputName={'first-name'}
            htmlFor={'first-name'}
            labelTitle={'First name'}
            width={'w-[228px]'}
          />

          <TextInput
            id={'last-name'}
            placeholder={'Doe'}
            inputName={'last-name'}
            htmlFor={'last-name'}
            labelTitle={'Last name'}
            width={'w-[228px]'}
          />
        </div>
        <TextInput
          id={'address'}
          placeholder={'street address ...'}
          inputName={'address'}
          htmlFor={'address'}
          labelTitle={'Street address'}
        />
        <div className="flex space-x-[10px]">
          <TextInput
            id={'city'}
            placeholder={'Seattle'}
            inputName={'city'}
            htmlFor={'city'}
            labelTitle={'City'}
            width={'w-[228px]'}
          />
          <TextInput
            id={'state'}
            placeholder={'CA'}
            inputName={'state'}
            htmlFor={'state'}
            labelTitle={'State '}
            width={'w-[228px]'}
          />
        </div>
        <div className="flex space-x-[10px]">
          <TextInput
            id={'zip-code'}
            placeholder={'zip code'}
            inputName={'zip-code'}
            htmlFor={'zip-code'}
            labelTitle={'Zip code'}
            width={'w-[228px]'}
          />
          <TextInput
            id={'country'}
            placeholder={'United States'}
            inputName={'country'}
            htmlFor={'country'}
            labelTitle={'Country '}
            width={'w-[228px]'}
          />
        </div>
      </form>
      <div>
        <Button
          text={'Submit Order'}
          onClick={() => {
            onClick()
          }}
          active={true}
        />
      </div>
    </div>
  )
}

function DisplayIsLoading({ onClick }: { onClick: () => void }) {
  return (
    <div className="h-full ">
      <div className="flex h-[300px]  items-center justify-center">
        <div
          className="h-[100px] w-[100px] animate-spin rounded-full border-4 border-solid border-blue-400 border-t-white/[.00]"
          role="status"
        >
          <span className="hidden">Loading...</span>
        </div>
      </div>
      <div>
        <Button
          text={'Pending'}
          onClick={() => {
            onClick()
          }}
          active={true}
        />
      </div>
    </div>
  )
}
function DisplayStatus({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex h-full flex-col items-center space-y-[20px]">
      <div className="flex h-[300px] flex-col items-center justify-center space-y-[20px]">
        <h3 className="text-[32px] font-bold">Success!</h3>
        <div className="text-[14px] font-normal">
          an email confirmation was sent to your inbox
        </div>
      </div>
      <div>
        <Button
          text={'Close window'}
          onClick={() => {
            onClick()
          }}
          active={true}
        />
      </div>
    </div>
  )
}
