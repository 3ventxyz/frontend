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
<<<<<<< HEAD

  const setErrorMsg = (errorMsg: string) => {
=======
  const setErrorMsg=(errorMsg:string)=>{
>>>>>>> b12c088 (errorMsg moved up to useCreateEventStatus hook)
    setStatus({
      ...currStatus,
      errorMsg: errorMsg
    })
  }
<<<<<<< HEAD

  const setCurrentStep = (step: number) => {
    setStatus({ ...currStatus, currentStep: step })
  }

=======
>>>>>>> b12c088 (errorMsg moved up to useCreateEventStatus hook)
  return [
    currStatus,
    {
      nextPage,
      prevPage,
<<<<<<< HEAD
      setCreatingNewEvent,
      setErrorMsg,
      setCurrentStep
=======
      creatingNewEvent,
      setErrorMsg
>>>>>>> b12c088 (errorMsg moved up to useCreateEventStatus hook)
    }
  ]
}
