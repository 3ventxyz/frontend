import { useState } from 'react'
import { createEventStatusInterface } from '../../../../shared/interface/common'
import {
  CREATE_EVENT_INSTRUCTIONS,
  ERROR_MESSAGE,
  INPUT_FIELD
} from '../../../../shared/consts/consts'
import {
  CreateEventErrors,
  CreateEventInputs
} from '../../../../shared/enums/enums'

interface useCreateEventStatus {
  nextPage: () => void
  prevPage: () => void
  setCreatingNewEvent: (bool: boolean) => void
  setCurrentStep: (step: number) => void
  setErrorMsg: (errorStatus: CreateEventErrors) => void
  onNextStep: () => void
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
          errorField: INPUT_FIELD.eventTitle
        })
        break
      case CreateEventErrors.invalidFileType:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.invalidFileType,
          errorField: INPUT_FIELD.eventImage
        })
        break
      case CreateEventErrors.emptyImage:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.emptyImage,
          errorField: INPUT_FIELD.eventImage
        })
        break
      case CreateEventErrors.emptyEventLocation:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.emptyEventLocation,
          errorField: INPUT_FIELD.eventLocation
        })
        break
      case CreateEventErrors.startDateBehind:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.startDateBehind,
          errorField: INPUT_FIELD.date
        })
        break
      case CreateEventErrors.sameDatePeriod:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.sameDatePeriod,
          errorField: INPUT_FIELD.date
        })
        break
      case CreateEventErrors.endDateBehind:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.endDateBehind,
          errorField: INPUT_FIELD.date
        })
        break
      case CreateEventErrors.invalidNumber:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.invalidNumber,
          errorField: INPUT_FIELD.ticket
        })
        break
      case CreateEventErrors.lowCapNumber:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.lowCapNumber,
          errorField: INPUT_FIELD.ticket
        })
        break
      case CreateEventErrors.eventIdTaken:
        setStatus({
          ...currStatus,
          errorMsg: ERROR_MESSAGE.eventIdTaken,
          errorField: INPUT_FIELD.eventID
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

  const focusInput = (eventID: string) => {
    const element = document.getElementById(eventID)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      element.focus()
    }
  }

  const onNextStep = () => {
    switch (currStatus.focusedInputField) {
      case CreateEventInputs.eventTitle:
        //todo move each setStatus to inside focus input.
        setStatus({
          ...currStatus,
          focusedInputField: CreateEventInputs.eventId,
          inputFieldName: INPUT_FIELD.eventID,
          inputFieldInstruction: CREATE_EVENT_INSTRUCTIONS.eventIDInstr
        })
        focusInput('event_id')
        break
      case CreateEventInputs.eventId:
        setStatus({
          ...currStatus,
          focusedInputField: CreateEventInputs.location,
          inputFieldName: INPUT_FIELD.eventLocation,
          inputFieldInstruction: CREATE_EVENT_INSTRUCTIONS.eventLocationInstr
        })
        focusInput('event_location')
        break
      case CreateEventInputs.location:
        setStatus({
          ...currStatus,
          focusedInputField: CreateEventInputs.EventDate,
          inputFieldName: INPUT_FIELD.date,
          inputFieldInstruction: CREATE_EVENT_INSTRUCTIONS.dateInstr
        })
        //todo create an id for the date area so it can be
        //focused.
        // focusInput('event_location')
        break
      case CreateEventInputs.EventDate:
        setStatus({
          ...currStatus,
          focusedInputField: CreateEventInputs.eventDescription,
          inputFieldName: 'Event Description (Optional)',
          inputFieldInstruction: 'Please enter a description about your event'
        })
        focusInput('event_description')
        break
      case CreateEventInputs.eventDescription:
        setStatus({
          ...currStatus,
          focusedInputField: CreateEventInputs.ticketMax,
          inputFieldName: INPUT_FIELD.ticket,
          inputFieldInstruction: CREATE_EVENT_INSTRUCTIONS.ticketInstr
        })
        focusInput('event_ticket_max')
        break
      case CreateEventInputs.ticketMax:
        setStatus({
          ...currStatus,
          focusedInputField: CreateEventInputs.images,
          inputFieldName: INPUT_FIELD.eventImage,
          inputFieldInstruction: CREATE_EVENT_INSTRUCTIONS.eventImageInstr
        })
        //this should be focus on the image inputs.
        // focusInput('event_ticket_max')
        break
      case CreateEventInputs.images:
        // add a like a assure question here, but for now it's
        //just a reset.
        setStatus({
          ...currStatus,
          focusedInputField: CreateEventInputs.eventTitle,
          inputFieldName: INPUT_FIELD.eventTitle,
          inputFieldInstruction: CREATE_EVENT_INSTRUCTIONS.eventTitleInstr
        })
        focusInput('event_name')
        break
    }
  }

  return [
    currStatus,
    {
      nextPage,
      prevPage,
      setCreatingNewEvent,
      setErrorMsg,
      setCurrentStep,
      onNextStep
    }
  ]
}
