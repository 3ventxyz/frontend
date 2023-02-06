import { useState } from 'react'

enum EventPageEnum {
  fetchingData,
  fetchedData,
  purchasedTicket
}

enum RegisterComponentEnum {
  registerEvent,
  confirmuserInfo,
  registeringUser,
  userRegistered
}

interface eventStatusInterface {
  showModal: boolean
  showQrCodeModal: boolean
  isEventCreator: boolean
  eventPageStatus: EventPageEnum
  isQRCodeFetched: boolean
  isFetchingAttendees: boolean
  isFetchingPosts: boolean
  registerPage: RegisterComponentEnum
  isDatabaseChecked: boolean
  requestingRegistration: boolean
}

interface useEventStatusProps {
  setShowModal: (bool: boolean) => void
  setShowQrCodeModal: (bool: boolean) => void
  setIsEventCreator: (bool: boolean) => void
  setEventPageStatus: (eventPageStatus: EventPageEnum) => void
  onCloseForm: (bool: boolean) => void
  onCloseAllAttendees: (bool: boolean) => void
  onCloseAllComments: (bool: boolean) => void
  setIsQRCodeFetched: (bool: boolean) => void
  setIsFetchingAttendees: (bool: boolean) => void
  setIsFetchingPosts: (bool: boolean) => void
  setRegisterPage: (registerPage: RegisterComponentEnum) => void
  setIsDatabaseChecked: (bool: boolean) => void
}

export function useEventStatus(
  initialState: eventStatusInterface
): [eventStatusInterface, useEventStatusProps] {
  const [currStatus, setStatus] = useState<eventStatusInterface>(initialState)
  const setShowModal = (bool: boolean) => {
    setStatus({ ...currStatus, showModal: bool })
  }

  const setShowQrCodeModal = (bool: boolean) => {
    setStatus({ ...currStatus, showQrCodeModal: bool })
  }

  const setIsEventCreator = (bool: boolean) => {
    setStatus({ ...currStatus, isEventCreator: bool })
  }

  const setEventPageStatus = (currEventPage: EventPageEnum) => {
    setStatus({ ...currStatus, eventPageStatus: currEventPage })
  }

  const onCloseForm = (bool: boolean) => {}
  const onCloseAllAttendees = (bool: boolean) => {}
  const onCloseAllComments = (bool: boolean) => {}

  const setIsQRCodeFetched = (bool: boolean) => {
    setStatus({ ...currStatus, isQRCodeFetched: bool })
  }

  const setIsFetchingAttendees = (bool: boolean) => {
    setStatus({ ...currStatus, isFetchingAttendees: bool })
  }

  const setIsFetchingPosts = (bool: boolean) => {
    setStatus({ ...currStatus, isFetchingPosts: bool })
  }

  const setRegisterPage = (currRegisterPage: RegisterComponentEnum) => {
    setStatus({ ...currStatus, registerPage: currRegisterPage })
  }

  const setIsDatabaseChecked = (bool: boolean) => {
    setStatus({ ...currStatus, isDatabaseChecked: bool })
  }

  const setRequestingRegistration = (bool: boolean) => {
    setStatus({ ...currStatus, requestingRegistration: bool })
  }

  return [
    currStatus,
    {
      setShowModal,
      setShowQrCodeModal,
      setIsEventCreator,
      setEventPageStatus,
      onCloseForm,
      onCloseAllAttendees,
      onCloseAllComments,
      setIsQRCodeFetched,
      setIsFetchingAttendees,
      setIsFetchingPosts,
      setRegisterPage,
      setIsDatabaseChecked
    }
  ]
}
