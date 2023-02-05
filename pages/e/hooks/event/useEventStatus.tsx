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

  //   breakpoint.
  //   qrCodeImgUrl: string
}

interface useEventStatusProps {
  setShowModal: (bool: boolean) => void
  setShowQrCodeModal: (bool: boolean) => void
  setIsEventCreator: (bool: boolean) => void
  setEventPageStatus: (eventPageStatus: EventPageEnum) => void
  onCloseFrom: (bool: boolean) => void
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

  const [showModal, setShowModal] = useState(false)
  const [showQrCodeModal, setShowQrCodeModal] = useState(false)
  const [isEventCreator, setIsEventCreator] = useState(false)

  const [eventPageStatus, setEventPageStatus] = useState<EventPageEnum>(
    EventPageEnum.fetchingData
  )

  const onCloseFrom = (bool: boolean) => {}
  const onCloseAllAttendees = (bool: boolean) => {}
  const onCloseAllComments = (bool: boolean) => {}

  const [isQRCodeFetched, setIsQRCodeFetched] = useState<boolean>(false)
  const [isFetchingAttendees, setIsFetchingAttendees] = useState(true)

  const [isFetchingPosts, setIsFetchingPosts] = useState(true)
  const [registerPage, setRegisterPage] = useState<RegisterComponentEnum>(
    RegisterComponentEnum.registerEvent
  )

  const [isDatabaseChecked, setIsDatabaseChecked] = useState(false)

  //   TODO: think were to put these later.
  //   const [posts, setPosts] = useState<Array<PostInterface>>()
  //   const [attendees, setRegisteredAttendees] = useState<Array<UserInterface>>()
  const [qrCodeImgUrl, setQrCodeImgUrl] = useState()
  const [comment, setComment] = useState<string>('')
  const [registeredUserData, setRegisteredUserData] = useState<any>()

  return [
    currStatus,
    {
      setShowModal,
      setShowQrCodeModal,
      setIsEventCreator,
      setEventPageStatus,
      onCloseFrom,
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
