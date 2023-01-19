import { useState } from 'react'
import { createEventStatusInterface } from '../../../../shared/interface/common'

interface useCreateEventStatus {
  nextPage: () => void
  prevPage: () => void
  setCreatingNewEvent: (bool: boolean) => void
  setCurrentStep: (step: number) => void
  setErrorMsg: (msg: string) => void
}

export default function useCreateEventStatus(
  initialState: createEventStatusInterface
): [createEventStatusInterface, useCreateEventStatus] {
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

  const setCurrentStep = (step: number) => {
    setStatus({ ...currStatus, currentStep: step })
  }

  return [
    currStatus,
    {
      nextPage,
      prevPage,
      setCreatingNewEvent,
      setErrorMsg,
      setCurrentStep
    }
  ]
}
