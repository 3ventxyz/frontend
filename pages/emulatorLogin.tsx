import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import Spinner from '../components/spinner'
import { useAuth } from '../contexts/auth'
import { auth } from '../services/firebase_config'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { uploadQRImage } from '../services/upload_qr_image'
export default function EmulatorLogin() {
  const authContext = useAuth()
  const router = useRouter()
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
    //login the user.
    //check if he has a qr code in its user doc, from the db.
    //if it has, redirect to the user page right away.
    signInWithEmailAndPassword(auth, 'test123@gmail.com', '1234567890').then(
      (confirmationResult) => {
        //callback for a confirmation code
        setShowConfirmation(true)
        setConfirmation(() => (code: string) => {
          // confirmationResult.confirm(code).then(async (result) => {
          //   //firebase and global.
          //   //gets the userRef and the doc snap
          //   //it sets the user id
          //   //qrcode canvas if its new
          //   //check the doc snap exists(which should)
          //   // --->if no doc exists, please restart the emulators.!
          //   //get the doc snap, the data should be set to a userModel
          //   //that userModel will be setted inside authContext
          //   //lastly redirect the user to the logged in user page.
          // })
        })
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
