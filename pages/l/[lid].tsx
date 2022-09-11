import { collection } from '@firebase/firestore'
import { useState } from 'react'
import { db } from '../../services/firebase_config'
import { AllowlistInterface } from '../../shared/interface/common'

export default function Allowlist() {
  const [allowlist, setAllowlist] = useState<AllowlistInterface | null>(null)
  const [lists, setLists] = useState([])
  const listCollectionRef = collection(db, 'lists')

  return <div className="flex flex-col"></div>
}
