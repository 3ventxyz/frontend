import Button from '../../../components/buttons/button'
import ErrorFormMsg from '../../../components/utils/errorMsg'
import Spinner from '../../../components/utils/spinner'

{
  /* TODO (1/20/23) Marthel, CreateEventFooter: Add new parameters to the CreateEventFooter 
    that it gets error message and place of the error when those 2 params are updated.
    The UI should look good for it. Also, create a new button called, review. Once clicked on
    review, the whole form will be expanded and the webpage will scroll back to the top, allowing
    the user to review and make any edits one more if necessary. Then the button 'create event' should
    appear, that when the user clicks on it, it will start to create a new event. */
}

export default function CreateEventFooter({
  currentStep,
  isCreatingNewEvent,
  prevPage,
  nextPage,
  createEvent
}: //add 2 params for error message.
{
  currentStep: number
  isCreatingNewEvent: boolean
  prevPage: () => void
  nextPage: () => void
  createEvent: () => void
}) {
  const stepsText = ['Step 1', 'Step 2', 'Step 3']
  const instructionsText = [
    'Event title, location and date',
    'Event description and ticket supply',
    'Event Images'
  ]
  return (
    <div className="sticky bottom-[0px] z-40 flex h-[80px] w-full  justify-center bg-white shadow-md">
      {/* button for pagination and submit newly created event. */}
      <div className="flex w-full max-w-[350px] items-center justify-between space-x-5 sm:max-w-[450px] md:max-w-[700px]">
        <div>
          <div className="text-[17px] font-bold sm:text-[20px]">
            {stepsText[currentStep]}
          </div>
          <div className="text-[14px] sm:text-[16px]">
            {instructionsText[currentStep]}
          </div>
        </div>
        {isCreatingNewEvent ? (
          <div className="flex items-center">
            <Spinner width={25} height={25} />
            <div className="ml-[10px]">Creating event, please wait...</div>
          </div>
        ) : (
          <div className="">
            <div className="  flex space-x-2">
              <Button
                text={'Prev'}
                active={currentStep > 0 ? true : false}
                onClick={() => {
                  prevPage()
                }}
              />
              {currentStep < 2 ? (
                <Button
                  text={'Next'}
                  active={currentStep < 2 ? true : false}
                  onClick={() => {
                    nextPage()
                  }}
                />
              ) : (
                <Button
                  text={'Create Event'}
                  active={true}
                  onClick={() => {
                    createEvent()
                  }}
                />
              )}
            </div>
            <div className="absolute right-[420px]">
              <ErrorFormMsg
                errorField={'image field'}
                errorMsg={'end date cannot be behind the start date schedule'}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
