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
  // nextPage: () => void
  // prevPage: () => void
  setCreatingNewEvent: (bool: boolean) => void
  setCurrentStep: (step: number) => void
  setErrorMsg: (errorStatus: CreateEventErrors) => void
  onFocus: (input: CreateEventInputs) => void
  onNextStep: () => void
  onPrevStep: () => void
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
        onFocusError(
          'event_name',
          CreateEventInputs.eventTitle,
          INPUT_FIELD.eventTitle,
          ERROR_MESSAGE.emptyField
        )
        break
      case CreateEventErrors.invalidFileType:
        onFocusError(
          'image_section',
          CreateEventInputs.images,
          INPUT_FIELD.eventImage,
          ERROR_MESSAGE.invalidFileType
        )
        break
      case CreateEventErrors.emptyImage:
        onFocusError(
          'image_section',
          CreateEventInputs.images,
          INPUT_FIELD.eventImage,
          ERROR_MESSAGE.emptyImage
        )
        break
      case CreateEventErrors.emptyEventLocation:
        console.log('setting empty event location error')
        onFocusError(
          'event_location',
          CreateEventInputs.location,
          INPUT_FIELD.eventLocation,
          ERROR_MESSAGE.emptyEventLocation
        )
        break
      case CreateEventErrors.startDateBehind:
        onFocusError(
          'event_date',
          CreateEventInputs.EventDate,
          INPUT_FIELD.date,
          ERROR_MESSAGE.startDateBehind
        )
        break
      case CreateEventErrors.sameDatePeriod:
        onFocusError(
          'event_date',
          CreateEventInputs.EventDate,
          INPUT_FIELD.date,
          ERROR_MESSAGE.sameDatePeriod
        )
        break
      case CreateEventErrors.endDateBehind:
        onFocusError(
          'event_date',
          CreateEventInputs.EventDate,
          INPUT_FIELD.date,
          ERROR_MESSAGE.endDateBehind
        )
        break
      case CreateEventErrors.invalidNumber:
        onFocusError(
          'event_ticket_max',
          CreateEventInputs.ticketMax,
          INPUT_FIELD.ticket,
          ERROR_MESSAGE.invalidNumber
        )
        break
      case CreateEventErrors.lowCapNumber:
        onFocusError(
          'event_ticket_max',
          CreateEventInputs.ticketMax,
          INPUT_FIELD.ticket,
          ERROR_MESSAGE.lowCapNumber
        )
        break
      case CreateEventErrors.eventIdTaken:
        onFocusError(
          'event_id',
          CreateEventInputs.eventId,
          INPUT_FIELD.eventID,
          ERROR_MESSAGE.eventIdTaken
        )
        break
      default:
        console.log('no error: ' + currStatus.focusedInputField.toString())
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
      inputFieldInstruction: inputFieldInstr,
      errorMsg: '',
      errorField: ''
    })
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      element.focus()
    }
  }

  const onFocusError = (
    eventID: string,
    selectedCreateEventInput: CreateEventInputs,
    errorField: string,
    errorMsg: string
  ) => {
    console.log('onFocusError log:')
    console.log(
      'eventID: ',
      eventID,
      ', selectedCreateEventInput: ',
      selectedCreateEventInput,
      ', errorField: ',
      errorField,
      ', errorMsg: ',
      errorMsg
    )
    const element = document.getElementById(eventID)

    setStatus({
      ...currStatus,
      focusedInputField: selectedCreateEventInput,
      errorMsg: errorMsg,
      errorField: errorField,
      isCreatingNewEvent: false
    })
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      element.focus()
    }
  }

  const onFocus = (element: CreateEventInputs) => {
    setStatus({
      ...currStatus,
      errorMsg: '',
      errorField: ''
    })
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
      case CreateEventInputs.eventTags:
        focusInput(
          'event_tags',
          CreateEventInputs.eventTags,
          'Tags (Optional)',
          'Please enter any tags for your event, separated with a comma'
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
          'image_section',
          CreateEventInputs.images,
          INPUT_FIELD.eventImage,
          CREATE_EVENT_INSTRUCTIONS.eventImageInstr
        )
        break
      // add a like a assure question here, but for now it's
      //just a reset.
    }
  }

  const onPrevStep = () => {
    setStatus({
      ...currStatus,
      errorMsg: '',
      errorField: ''
    })
    console.log('previous step from:' + currStatus.focusedInputField.toString())
    switch (currStatus.focusedInputField) {
      case CreateEventInputs.eventTitle:
        //nothing goes here
        break
      case CreateEventInputs.eventId:
        focusInput(
          'event_name',
          CreateEventInputs.eventTitle,
          INPUT_FIELD.eventTitle,
          CREATE_EVENT_INSTRUCTIONS.eventTitleInstr
        )
        break
      case CreateEventInputs.location:
        focusInput(
          'event_id',
          CreateEventInputs.eventId,
          INPUT_FIELD.eventID,
          CREATE_EVENT_INSTRUCTIONS.eventIDInstr
        )
        break
      case CreateEventInputs.EventDate:
        focusInput(
          'event_location',
          CreateEventInputs.location,
          INPUT_FIELD.eventLocation,
          CREATE_EVENT_INSTRUCTIONS.eventLocationInstr
        )
        break
      case CreateEventInputs.eventDescription:
        focusInput(
          'event_date',
          CreateEventInputs.EventDate,
          INPUT_FIELD.date,
          CREATE_EVENT_INSTRUCTIONS.dateInstr
        )
        break

      case CreateEventInputs.eventTags:
        focusInput(
          'event_description',
          CreateEventInputs.eventDescription,
          'Event Description (Optional)',
          'Please enter a description about your event'
        )
        break

      case CreateEventInputs.ticketMax:
        focusInput(
          'event_tags',
          CreateEventInputs.eventTags,
          'Tags (Optional)',
          'Please enter any tags for your event, separated with a comma'
        )

        break
      case CreateEventInputs.images:
        focusInput(
          'event_ticket_max',
          CreateEventInputs.ticketMax,
          INPUT_FIELD.ticket,
          CREATE_EVENT_INSTRUCTIONS.ticketInstr
        )
        break
    }
  }

  const onNextStep = () => {
    setStatus({
      ...currStatus,
      errorMsg: '',
      errorField: ''
    })
    console.log('next step from:' + currStatus.focusedInputField.toString())
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
          'event_tags',
          CreateEventInputs.eventTags,
          'Tags (Optional)',
          'Please enter any tags for your event, separated with a comma'
        )

        break
      case CreateEventInputs.eventTags:
        focusInput(
          'event_ticket_max',
          CreateEventInputs.ticketMax,
          INPUT_FIELD.ticket,
          CREATE_EVENT_INSTRUCTIONS.ticketInstr
        )
        break
      case CreateEventInputs.ticketMax:
        focusInput(
          'image_section',
          CreateEventInputs.images,
          INPUT_FIELD.eventImage,
          CREATE_EVENT_INSTRUCTIONS.eventImageInstr
        )
        break
      case CreateEventInputs.images:
        //null here, there's nothing after images section.
        break
    }
  }

  return [
    currStatus,
    {
      // nextPage,
      // prevPage,
      setCreatingNewEvent,
      setErrorMsg,
      setCurrentStep,
      onNextStep,
      onPrevStep,
      onFocus
    }
  ]
}
