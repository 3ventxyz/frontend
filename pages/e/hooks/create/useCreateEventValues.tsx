import { startOfToday } from 'date-fns'
import { useState } from 'react'
import CheckEventId from '../../../../services/check_event_id'
import {
  createEventFormInterface,
  LocationData
} from '../../../../shared/interface/common'
import { CreateEventErrors } from '../../utils/enums'
interface useCreateEventValuesInterface {
  setTextValue: (name: string, value: string) => void
  setNumberValue: (name: string, num: number) => void
  setDate: (name: string, date: Date) => void
  setLocation: (name: string, location: LocationData) => void
  setFileImg: (name: string, fileImg: File) => void
  setPredefinedImgUrl: (name: string, fileImgUrl: string) => void
  formValidator: () => Promise<CreateEventErrors>
}

export default function useCreateEventValues(
  initialState: createEventFormInterface
): [createEventFormInterface, useCreateEventValuesInterface] {
  const [values, setValues] = useState(initialState)

  const setTextValue = (name: string, value: string) => {
    setValues({ ...values, [name]: value })
  }
  const setNumberValue = (name: string, num: number) => {
    setValues({ ...values, [name]: num })
  }
  const setDate = (name: string, date: Date) => {
    setValues({ ...values, [name]: date })
  }
  const setLocation = (name: string, location: LocationData) => {
    setValues({ ...values, [name]: location })
  }

  const setFileImg = (name: string, fileImg: File) => {
    setValues({ ...values, [name]: fileImg })
  }
  const setPredefinedImgUrl = (name: string, predefinedImgUrl: string) => {
    setValues({ ...values, [name]: predefinedImgUrl })
  }

  const fileTypeValidator = (file: File | null) => {
    if (!file) {
      return true
    }
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      console.log('valid image type', file.type)
      return true
    }
    console.error('invalid image type', file.type)
    return false
  }

  const formValidator = async () => {
    if (values.title === '') {
      // setErrorField('Event Title')
      // setErrorMsg('title is empty')
      return CreateEventErrors.emptyTitle
    }
    if (!fileTypeValidator(values.file_img)) {
      // setErrorField('Event Image')
      // setErrorMsg(
      //   'Selected Image is invalid type. Please upload jpg or png image.'
      // )
      return CreateEventErrors.invalidFileType
    }
    if (!values.file_img && values.event_img_url == '') {
      // setErrorField('Event Image')
      // setErrorMsg('Image is invalid, please select an image for your event.')
      return CreateEventErrors.emptyImage
    }
    if (
      values.event_location.address === '' ||
      values.event_location.lat === 0 ||
      values.event_location.long === 0
    ) {
      // setErrorField('Location')
      // setErrorMsg('event location is not selected')
      return CreateEventErrors.emptyEventLocation
    }

    if (values.start_date.getTime() < startOfToday().getTime()) {
      // setErrorField('Start Date/End Date')
      // setErrorMsg('start date cannot be a previous date from today')
      return CreateEventErrors.startDateBehind
    }

    if (values.start_date.getTime() === values.end_date.getTime()) {
      // setErrorField('Start Date/End Date')
      // setErrorMsg('start date and end date cannot have the same time period')
      return CreateEventErrors.sameDatePeriod
    }
    if (values.start_date.getTime() > values.end_date.getTime()) {
      // setErrorField('Start Date/End Date')
      // setErrorMsg('end date cannot be behind the start date schedule')
      return CreateEventErrors.endDateBehind
    }
    if (isNaN(values.ticket_max)) {
      // setErrorField('Tickets')
      // setErrorMsg('Please enter a valid number of tickets')
      return CreateEventErrors.invalidNumber
    }
    if (values.ticket_max < 0) {
      // setErrorField('Tickets')
      // setErrorMsg('event capacity cannot be lower than the previous capacity')
      return CreateEventErrors.lowCapNumber
    }
    if (await CheckEventId(values.event_id)) {
      // setCreatingNewEvent(false)
      // setErrorMsg(
      //   'Event ID: event id has been taken, please enter a different id'
      // )
      return CreateEventErrors.eventIdTaken
    }
    return CreateEventErrors.noError
  }

  return [
    values,
    {
      setTextValue,
      setNumberValue,
      setDate,
      setLocation,
      setFileImg,
      setPredefinedImgUrl,
      formValidator
    }
  ]
}
