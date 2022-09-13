import { useEffect, useState } from 'react'
import { db } from '../../../services/firebase_config'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../../../contexts/auth'
import Button from '../../../components/button'

export default function EmailVerification() {
  const [email, setEmail] = useState('')

  const auth = useAuth()
  const uid = auth?.uid

  return (
    <div className="flex justify-between">
      <p className="p-1 text-secondary">{email}</p>
      {/* TODO - Change button when verified */}
      <Button
        text={'Verify'}
        onClick={() => {
          console.log('verifying')
        }}
        active={true}
      />
    </div>
  )
}
