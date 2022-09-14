import { useEffect, useState } from 'react'
import { db } from '../../../services/firebase_config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../../../contexts/auth'
import Button from '../../../components/button'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { auth } from '../../../services/firebase_config'
import { useRouter } from 'next/router'
import absoluteUrl from 'next-absolute-url'

export default function EmailVerification() {
  const [email, setEmail] = useState('')
  const [verifiedEmail, setVerifiedEmail] = useState(false)
  const getUser = useAuth()
  const uid = getUser?.uid
  const { asPath } = useRouter()
  const { origin } = absoluteUrl()
  const router = useRouter()

  const fullUrl = `${origin}${router.pathname}`

  useEffect(() => {
    const getInfo = async () => {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setEmail(docSnap.data().email)
        setVerifiedEmail(docSnap.data().email_verified)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }

    const verifyEmail = async () => {
      const docRef = doc(db, 'users', uid)
      const pathParts = asPath.split('Code=')
      let hash = ''
      if (pathParts.length >= 2) {
        hash = await pathParts.slice(-1)[0]
        if (hash != '') {
          try {
            await updateDoc(docRef, {
              email_verified: true
            })
            console.log('Data written into doc ID: ', docRef.id)
            console.log()
            return true
          } catch (e) {
            console.error('Error adding data: ', e)
          }
        }
      }
    }

    getInfo()
    verifyEmail()
  }, [])

  const actionCodeSettings = {
    url: fullUrl,
    handleCodeInApp: true
  }

  const verifyEmail = async () => {
    try {
      sendSignInLinkToEmail(auth, email, actionCodeSettings)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-between">
      <p className="p-1 text-secondary">{email}</p>
      {
        verifiedEmail ? 
        <Button
        text={'Verified'}
        onClick={() => {
          
        }}
        active={false}
      /> :
        <Button
        text={'Verify'}
        onClick={() => {
          verifyEmail()
        }}
        active={true}
      /> 
      }
    </div>
  )
}
