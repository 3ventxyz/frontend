import { useState } from 'react'

interface eventValuesInterface {
  variable: string
}

interface useEventValuesProps {
  funct: () => void
}

export function useEventStatus(
  initialState: eventValuesInterface
): [eventValuesInterface, useEventValuesProps] {
  const [currStatus, setStatus] = useState<eventValuesInterface>(initialState)

  const funct = () => {}
  return [currStatus, { funct }]
}
