import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import Spinner from '../components/spinner'
import { useAuth } from '../contexts/auth'
import { auth, db } from '../services/firebase_config'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { uploadQRImage } from '../services/upload_qr_image'
import { doc, getDoc } from '@firebase/firestore'
import { UserModel } from '../shared/interface/common'
export default function EmulatorLogin() {
  const authContext = useAuth()
  const router = useRouter()
  const [confirmationCode, setConfirmationCode] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [userId, setUserId] = useState<any>('')
  const [email, setEmail] = useState<any>('')
  const [password, setPassword] = useState<any>('')
  const [qrCode, setQrCodeImg] = useState<any>()
  const [confirmation, setConfirmation] = useState(() => (code: string) => {
    console.log(code)
  })
  //useEffect for the qr code
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // try to move this import inside a firebase API function.
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

  // loging in with the dummy user in the auth emulators
  useEffect(() => {
    signInWithEmailAndPassword(auth, 'test123@gmail.com', '1234567890').then(
      async (result) => {
        console.log('user id:', result.user.uid)
        setUserId(result.user.uid)
        const userDocRef = doc(db, 'users', result.user.uid)
        const userDocSnap = await getDoc(userDocRef)
        const data =userDocSnap.data()
        const userModel: UserModel = {
          phone_number: data?.phone_number,
                    discord_id: data?.discord_id,
                    discord_verified: data?.discord_verified,
                    twitter_id: data?.twitter_id,
                    twitter_verified: data?.twitter_verified,
                    wallet: data?.wallet,
                    siwe_expiration_time: data?.siwe_expiration_time
        }
        authContext.setUserModel(userModel);
        router.push('/u')

        //   // --->if no doc exists, please restart the emulators.!

      }
    )
    //otherwise, create the qr code, add it to his user doc in the db.
    // and send it to the logged in user page.
  }, [])

  return (
    <div className="flex flex-grow items-center justify-center bg-secondaryBg py-[40px] px-[112px]">
      <div className="flex flex-col items-center justify-center space-y-10">
        <h3>Logging in to firebase auth emulators</h3>
        <p>please wait</p>
        <Spinner height={200} width={200} />
      </div>
      {/* TODO; check how to implement the firebase cloud function
        for returning a boolean value that sees if its in prodor dev environment
      */}
      {/* <h1>Firebase emulators not running.</h1>
      Hi, I see that you&apos;re trying to log in, in the development environment.
      Please, run firebase emulators with this command <b>firebase
      emulators:start</b>, in a new terminal window; once
      the firebase emulators are properly initialized, please refresh this page.
      <br />
      <br />
      <div>
        {true ? (
          <>firebase emulators are running please :{')'}</>
        ) : (
          <>
            firebase emulators are not running or function is not retriving the
            true value!
          </>
        )}
      </div> */}
    </div>
  )
}
