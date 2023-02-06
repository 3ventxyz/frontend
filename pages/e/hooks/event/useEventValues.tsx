import { useState } from 'react'

interface eventValuesInterface {
  comment: string
  registeredUserData: any
}

interface useEventValuesProps {
  setComment: (comment: string) => void
  setRegisteredUserData: (registeredUserData: any) => void
}

// values that are used for upload and can
// be changed. like the registering form and event posts.
export function useEventValues(
  initialState: eventValuesInterface
): [eventValuesInterface, useEventValuesProps] {
  const [currValues, setValues] = useState<eventValuesInterface>(initialState)

  // this data is used for uploading, so this is fine to have it here.
  //used for uploading a new post comment to the event page.
  const [comment, setComment] = useState<string>('')
  //used for uploading a new registered attendee to firebase.
  const [registeredUserData, setRegisteredUserData] = useState<any>()

  return [currValues, { setComment, setRegisteredUserData }]
}
