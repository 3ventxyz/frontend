import { useState } from 'react'
import { createEventStatusInterface } from '../../../../shared/interface/common'
import {
  dateErrorField,
  emptyEventLocationErrorMsg,
  emptyImageErrorMsg,
  emptyTitleErrorMsg,
  endDateBehindErrorMsg,
  eventIDErrorField,
  eventIdTakenErrorMsg,
  eventImageErrorField,
  eventTitleErrorField,
  invalidFileTypeErrorMsg,
  invalidNumberErrorMsg,
  lowCapNumberErrorMsg,
  sameDatePeriodErrorMsg,
  startDateBehindErrorMsg,
  ticketErrorField
} from '../../utils/consts'
import { CreateEventErrors } from '../../utils/enums'

interface useCreateEventStatus {
  nextPage: () => void
  prevPage: () => void
  setCreatingNewEvent: (bool: boolean) => void
  setCurrentStep: (step: number) => void
  setErrorMsg: (errorStatus: CreateEventErrors) => void
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

  const setErrorMsg = (errorStatus: CreateEventErrors) => {
    switch (errorStatus) {
      case CreateEventErrors.emptyTitle:
        setStatus({
          ...currStatus,
          errorMsg: emptyTitleErrorMsg,
          errorField: ''
        })
        break
      case CreateEventErrors.invalidFileType:
        setStatus({
          ...currStatus,
          errorMsg: invalidFileTypeErrorMsg,
          errorField: eventTitleErrorField
        })
        break
      case CreateEventErrors.emptyImage:
        setStatus({
          ...currStatus,
          errorMsg: emptyImageErrorMsg,
          errorField: eventImageErrorField
        })
        break
      case CreateEventErrors.emptyEventLocation:
        setStatus({
          ...currStatus,
          errorMsg: emptyEventLocationErrorMsg,
          errorField: eventImageErrorField
        })
        break
      case CreateEventErrors.startDateBehind:
        setStatus({
          ...currStatus,
          errorMsg: startDateBehindErrorMsg,
          errorField: dateErrorField
        })
        break
      case CreateEventErrors.sameDatePeriod:
        setStatus({
          ...currStatus,
          errorMsg: sameDatePeriodErrorMsg,
          errorField: dateErrorField
        })
        break
      case CreateEventErrors.endDateBehind:
        setStatus({
          ...currStatus,
          errorMsg: endDateBehindErrorMsg,
          errorField: dateErrorField
        })
        break
      case CreateEventErrors.invalidNumber:
        setStatus({
          ...currStatus,
          errorMsg: invalidNumberErrorMsg,
          errorField: ticketErrorField
        })
        break
      case CreateEventErrors.lowCapNumber:
        setStatus({
          ...currStatus,
          errorMsg: lowCapNumberErrorMsg,
          errorField: ticketErrorField
        })
        break
      case CreateEventErrors.eventIdTaken:
        setStatus({
          ...currStatus,
          errorMsg: eventIdTakenErrorMsg,
          errorField: eventIDErrorField
        })
        break
      default:
        setStatus({
          ...currStatus,
          errorMsg: '',
          errorField: ''
        })
    }
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
