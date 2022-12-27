import { useState } from 'react'

export default function CreateEventStepsDisplay() {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
    false
  ])

  return (
    <div
      id="create-event-steps"
      className="static flex flex-col space-y-[10px] "
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
