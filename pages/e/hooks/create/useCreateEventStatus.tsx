import { useState } from 'react'

interface createEventStatusInterface {
  startDatePickerVisible: boolean
  startTimePickerVisible: boolean
  endDatePickerVisible: boolean
  endTimePickerVisible: boolean
  ticketImgsMenuVisible: boolean
  landingImgsMenuVisible: boolean
  currentStep: number
  isCreatingNewEvent: boolean
  errorMsg: string
}

const initialCreateEventStatus: createEventStatusInterface = {
  startDatePickerVisible: false,
  startTimePickerVisible: false,
  endDatePickerVisible: false,
  endTimePickerVisible: false,
  ticketImgsMenuVisible: false,
  landingImgsMenuVisible: false,
  currentStep: 0,
  isCreatingNewEvent: false,
  errorMsg: ''
}

interface useCreateEventStatus {
  handleStatusChange: (name: string, status: boolean | number | string) => void
  nextPage: () => void
  prevPage: () => void
  togglePredefinedLandingImagesMenu: () => void
  togglePredefinedTicketImagesMenu: () => void
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

  const togglePredefinedLandingImagesMenu = () => {
    setStatus({
      ...currStatus,
      ticketImgsMenuVisible: !currStatus.landingImgsMenuVisible
    })
  }

  const togglePredefinedTicketImagesMenu = () => {
    setStatus({
      ...currStatus,
      landingImgsMenuVisible: !currStatus.ticketImgsMenuVisible
    })
  }

  return [
    currStatus,
    {
      handleStatusChange,
      nextPage,
      prevPage,
      togglePredefinedLandingImagesMenu,
      togglePredefinedTicketImagesMenu
    }
  ]
}
