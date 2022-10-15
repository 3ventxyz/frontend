import { doc, getDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import ErrorFormMsg from '../../components/errorMsg'
import { db } from '../../services/firebase_config'
import { uploadImage } from '../../services/upload_image'
import { LocationData } from '../../shared/interface/common'
import { useAuth } from '../../contexts/auth'
import { useRouter } from 'next/router'

export default function EditEvent() {
  const [isUpdatingEvent, setIsUpdatingEvent] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [eventId, setEventId] = useState<string>('') //the event id should be disabled.
  const [eventDescription, setEventDescription] = useState<string>('')
  const [eventLocation, setEventLocation] = useState<LocationData>({
    address: '',
    lat: 0,
    long: 0
  })
  const [fileImg, setFileImg] = useState<File | null>(null)
  const [ticketMax, setTicketMax] = useState<number>(0) //disabled
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [errorField, setErrorField] = useState<string>('')
  const router = useRouter()
  const auth = useAuth()
  const eid = router.query
  //get the passed id from the querying the url
  //   const query = ''

  //   TODO migrate to a different file
  const validateForm = () => {
    if (title === '') {
      setErrorField('Event Title')
      setErrorMsg('title is empty')
      return false
    }
    if (eventId === '') {
      setErrorField('Event id')
      setErrorMsg('event id is empty, please add a custom id')
      return false
    }
    if (
      eventLocation.address === '' ||
      eventLocation.lat === 0 ||
      eventLocation.long === 0
    ) {
      setErrorField('Location')
      setErrorMsg('event location is not selected')
      return false
    }

    if (startDate.getTime() === endDate.getTime()) {
      setErrorField('Start Date/End Date')
      setErrorMsg('start date and end date cannot have the same time period')
      return false
    }
    if (startDate.getTime() > endDate.getTime()) {
      setErrorField('Start Date/End Date')
      setErrorMsg('end date cannot be behind the start date schedule')
      return false
    }
    if (!fileImg) {
      setErrorField('Event Image')
      setErrorMsg('file img is null')
      return false
    }
    if (ticketMax === 0) {
      setErrorField('Tickets')
      setErrorMsg('please add a ticket supply higher than 0')
      return false
    }
    return true
  }

  useEffect(() => {
    const setCurrentEventData = async () => {
      const eventId: any = eid
      const eventRef = doc(db, 'events', eventId)
      const eventDoc = await getDoc(eventRef)
    }
    if (eid) {
      setCurrentEventData()
    }
  }, [eid])
  const updateEvent = async () => {
    let isFormValid
    setIsUpdatingEvent(true)
    setErrorMsg('')
    isFormValid = validateForm()
    if (!isFormValid) {
      setIsUpdatingEvent(false)
      return
    }
    //event id is not needed to take a look again.
    const path = `${auth.uid}/${fileImg?.name}`

    try {
      // change the logic inside the uploadImage.
      // await uploadImage(fileImg, path, async (url: string) => {
      // 	const returnedId = await createNewEvent({
      // 	title: title,
      // 	end_date: endDate,
      // 	start_date: startDate,
      // 	uid: auth.uid,
      // 	description: eventDescription,
      // 	location: eventLocation,
      // 	img_url: url,
      // 	ticket_max: ticketMax,
      // 	event_id: eventId
      //   })
      //   await addEventToUpcomingEvents({
      // 	eventTitle: title,
      // 	uid: auth.uid,
      // 	eventId: eventId,
      // 	startDate: startDate,
      // 	endDate: endDate
      //   })

      //reroute the user back to the previous event.
      //and it will refresh with the new data.
      router.push(`/e/${eventId}`)
      // })
    } catch (e) {
      console.error('event/create:', e)
      alert(
        'error 404: form could not be created due to an unknown error, please try again later.'
      )
      setIsUpdatingEvent(false)
    }
  }
}
