import { useState } from 'react'

interface createEventStatusInterface {
  currentStep: number
  isCreatingNewEvent: boolean
  errorMsg: string
}

const initialCreateEventStatus: createEventStatusInterface = {
  currentStep: 0,
  isCreatingNewEvent: false,
  errorMsg: ''
}

interface useCreateEventStatus {
  handleStatusChange: (name: string, status: boolean | number | string) => void
  nextPage: () => void
  prevPage: () => void
  creatingNewEvent: (bool: boolean) => void
  setErrorMsg:(msg: string)=>void
}

export default function useCreateEventStatus({
  initialState = initialCreateEventStatus
}: {
  initialState: createEventStatusInterface
}): [createEventStatusInterface, useCreateEventStatus] {
  const [currStatus, setStatus] = useState(initialState)

  const handleStatusChange = (
    name: string,
    status: boolean | number | string
  ) => {
    setStatus({ ...currStatus, [name]: status })
  }

  const nextPage = () => {
    let page = currStatus.currentStep
    page++
    setStatus({ ...currStatus, currentStep: page })
  }

  const prevPage = () => {
    let page = currStatus.currentStep
    page--
    setStatus({ ...currStatus, currentStep: page })
  }
  const creatingNewEvent = (bool: boolean) => {
    setStatus({
      ...currStatus,
      isCreatingNewEvent: bool
    })
  }
  const setErrorMsg=(errorMsg:string)=>{
    setStatus({
      ...currStatus,
      errorMsg: errorMsg
    })
  }
  return [
    currStatus,
    {
      handleStatusChange,
      nextPage,
      prevPage,
      creatingNewEvent,
      setErrorMsg
    }
  ]
}
