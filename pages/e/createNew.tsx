import React, { useState } from 'react'
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
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
    false
  ])
  const [currentSteps, setCurrentSteps] = useState<boolean[]>([
    true,
    false,
    false
  ])

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
        className="fixed right-[460px]  top-[200px] flex  flex-col space-y-[10px] "
      >
        <Step
          num={1}
          stepInstruction={'Event title, location and date'}
          currentStep={true}
          isComplete={false}
        />
        <Step
          num={2}
          stepInstruction={'Event description and ticket supply'}
          currentStep={false}
          isComplete={true}
        />
        <Step
          num={3}
          stepInstruction={'Event Images'}
          currentStep={false}
          isComplete={false}
        />
      </div>
    </div>
  )
}

function Step({
  num,
  stepInstruction,
  currentStep,
  isComplete
}: {
  num?: number
  stepInstruction?: string
  currentStep?: boolean
  isComplete?: boolean
}) {
  return isComplete ? (
    <div
      className={`flex h-[50px] w-[180px] items-center space-x-[5px] rounded-xl border-[1px] border-[#BABABA]  bg-[#EDEDED] px-[5px] text-[#828282]`}
    >
      <div className="flex h-[28px] w-[30px] items-center justify-center rounded-3xl border-[1px] border-[#BABABA] bg-white">
        {num}
      </div>
      <div className="w-[150px]">{stepInstruction}</div>
    </div>
  ) : (
    <div
      className={`flex h-[50px] w-[180px] items-center space-x-[5px] rounded-xl border-[1px] border-black ${
        currentStep ? 'bg-[#B6CFFF]' : 'bg-white'
      } px-[5px]`}
    >
      <div className="flex h-[28px] w-[30px] items-center justify-center rounded-3xl border-[1px] border-black bg-white">
        {num}
      </div>
      <div className="w-[150px]">{stepInstruction}</div>
    </div>
  )
}
