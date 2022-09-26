// author: Marthel
import TextInput from '../../components/textInput'
import Button from '../../components/button'
import FileImageInput from '../../components/fileImageInput'
import { useState } from 'react'
import Spinner from '../../components/spinner'
import LocationInput from '../../components/locationInput'
import { LocationData } from '../../shared/interface/common'
import { createNewEvent } from '../../services/create_new_event'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { uploadImage } from '../../services/upload_image'
import addEventToUpcomingEvents from '../../services/add_event_to_upcoming_events'


// interface for the create event form, text inputs.
interface createEventFormInterface {
  title: string
  eventId: string
  description: string
  ticketMax: number
}

const inputs = [
  {
    id: 'event_title',
    name: 'event_title',
    type: 'text',
    placeholder: '',
    label: 'Event Title'
  },
  {
    id: 'event_id',
    name: 'event_id',
    type: 'text',
    placeholder: 'www.3vent.xyz/e/',
    label: 'Event ID:'
  },
  {
    id: 'event_description',
    name: 'event_description',
    type: 'description',
    placeholder: '',
    label: 'Description'
  },
  {
    id: 'event_location',
    name: 'event_location',
    type: 'location_input',
    placeholder: '',
    label: 'Location'
  },
  //date pickers
  {
    id: 'start_date',
    name: 'start_date',
    type: 'start_date',
    placeholder: '',
    label: ''
  },
  {
    id: 'end_Date',
    name: 'end_date',
    type: 'end_date',
    placeholder: '',
    label: ''
  },
  //file img
  {
    id: 'file_img',
    name: 'file_img',
    type: 'file_img',
    placeholder: '',
    label: ''
  },
  //tickets
  {
    id: 'max_tickets',
    name: 'file_img',
    type: 'tickets',
    placeholder: '0',
    label: ''
  }
]

export default function CreateEvent() {
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [eventLocation, setEventLocation] = useState<LocationData>({
    address: '',
    lat: 0,
    long: 0
  })
  const [fileImg, setFileImg] = useState<File | null>(null)
  const [ticketMax, setTicketMax] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [formData, setTextFormData] = useState<createEventFormInterface>({
    description: '',
    eventId: '',
    ticketMax: 0,
    title: ''
  })
  const router = useRouter()
  const auth = useAuth()

  const createEvent = async () => {
    const path = `${auth.uid}/${fileImg?.name}`
    try {
      await uploadImage(fileImg, path, async (url: string) => {
        const returnedId = await createNewEvent({
          title: formData.title,
          end_date: endDate,
          start_date: startDate,
          uid: auth.uid,
          description: formData.description,
          location: eventLocation,
          img_url: url,
          ticket_max: formData.ticketMax,
          event_id: formData.eventId
        })
        await addEventToUpcomingEvents({
          eventTitle: formData.title,
          uid: auth.uid,
          eventId: formData.eventId,
          startDate: startDate,
          endDate: endDate
        })
        console.log('returned id:', formData.eventId)
        router.push(`/e/${formData.eventId}`)
      })
    } catch (e) {
      alert('error')
      setIsCreatingNewEvent(false)
    }
  }

  //trying to add this onChange function to the TextInput component.
  const onChangeTextInputData = (e: any) => {
    e.preventDefault()
    setTextFormData({
      description: e.target.event_description.value,
      eventId: e.target.event_id.value,
      ticketMax: ticketMax,
      title: e.target.event_title.value
    })
    console.log(formData)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('=IMG==========')
    console.log(fileImg)
    console.log('===========')
    console.log(' event target elements===========')
    console.log(e.target.elements)
    console.log('event_id: ', e.target.event_id.value)
    console.log('event_description: ', e.target.event_description.value)
    console.log('title: ', e.target.event_title.value)
    console.log(' ==============================')
    setTextFormData({
      description: e.target.event_description.value,
      eventId: e.target.event_id.value,
      ticketMax: ticketMax,
      title: e.target.event_title.value
    })
    console.log('form data==================')
    console.log(formData)
    console.log('===========================')

    // createEvent()
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="flex w-screen bg-secondaryBg pb-[100px] pt-[35px]">
        <div className="mx-auto flex w-full max-w-[600px] flex-col items-start justify-start space-y-4">
          <h3 className="w-full text-center">Create an Event</h3>

          {inputs.map((input) => {
            switch (input.type) {
              case 'start_date':
                return (
                  <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                    <p>Start Date</p>
                    <DatePicker
                      name="startDate"
                      selected={startDate}
                      onChange={(date: Date) => setStartDate(date)}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                  </div>
                )
              case 'end_date':
                return (
                  <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                    <p>End Date</p>
                    <DatePicker
                      name="endDate"
                      selected={endDate}
                      onChange={(date: Date) => setEndDate(date)}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                  </div>
                )
              case 'file_img':
                return (
                  <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                    <p>Event Image:</p>
                    <FileImageInput
                      name={'file_img'}
                      fileImg={fileImg}
                      setFileImg={setFileImg}
                    />
                  </div>
                )
              case 'location_input':
                return (
                  <LocationInput
                    labelText={input.label}
                    name={input.name}
                    id={input.id}
                    placeholder={input.placeholder}
                    setLocation={setEventLocation}
                  />
                )
                break
              case 'tickets':
                return (
                  <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                    <p>Tickets:</p>
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
                      name="max_tickets"
                      placeholder={'0'}
                      disabled={isCreatingNewEvent}
                    />
                  </div>
                )
                break
              case 'description':
                return (
                  <TextInput
                    name={input.name}
                    id={input.id}
                    labelText={input.label}
                    placeholder={input.placeholder}
                    setValue={() => {}}
                    isDisabled={isCreatingNewEvent}
                    textArea={true}
                  />
                )
                break
              default:
                return (
                  <TextInput
                    name={input.name}
                    id={input.id}
                    labelText={input.label}
                    placeholder={input.placeholder}
                    setValue={() => {}}
                    isDisabled={isCreatingNewEvent}
                  />
                )
            }
          })}
          <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
            {isCreatingNewEvent ? (
              <>
                <Spinner width={40} height={40} />
                <p>Creating new event, please do not refresh</p>
              </>
            ) : (
              <Button
                type="submit"
                text={'Create new event'}
                onClick={() => {}}
                active={true}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
