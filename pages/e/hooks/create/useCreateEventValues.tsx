import { startOfToday } from 'date-fns'
import { useState } from 'react'
import CheckEventId from '../../../../services/check_event_id'
import {
  createEventFormInterface,
  LocationData
} from '../../../../shared/interface/common'
import { CreateEventErrors } from '../../../../shared/enums/enums'
interface useCreateEventValuesInterface {
  setTextValue: (name: string, value: string) => void
  setNumberValue: (name: string, num: number) => void
  setDate: (name: string, date: Date) => void
  setLocation: (name: string, location: LocationData) => void
  setFileImg: (name: string, fileImg: File) => void
  setPredefinedImgUrl: (name: string, fileImgUrl: string) => void
  setTags: (name: string, value: string) => void
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

  const setTags = (name: string, value: string) => {
    const slicedTags: string[] = value.split(',')
    setValues({ ...values, [name]: slicedTags })
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
      return CreateEventErrors.emptyTitle
    }

    if (values.event_id === '') {
      return CreateEventErrors.eventIdTaken
    }

    if (await CheckEventId(values.event_id)) {
      return CreateEventErrors.eventIdTaken
    }

    if (
      values.event_location.address === '' ||
      values.event_location.lat === 0 ||
      values.event_location.long === 0
    ) {
      console.log('useCreateEventValues: event location error inside if statement');
      return CreateEventErrors.emptyEventLocation
    }
    else{
      console.log('useCreateEventValues: NO ERRROR.');
    }

    if (values.start_date.getTime() < startOfToday().getTime()) {
      return CreateEventErrors.startDateBehind
    }

    if (values.start_date.getTime() === values.end_date.getTime()) {
      return CreateEventErrors.sameDatePeriod
    }
    if (values.start_date.getTime() > values.end_date.getTime()) {
      return CreateEventErrors.endDateBehind
    }

    if (isNaN(values.ticket_max)) {
      return CreateEventErrors.invalidNumber
    }
    if (values.ticket_max <= 0) {
      return CreateEventErrors.lowCapNumber
    }

    if (
      !fileTypeValidator(values.event_file_img) ||
      !fileTypeValidator(values.landing_file_img)
    ) {
      return CreateEventErrors.invalidFileType
    }
    if (values.event_img_url == '' && !values.event_file_img) {
      return CreateEventErrors.emptyImage
    }
    if (values.landing_img_url == '' && !values.landing_file_img) {
      return CreateEventErrors.emptyImage
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
      setTags,
      setPredefinedImgUrl,
      formValidator
    }
  ]
}
