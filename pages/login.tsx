import React, { FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/auth'
import Button from '../components/button'
import { signInWithPhoneNumber, RecaptchaVerifier } from '@firebase/auth'
import { doc, setDoc, getDoc } from '@firebase/firestore'
import { auth, db } from '../services/firebase_config'
import ReactCodeInput from 'react-code-input'
import PhoneInput from 'react-phone-number-input'
import { UserModel } from '../shared/interface/common'

export default function Login() {
  const [confirmationCode, setConfirmationCode] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')
  const [onlyOnce, setOnlyOnce] = useState(false)
  const [confirmation, setConfirmation] = useState(() => (code: string) => {
    console.log(code)
  })
  const router = useRouter()
  const authContext = useAuth()
  const [phoneNumber, setPhoneNumber] = useState<any>('')

  // configure recaptcha
  useEffect(() => {
    const run = () => {
      ;(window as any).recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha',
        { size: 'invisible' },
        auth
      )
      setOnlyOnce(true)
    }
    if (onlyOnce === false) {
      run()
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // declare phonenumber and appverifier
    if (phoneNumber === '') return
    const appVerifier = (window as any).recaptchaVerifier
    try {
      setError('')
      setLoading(true)
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // ROUTES USER TO CONFIRMATION UI
          // SETS UP CALLBACK FOR CONFIRMATION CODE
          setShowConfirmation(true)
          setConfirmation(() => (code: string) => {
            confirmationResult
              .confirm(code)
              .then(async (result) => {
                // FIREBASE AND GLOBAL STATE
                // check for user existance in db
                console.log('USER ID:', result.user.uid)
                const userRef = doc(db, 'users', result.user.uid)
                const docSnap = await getDoc(userRef)

                // create new user document if sign up
                if (!docSnap.exists()) {
                  const userObject = {
                    phone_number: phoneNumber,
                    organizations: [],
                    discord_id: '',
                    discord_verified: false,
                    discord_guilds: [],
                    twitter_id: '',
                    twitter_verified: false,
                    wallet: '',
                    siwe_expiration_time: ''
                  }
                  await setDoc(doc(db, 'users', result.user.uid), userObject)
                  const userModel: UserModel = {
                    phone_number: phoneNumber,
                    discord_id: '',
                    discord_verified: false,
                    twitter_id: '',
                    twitter_verified: false,
                    wallet: '',
                    siwe_expiration_time: ''
                  }
                  authContext.setUserModel(userModel)
                } else {
                  const userDocRef = doc(db, 'users', result.user.uid)
                  const userDocSnap = await getDoc(userDocRef)
                  const data = userDocSnap.data()
                  const userModel: UserModel = {
                    phone_number: data?.phone_number,
                    discord_id: data?.discord_id,
                    discord_verified: data?.discord_verified,
                    twitter_id: data?.twitter_id,
                    twitter_verified: data?.twitter_verified,
                    wallet: data?.wallet,
                    siwe_expiration_time: data?.siwe_expiration_time
                  }
                  authContext.setUserModel(userModel)
                }
                router.push('/u')
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
            <h3 className="mb-2 w-full text-center text-[32px]">Woohoo!</h3>
            <p className="p2 max-w-[240px] text-center text-primary">
              Enter your number to get
              <br />
              this party started 🎉
            </p>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-y-6"
          >
            {/* phone input */}
            <div className="mx-auto flex w-full flex-col items-start space-y-1 text-[16px] font-normal">
              <label htmlFor={'phone'}>Phone Number</label>
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="US"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </div>
            <Button
              text="Submit"
              id="recaptcha"
              active={!loading}
              onClick={() => {
                return
              }}
              type="submit"
              isExpanded={true}
              auth={true}
            />
          </form>
        </div>
      ) : (
        <div className="p-auto flex max-w-[343px] flex-grow flex-col items-center justify-center gap-y-6">
          <div className="flex w-full flex-col items-center">
            <h3 className="mb-2 w-full text-center text-[32px]">
              Confirmation
            </h3>
            <p className="p2 max-w-[240px] text-center text-primary">
              Enter your 6 digit code
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <ReactCodeInput
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e)}
              className="bg-transparent"
              type="text"
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
              text="Confirm"
            />
          </div>
        </div>
      )}
    </div>
  )
}
