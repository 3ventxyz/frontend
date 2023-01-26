import { useState } from 'react'
import { createEventStatusInterface } from '../../../../shared/interface/common'
import { ERROR_MESSAGE, ERROR_FIELD } from '../../../../shared/consts/consts'
import { CreateEventErrors } from '../../../../shared/enums/enums'

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
          errorMsg: ERROR_MESSAGE.emptyField,
          errorField: ERROR_FIELD.eventTitle
        })
        break
      case CreateEventErrors.invalidFileType:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.invalidFileType,
          errorField: ERROR_FIELD.eventImage
        })
        break
      case CreateEventErrors.emptyImage:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.emptyImage,
          errorField: ERROR_FIELD.eventImage
        })
        break
      case CreateEventErrors.emptyEventLocation:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.emptyEventLocation,
          errorField: ERROR_FIELD.eventLocation
        })
        break
      case CreateEventErrors.startDateBehind:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.startDateBehind,
          errorField: ERROR_FIELD.date
        })
        break
      case CreateEventErrors.sameDatePeriod:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.sameDatePeriod,
          errorField: ERROR_FIELD.date
        })
        break
      case CreateEventErrors.endDateBehind:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.endDateBehind,
          errorField: ERROR_FIELD.date
        })
        break
      case CreateEventErrors.invalidNumber:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.invalidNumber,
          errorField: ERROR_FIELD.ticket
        })
        break
      case CreateEventErrors.lowCapNumber:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.lowCapNumber,
          errorField: ERROR_FIELD.ticket
        })
        break
      case CreateEventErrors.eventIdTaken:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.eventIdTaken,
          errorField: ERROR_FIELD.eventID
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
