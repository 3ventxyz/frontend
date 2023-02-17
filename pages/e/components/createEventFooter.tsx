import { Button } from '../../../components/buttons/button'
import ErrorFormMsg from '../../../components/utils/errorMsg'
import { Spinner } from '../../../components/utils/spinner'
import { CreateEventInputs } from '../../../shared/enums/enums'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'
import { useEffect } from 'react'

export default function CreateEventFooter({
  currentInput,
  isCreatingNewEvent,
  errorMsg,
  errorField,
  currInputField,
  inputFieldInstr,
  onPrevStep,
  onNextStep,
  createEvent
}: {
  currentInput: CreateEventInputs
  isCreatingNewEvent: boolean
  errorMsg: string
  errorField: string
  currInputField: string
  inputFieldInstr: string
  onPrevStep: () => void
  onNextStep: () => void
  createEvent: () => void
}) {
  useEffect(() => {
    console.log('update create event footer')
    console.log('errorField: ', errorField)
    console.log('errorMsg: ', errorMsg)
    console.log('isCreatingNewEvent: ', isCreatingNewEvent)
  }, [errorField, errorMsg, isCreatingNewEvent])
  return (
    <div className="sticky bottom-[0px] z-40 flex h-[80px] w-full  justify-center bg-white shadow-md">
      {/* button for pagination and submit newly created event. */}
      <div className="flex w-full max-w-[350px] items-center justify-between space-x-5 sm:max-w-[450px] md:max-w-[700px]">
        {errorField !== '' && errorMsg !== '' ? (
          <div className="flex items-center space-x-2">
            <div>
              <BsFillExclamationTriangleFill className="h-[35px] w-[35px]" />
            </div>
            <div>
              <div className="text-[17px] font-bold sm:text-[20px]">
                <span className="text-red-500">Error:</span> {errorField}
              </div>
              <div className="hidden text-[14px] sm:text-[16px] md:block">
                {errorMsg}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-[17px] font-bold sm:text-[20px]">
              {currInputField}
            </div>
            <div className="hidden text-[14px] sm:text-[16px] md:block">
              {inputFieldInstr}
            </div>
          </div>
        )}
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
                active={currentInput !== CreateEventInputs.eventTitle}
                onClick={() => {
                  onPrevStep()
                }}
              />
              {currentInput !== CreateEventInputs.images ? (
                <Button
                  text={'Next'}
                  active={true}
                  onClick={() => {
                    onNextStep()
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
          </div>
        )}
      </div>
    </div>
  )
}
