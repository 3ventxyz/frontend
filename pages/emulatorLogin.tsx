import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import Spinner from '../components/spinner'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'
import { useAuth } from '../contexts/auth'
import { auth, db } from '../services/firebase_config'
import { signInWithEmailAndPassword, UserCredential } from '@firebase/auth'
import { uploadQRImage } from '../services/upload_qr_image'
import { connectFirestoreEmulator, doc, getDoc } from '@firebase/firestore'
import { UserModel } from '../shared/interface/common'
export default function EmulatorLogin() {
  const authContext = useAuth()
  const router = useRouter()
  const [userId, setUserId] = useState<any>('')
  const [loginError, setLoginError] = useState(false)
  const [qrCode, setQrCodeImg] = useState<any>(null)

  useEffect(() => {
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
        setLoginError(true)
      }
    }
    emulatorSignUp()
  }, [])

  return (
    <div className="flex flex-grow items-center justify-center bg-secondaryBg py-[40px] px-[20px] sm:px-[56px] md:px-[112px]">
      <div className="flex flex-grow flex-col justify-center space-y-10 md:items-center">
        <h3>Logging in to firebase auth emulators</h3>
        {loginError ? (
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
                terminal window, and refresh this page.
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
  )
}
