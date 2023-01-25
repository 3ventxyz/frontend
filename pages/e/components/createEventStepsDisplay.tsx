{
  /* TODO (1/20/23) Marthel, CreateEventStepsDisplay: create a new param that disables the buttons, when
  a new event is being created.*/
}
export default function CreateEventStepsDisplay({
  currentStep,
  setCurrentStep
}: // add a disabled variable
{
  currentStep: number
  setCurrentStep: (step: number) => void
}) {
  return (
    <div className="sticky bottom-[0px] z-0 hidden md:block">
      <div id="create-event-steps" className="flex flex-col space-y-[10px] ">
        {/*each step update the onClick with an empty function and update 
        the isComplete boolean with the disabled variable.*/}
        <Step
          num={1}
          stepInstruction={'Event title, location and date'}
          currentStep={currentStep == 0}
          isComplete={currentStep > 0}
          onClick={setCurrentStep}
        />
        <Step
          num={2}
          stepInstruction={'Event description and ticket supply'}
          currentStep={currentStep == 1}
          isComplete={currentStep > 1}
          onClick={setCurrentStep}
        />
        <Step
          num={3}
          stepInstruction={'Event Images'}
          currentStep={currentStep == 2}
          isComplete={currentStep > 2}
          onClick={setCurrentStep}
        />
      </div>
    </div>
  )
}

function Step({
  num,
  stepInstruction,
  currentStep,
  isComplete,
  onClick
}: {
  num: number
  stepInstruction?: string
  currentStep?: boolean
  isComplete?: boolean
  onClick: (step: number) => void
}) {
  return isComplete ? (
    <div
      onClick={() => {
        onClick(num - 1)
      }}
      className={`flex h-[50px] w-[180px] items-center space-x-[5px] rounded-xl border-[1px] border-[#BABABA] bg-[#EDEDED] px-[5px]  text-[#828282] hover:cursor-pointer hover:bg-[#e0e0e0]`}
    >
      <div className="flex h-[28px] w-[30px] items-center justify-center rounded-3xl border-[1px] border-[#BABABA] bg-white">
        {num}
      </div>
      <div className="w-[150px]">{stepInstruction}</div>
    </div>
  ) : (
    <div
      onClick={() => {
        onClick(num - 1)
      }}
      className={`flex h-[50px] w-[180px]  items-center space-x-[5px] rounded-xl border-[1px] border-black hover:cursor-pointer ${
        currentStep ? 'bg-[#B6CFFF]' : 'bg-white hover:bg-[#e5edff]'
      } px-[5px]`}
    >
      <div className="flex h-[28px] w-[30px] items-center justify-center rounded-3xl border-[1px] border-black bg-white">
        {num}
      </div>
      <div className="w-[150px]">{stepInstruction}</div>
    </div>
  )
}
