import { useState } from 'react'
import { AllowlistInterface } from '../../shared/interface/common'

export default function Allowlist() {
  const [allowlist, setAllowlist] = useState<AllowlistInterface | null>(null)
  return <div className="flex flex-col"></div>
}
