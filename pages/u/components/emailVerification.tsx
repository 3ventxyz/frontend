import { useEffect, useState } from 'react'
import { db } from '../../../services/firebase_config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../../../contexts/auth'
import { Button } from '../../../components/buttons/button'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { auth } from '../../../services/firebase_config'
import { useRouter } from 'next/router'
import absoluteUrl from 'next-absolute-url'
import { TextInputDisplay } from '../../../components/inputs/textInputDisplay'
import { TextInput } from '../../../components/inputs/textInput'

export default function EmailVerification() {
  const [email, setEmail] = useState('')
  const [verifiedEmail, setVerifiedEmail] = useState(false)
  const getUser = useAuth()
  const uid = getUser?.uid
  const { asPath } = useRouter()
  const { origin } = absoluteUrl()
  const router = useRouter()
  const [changeEmail, setChangeEmail] = useState(false)
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
  const saveEmail = async () => {
    try {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        if (docSnap.data().email !== email) {
          updateDoc(docRef, {
            email_verified: false
          })
        }
      } else {
        console.log('No such document!')
      }
      await updateDoc(docRef, {
        email: email
      })
      setChangeEmail(false)
      console.log('Data written into doc ID: ', docRef.id)
      return true
    } catch (e) {
      console.error('Error adding data: ', e)
    }
  }

  const discardEmail = async () => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setEmail(docSnap.data().email)
    } else {
      console.log('No such document!')
    }
    setChangeEmail(false)
  }

  const verifyEmail = async () => {
    try {
      sendSignInLinkToEmail(auth, email, actionCodeSettings)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {changeEmail ? (
        <div className="flex w-full flex-col items-start space-y-1 text-[16px] font-semibold">
          <p>Email</p>
          <TextInput
            labelText=""
            id="email"
            placeholder={email}
            width={'w-full'}
            textArea={false}
            setValue={setEmail}
          />
          <div className="mt-2 space-x-2">
            <Button
              text={'Save'}
              onClick={() => {
                saveEmail()
              }}
              active={true}
            />
            <Button
              text={'Discard'}
              onClick={() => {
                discardEmail()
              }}
              active={true}
            />
          </div>
        </div>
      ) : (
        <div>
          <TextInputDisplay
            labelText={'Email'}
            bodyText={email || 'no email connected'}
          />
          <div className="mt-2 space-x-2">
            {verifiedEmail ? (
              <Button
                text={'Email verified'}
                onClick={() => {}}
                active={false}
              />
            ) : (
              <Button
                text={'Verify email'}
                onClick={() => {
                  verifyEmail()
                }}
                active={true}
              />
            )}
            <Button
              text={'Add/Change email'}
              onClick={() => {
                setChangeEmail(true)
              }}
              active={true}
            />
          </div>
        </div>
      )}
    </>
  )
}
