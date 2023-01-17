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
  nextPage: () => void
  prevPage: () => void
  setCreatingNewEvent: (bool: boolean) => void
  setErrorMsg: (msg: string) => void
}

export default function useCreateEventStatus({
  initialState = initialCreateEventStatus
}: {
  initialState: createEventStatusInterface
}): [createEventStatusInterface, useCreateEventStatus] {
  const [currStatus, setStatus] =
    useState<createEventStatusInterface>(initialState)

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

  const setCreatingNewEvent = (bool: boolean) => {
    setStatus({
      ...currStatus,
      isCreatingNewEvent: bool
    })
  }

  const setErrorMsg = (errorMsg: string) => {
    setStatus({
      ...currStatus,
      errorMsg: errorMsg
    })
  }

  return [
    currStatus,
    {
      nextPage,
      prevPage,
      setCreatingNewEvent,
      setErrorMsg
    }
  ]
}
