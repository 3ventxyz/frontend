import { startOfToday } from 'date-fns'
import { useState } from 'react'
import {
  createEventFormInterface,
  LocationData
} from '../../../../shared/interface/common'

const initialInputValues: createEventFormInterface = {
  title: '',
  start_date: startOfToday(),
  end_date: startOfToday(),
  event_location: {
    address: '',
    lat: 0,
    long: 0
  },
  event_id: '',
  event_description: '',
  ticket_max: 0,
  file_img: null,
  selected_predefined_event_img_url: '',
  landing_file_img: null,
  selected_predefined_landing_img_url: '',
  event_img_url: '',
  landing_img_url: ''
}

export default function useCreateEventFormState({
  initialState = initialInputValues
}: {
  initialState: createEventFormInterface
}): [createEventFormInterface, (name: string, value: any) => void] {
  const [values, setValues] = useState(initialState)

  const handleInputChange = (name: string, value: any) => {
    setValues({ ...values, [name]: value })
  }
  return [values, handleInputChange]
}
