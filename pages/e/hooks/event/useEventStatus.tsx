import { useState } from 'react'

interface eventStatusInterface {
  variable: string
}

interface useEventStatusProps {
  funct: () => void
}

export function useEventStatus(
  initialState: eventStatusInterface
): [eventStatusInterface, useEventStatusProps] {
  const [currStatus, setStatus] = useState<eventStatusInterface>(initialState)

  const funct = () => {}
  return [currStatus, { funct }]
}
