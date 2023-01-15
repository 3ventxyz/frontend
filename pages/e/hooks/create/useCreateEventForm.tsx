import { startOfToday } from 'date-fns'
import React, { useState } from 'react'
import { LocationData } from '../../../../shared/interface/common'

interface createEventFormInterface {
  title: string
  start_date: Date
  end_date: Date
  event_location: LocationData
  event_id: string
  event_description: string
  ticket_max: number
  file_img: File | null
  event_img_url: string
  selected_predefined_event_img_url: string
  landing_file_img: File | null
  landing_img_url: string
  selected_predefined_landing_img_url: string
}

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
  inputValues = initialInputValues
}: {
  inputValues?: createEventFormInterface
}) {
  const [values, setValues] = useState(inputValues)

  const handleInputChange = (name: string, value: any) => {
    setValues({ ...values, [name]: value })
  }
  return [values, { onChange: handleInputChange }]
}
