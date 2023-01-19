import { useState } from 'react'
import {
  createEventFormInterface,
  LocationData
} from '../../../../shared/interface/common'

interface useCreateEventValuesInterface {
  setTextValue: (name: string, value: string) => void
  setNumberValue: (name: string, num: number) => void
  setDate: (name: string, date: Date) => void
  setLocation: (name: string, location: LocationData) => void
  setFileImg: (name: string, fileImg: File) => void
  setPredefinedImgUrl: (name: string, fileImgUrl: string) => void
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
  return [
    values,
    {
      setTextValue,
      setNumberValue,
      setDate,
      setLocation,
      setFileImg,
      setPredefinedImgUrl
    }
  ]
}
