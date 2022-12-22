import React, { useState } from 'react'

import TextInput from '../../components/textInput'
import { LocationData } from '../../shared/interface/common'

import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'
import FirstStepInputs from './components/firstStepInputs'
import SecondStepInputs from './components/secondStepInputs'
import ThirdStepInputs from './components/thirdStepInputs'

/**
 *
 * check the figma
 */
export default function CreateNew() {
  const router = useRouter()
  const auth = useAuth()

  const [eventId, setEventId] = useState<string>('')

  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)

  const [errorMsg, setErrorMsg] = useState<string>('')
  const [errorField, setErrorField] = useState<string>('')

  return (
    <div className="flex w-full justify-center bg-secondaryBg">
      <div className="w-full max-w-[600px] space-y-10 pt-[60px] pb-[200px] ">
        <div>
          <h3>Create Event</h3>
          <hr />
        </div>
        <div id="create-event-form" className="flex">
          <div className="flex flex-col space-y-10">
            <FirstStepInputs />
            <SecondStepInputs />
            <ThirdStepInputs />
          </div>
        </div>
      </div>
      <div
        id="create-event-steps"
        className="fixed right-[460px]  top-[200px] flex  flex-col space-y-5 "
      >
        {/* <div>step 1</div>
        <div>step 2</div>
        <div>step 3</div> */}
        <Step />
        <Step />
        <Step />
      </div>
    </div>
  )
}

function Step({
  num,
  stepInstruction,
  isActive,
  isComplete
}: {
  num?: number
  stepInstruction?: string
  isActive?: boolean
  isComplete?: boolean
}) {
  return <div className="h-[80px] w-[180px] rounded-xl bg-white">step1</div>
}
