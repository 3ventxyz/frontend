import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import TextInput from '../../components/textInput'
import { LocationData } from '../../shared/interface/common'
import LocationInput from '../../components/locationInput'
import PredefinedImageOption from './components/predefinedImageOption'
import { useRouter } from 'next/router'
import FileImageInput from '../../components/fileImageInput'
import { useAuth } from '../../contexts/auth'

/**
 *
 * check the figma
 */
export default function CreateNew() {
  const router = useRouter()
  const auth = useAuth()

  const staticImgUrl1: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent1.jpg?alt=media&token=841706c6-4890-4716-8ea1-16a1af49154a'
  const staticImgUrl2: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent2.jpg?alt=media&token=8be3fca4-9f01-4c0a-8654-984990ea8963'
  const staticImgUrl3: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent3.jpg?alt=media&token=ae0f2e20-6c24-4c0f-b080-8b4cdaf0ba7d'
  const staticImgUrl4: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent4.jpg?alt=media&token=145fdc18-f398-4d26-b441-0f63356db72e'

  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [eventId, setEventId] = useState<string>('')
  const [eventDescription, setEventDescription] = useState<string>('')
  const [eventLocation, setEventLocation] = useState<LocationData>({
    address: '',
    lat: 0,
    long: 0
  })
  const [fileImg, setFileImg] = useState<File | null>(null)
  const [ticketMax, setTicketMax] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [errorField, setErrorField] = useState<string>('')

  const [selectedPredefinedEventImgUrl, setSelectedPredefinedEventImgUrl] =
    useState<string>('')
  const [selectedPredefinedImgIndex, setSelectedPredefinedImgIndex] =
    useState<number>(0)
  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="w-full max-w-[600px] bg-green-100">
        <h3>Create Event</h3>

        <hr />
        <div id="test" className="flex">
          <div className="flex flex-col">
            {/* step 1: title, location, date */}
            <div id="step-1">
              <h4>1.- Event title, location and date</h4>
              <hr />
              <div className="flex flex-col">
                <TextInput
                  id={'event_name'}
                  labelText={'Title'}
                  placeholder={''}
                  setValue={setTitle}
                  isDisabled={isCreatingNewEvent}
                />
                <LocationInput
                  labelText={'Location*'}
                  id={'event_location'}
                  placeholder={''}
                  setLocation={setEventLocation}
                />
                <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    START DATE
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                </div>
                <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    END DATE
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                </div>
              </div>
            </div>

            {/* step 2 description and max cap */}
            <div id="step-2">
              <h4>2.- Description and max attendee cap</h4>
              <hr />
              <div className="flex flex-col">
                <TextInput
                  textArea={true}
                  id={'event_description'}
                  labelText={'Description'}
                  placeholder={''}
                  setValue={setEventDescription}
                  isDisabled={isCreatingNewEvent}
                />

                <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    TICKET SUPPLY
                  </label>
                  <input
                    onChange={(e) => {
                      setTicketMax(parseInt(e.target.value))
                    }}
                    className={`focus:shadow-outline leading-0 h-full min-h-[56px] w-full max-w-[400px] rounded-[16px] border-[1.5px] ${
                      isCreatingNewEvent
                        ? 'border-gray-300  text-gray-300'
                        : 'border-black  text-gray-700'
                    } px-2  focus:outline-none`}
                    id={'event_ticket_max'}
                    type="number"
                    placeholder={'0'}
                    disabled={isCreatingNewEvent}
                  />
                </div>
              </div>
            </div>
            {/* step 3 images */}
            <div id="step-3">
              <h4>3.- Landing portrait and ticket image</h4>
              <hr />
              <div className="flex flex-col">
                <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    IMAGE
                  </label>
                  <FileImageInput
                    fileImg={fileImg}
                    setFileImg={setFileImg}
                    imgUrlTemplate={selectedPredefinedEventImgUrl}
                  />
                  {fileImg === null ? (
                    <div>
                      <h4 className="w-full">
                        <span>predefined images</span>
                      </h4>
                      <div className="flex flex-col items-center space-y-2">
                        <p>
                          In case that you don&apos;t have an image for your
                          event. Please select one of the pictures that we
                          offer.
                        </p>
                        <div className="flex space-x-2">
                          <PredefinedImageOption
                            setSelectedPredefinedImgIndex={
                              setSelectedPredefinedImgIndex
                            }
                            setSelectedPredefinedEventImgUrl={
                              setSelectedPredefinedEventImgUrl
                            }
                            imgIndex={1}
                            selectedPredefinedImgIndex={
                              selectedPredefinedImgIndex
                            }
                            predefinedImgUrl={staticImgUrl1}
                          />
                          <PredefinedImageOption
                            setSelectedPredefinedImgIndex={
                              setSelectedPredefinedImgIndex
                            }
                            setSelectedPredefinedEventImgUrl={
                              setSelectedPredefinedEventImgUrl
                            }
                            imgIndex={2}
                            selectedPredefinedImgIndex={
                              selectedPredefinedImgIndex
                            }
                            predefinedImgUrl={staticImgUrl2}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <PredefinedImageOption
                            setSelectedPredefinedImgIndex={
                              setSelectedPredefinedImgIndex
                            }
                            setSelectedPredefinedEventImgUrl={
                              setSelectedPredefinedEventImgUrl
                            }
                            imgIndex={3}
                            selectedPredefinedImgIndex={
                              selectedPredefinedImgIndex
                            }
                            predefinedImgUrl={staticImgUrl3}
                          />
                          <PredefinedImageOption
                            setSelectedPredefinedImgIndex={
                              setSelectedPredefinedImgIndex
                            }
                            setSelectedPredefinedEventImgUrl={
                              setSelectedPredefinedEventImgUrl
                            }
                            imgIndex={4}
                            selectedPredefinedImgIndex={
                              selectedPredefinedImgIndex
                            }
                            predefinedImgUrl={staticImgUrl4}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="create-event-steps"
          className="fixed right-[350px] flex flex-col"
        >
          <div>step 1</div>
          <div>step 2</div>
          <div>step 3</div>
        </div>
      </div>
    </div>
  )
}
