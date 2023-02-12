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
  onFocus: (input: CreateEventInputs) => void
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

  //

  const focusInput = (
    eventID: string,
    selectedCreateEventInput: CreateEventInputs,
    inputFieldName: string,
    inputFieldInstr: string
  ) => {
    const element = document.getElementById(eventID)

    setStatus({
      ...currStatus,
      focusedInputField: selectedCreateEventInput,
      inputFieldName: inputFieldName,
      inputFieldInstruction: inputFieldInstr
    })
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      element.focus()
    }
  }

  const onFocus = (element: CreateEventInputs) => {
    switch (element) {
      case CreateEventInputs.eventTitle:
        focusInput(
          'event_name',
          CreateEventInputs.eventTitle,
          INPUT_FIELD.eventTitle,
          CREATE_EVENT_INSTRUCTIONS.eventTitleInstr
        )
        break
      case CreateEventInputs.eventId:
        focusInput(
          'event_id',
          CreateEventInputs.eventId,
          INPUT_FIELD.eventID,
          CREATE_EVENT_INSTRUCTIONS.eventIDInstr
        )
        break
      case CreateEventInputs.location:
        focusInput(
          'event_location',
          CreateEventInputs.location,
          INPUT_FIELD.eventLocation,
          CREATE_EVENT_INSTRUCTIONS.eventLocationInstr
        )
        break
      case CreateEventInputs.EventDate:
        focusInput(
          'event_date',
          CreateEventInputs.EventDate,
          INPUT_FIELD.date,
          CREATE_EVENT_INSTRUCTIONS.dateInstr
        )
        break
      case CreateEventInputs.eventDescription:
        focusInput(
          'event_description',
          CreateEventInputs.eventDescription,
          'Event Description (Optional)',
          'Please enter a description about your event'
        )
        break
      case CreateEventInputs.ticketMax:
        focusInput(
          'event_ticket_max',
          CreateEventInputs.ticketMax,
          INPUT_FIELD.ticket,
          CREATE_EVENT_INSTRUCTIONS.ticketInstr
        )
        break
      case CreateEventInputs.images:
        focusInput(
          'image_inputs',
          CreateEventInputs.images,
          INPUT_FIELD.eventImage,
          CREATE_EVENT_INSTRUCTIONS.eventImageInstr
        )
        break
      // add a like a assure question here, but for now it's
      //just a reset.
    }
  }

  const onNextStep = () => {
    switch (currStatus.focusedInputField) {
      case CreateEventInputs.eventTitle:
        focusInput(
          'event_id',
          CreateEventInputs.eventId,
          INPUT_FIELD.eventID,
          CREATE_EVENT_INSTRUCTIONS.eventIDInstr
        )
        break
      case CreateEventInputs.eventId:
        focusInput(
          'event_location',
          CreateEventInputs.location,
          INPUT_FIELD.eventLocation,
          CREATE_EVENT_INSTRUCTIONS.eventLocationInstr
        )
        break
      case CreateEventInputs.location:
        focusInput(
          'event_date',
          CreateEventInputs.EventDate,
          INPUT_FIELD.date,
          CREATE_EVENT_INSTRUCTIONS.dateInstr
        )
        break
      case CreateEventInputs.EventDate:
        focusInput(
          'event_description',
          CreateEventInputs.eventDescription,
          'Event Description (Optional)',
          'Please enter a description about your event'
        )
        break
      case CreateEventInputs.eventDescription:
        focusInput(
          'event_ticket_max',
          CreateEventInputs.ticketMax,
          INPUT_FIELD.ticket,
          CREATE_EVENT_INSTRUCTIONS.ticketInstr
        )
        break
      case CreateEventInputs.ticketMax:
        focusInput(
          'image_inputs',
          CreateEventInputs.images,
          INPUT_FIELD.eventImage,
          CREATE_EVENT_INSTRUCTIONS.eventImageInstr
        )
        break
      case CreateEventInputs.images:
        // add a like a assure question here, but for now it's
        //just a reset.
        focusInput(
          'event_name',
          CreateEventInputs.eventTitle,
          INPUT_FIELD.eventTitle,
          CREATE_EVENT_INSTRUCTIONS.eventTitleInstr
        )
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
      onNextStep,
      onFocus
    }
  ]
}
