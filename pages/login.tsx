import React, { FormEvent, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/auth'
import { Button } from '../components/buttons/button'
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  UserCredential
} from '@firebase/auth'
import { Spinner } from '../components/utils/spinner'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'
import { doc, setDoc, getDoc, updateDoc } from '@firebase/firestore'
import { auth, db } from '../services/firebase_config'
import ReactCodeInput from 'react-code-input'
import PhoneInput from 'react-phone-number-input'
import { UserModel } from '../shared/interface/common'
import { uploadQRImage } from '../services/upload_qr_image'

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
  const [userId, setUserId] = useState<any>('')
  const [qrCode, setQrCodeImg] = useState<any>()
  const isEnvDev = process.env.NODE_ENV === 'development'
  const [emulatorLoginError, setEmulatorLoginError] = useState(false)

  useEffect(() => {
    // Dynamically import qr-code-styling only client-side
    if (typeof window !== 'undefined') {
      import('qr-code-styling').then(({ default: QRCodeStyling }) => {
        const qrCode = new QRCodeStyling({
          width: 300,
          height: 300,
          image: 'assets/logo-icon.svg',
          data: `https://www.3vent.xyz/u/${userId}`,
          type: 'canvas',
          dotsOptions: { color: '#000000' },
          margin: 20
        })
        setQrCodeImg(qrCode)
      })
    }
  }, [userId])

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
    if (onlyOnce === false && !isEnvDev) {
      run()
    }
  }, [])

  useEffect(() => {
    const emulatorSignUp = async () => {
      try {
        const result: UserCredential = await signInWithEmailAndPassword(
          auth,
          'test123@gmail.com',
          '1234567890'
        )
        console.log('user id:', result.user.uid)
        setUserId(result.user.uid)
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
        router.push('/u')
      } catch (error) {
        alert(error)
        console.error(error)
        setEmulatorLoginError(true)
      }
    }
    if (isEnvDev) {
      emulatorSignUp()
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
                setUserId(result.user.uid)
                let canvas = qrCode._canvas

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
                  await uploadQRImage(
                    canvas,
                    `${result.user.uid}/qrCode`,
                    async (url) => {
                      try {
                        const userDocRef = await doc(
                          db,
                          'users',
                          result.user.uid
                        )
                        updateDoc(userDocRef, { qr_code: url })
                      } catch (e) {
                        alert(e)
                      }
                      console.log('SUCCESS URL:', url)
                    }
                  )
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

  return isEnvDev ? (
    <div className="flex flex-grow items-center justify-center bg-secondaryBg py-[40px] px-[20px] sm:px-[56px] md:px-[112px]">
      <div className="flex flex-grow flex-col justify-center space-y-10 md:items-center">
        <h3>Logging in to firebase auth emulators</h3>
        {emulatorLoginError ? (
          <>
            <h4>Firebase emulators not initialized</h4>
            <div className="flex items-start justify-start space-x-3">
              <div>
                <BsFillExclamationTriangleFill className="h-[50px] w-[50px]" />
              </div>
              <div>
                It looks like it firebase emulators are not running.
                <br />
                Please make sure that firebase emulators are running in a new
                terminal window, and refresh this page. firebase:emulators start
                localhost:4000
              </div>
            </div>
          </>
        ) : (
          <>
            <p>please wait</p>
            <Spinner height={200} width={200} />
          </>
        )}
      </div>
    </div>
  ) : (
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
