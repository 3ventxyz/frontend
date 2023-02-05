import { useState } from 'react'

interface eventValuesInterface {
  variable: string
}

interface useEventValuesProps {
  setFunct: () => void
  
}

// values that are used for upload and can
// be changed. like the registering form and event posts.
export function useEventValues(
  initialState: eventValuesInterface
): [eventValuesInterface, useEventValuesProps] {
  const [currValues, setValues] = useState<eventValuesInterface>(initialState)

  const setFunct = () => {}	
  return [currValues, { setFunct }]
}
