import React, { FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import { useAuth } from '../../contexts/auth'
import Button from '../../components/button'
import AuthInput from '../../components/inputs/authInput'
import ButtonOutlined from '../../components/buttonOutlined'
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from '@firebase/auth'
import { doc, setDoc, getDoc } from '@firebase/firestore'
import { auth, db } from '../../services/firebase_config'
import Link from 'next/link'
import ReactCodeInput from 'react-code-input'
// import PhoneInput from 'react-phone-number-input/input'

export default function Login() {
  const [confirmationCode, setConfirmationCode] = useState('')
  const [showError, setShowError] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmation, setConfirmation] = useState(() => (code: string) => {
    console.log(code)
  })
  const appVerifier = (window as any).recaptchaVerifier

  const phoneRef = React.createRef<HTMLInputElement>()
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    ;(window as any).recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' },
      auth
    )
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const phoneNumber = phoneRef.current?.value || ''
    console.log('phoneNumber', phoneNumber)

    try {
      setError('')
      setLoading(true)
      if (phoneNumber === '' || phoneNumber.length < 10) return
      //   const auth = getAuth()
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setShowConfirmation(true)
          setConfirmation(() => (code: string) => {
            confirmationResult
              .confirm(code)
              .then(async (result) => {
                // check for user existance in db
                const userRef = doc(db, 'users', result.user.uid)
                const docSnap = await getDoc(userRef)

                // create new user document if sign up
                if (!docSnap.exists()) {
                  const userObject = {
                    phone_number: phoneNumber
                  }
                  setDoc(userRef, userObject)
                }
                // store user record in global state
                // setUser(result.user.uid)
              })
              .catch((error) => {
                console.log('error', error)
                setConfirmationCode('')
                setShowConfirmation(false)
                setShowError(true)
                setLoading(false)
              })
          })
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
      console.log('log in success')
      //   router.push('/mint')
    } catch {
      setError('Failed to log in')
      console.log('log in error')
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-grow items-center justify-center bg-secondaryBg py-[40px] px-[20px] sm:px-[56px] md:px-[112px]">
      {!showConfirmation ? (
        <div className="p-auto flex max-w-[343px] flex-grow flex-col items-center gap-y-6">
          <div className="flex w-full flex-col items-center">
            <h3 className="mb-2 w-full text-center text-[32px]">
              Welcome Back!
            </h3>
            <p className="p2 max-w-[240px] text-center text-primary">
              Login to your account to get this party started 🎉
            </p>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-y-6"
          >
            {/* phone input */}
            <AuthInput
              id="phone"
              type="phone"
              labelText="Phone Number"
              inputRef={phoneRef}
              placeholder="(555)-123-4567"
              icon="assets/auth/atSign.svg"
            />
            <Button
              id="recaptcha-container"
              text="Login"
              active={!loading}
              onClick={() => null}
              type="submit"
              isExpanded={true}
            />
          </form>
        </div>
      ) : (
        <div className="p-auto flex max-w-[343px] flex-grow flex-col items-center gap-y-6">
          <div className="flex w-full flex-col items-center">
            <h3 className="mb-2 w-full text-center text-[32px]">
              CONFIRMATION HEADER
            </h3>
            <p className="p2 max-w-[240px] text-center text-primary">
              CONFIRMATION COPY
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <ReactCodeInput
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e)}
              className="bg-transparent"
              type="number"
              fields={6}
              name={'code'}
              inputMode={'numeric'}
              inputStyle={{
                margin: '4px',
                width: '46px',
                borderRadius: '15px',
                fontSize: '24px',
                height: '56px',
                paddingLeft: '16px',
                border: '1px solid black',
                background: 'transparent'
              }}
            />
            <Button
              onClick={() => confirmation(confirmationCode)}
              active={!(confirmationCode.length !== 6)}
              text="INPUT CONFIRMATION CODE"
            />
          </div>
        </div>
      )}
    </div>
  )
}
