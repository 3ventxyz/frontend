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

interface useCreateEventValuesInterface {
  setTextValue: (name: string, value: string) => void
  setNumberValue: (name: string, num: number) => void
  setDate: (name: string, date: Date) => void
  setLocation: (name:string, location:LocationData) =>void
  // setFileImg: (name: string, fileImg: File) => void
  // setFileImgUrl: (name: string, fileImgUrl: string) => void
}

export default function useCreateEventValues({
  initialState = initialInputValues
}: {
  initialState: createEventFormInterface
}): [createEventFormInterface, useCreateEventValuesInterface] {
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
  const setLocation = (name:string, location:LocationData)=>{
    setValues({ ...values, [name]: location })
  }
  
  // const setFileImg = (name: string, fileImg: File) => {}
  // const setFileImgUrl = (name: string, fileImgUrl: string) => {}
  return [values, { setTextValue, setNumberValue, setDate,setLocation }]
}
