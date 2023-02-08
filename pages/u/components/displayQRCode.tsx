import React, { FormEvent, useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode.react'
import { Button } from '../../../components/buttons/button'
import { uploadQRImage } from '../../../services/upload_qr_image'
import { useAuth } from '../../../contexts/auth'
import { db } from '../../../services/firebase_config'
import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { Spinner } from '../../../components/utils/spinner'
import Image from 'next/image'
import QRCodeStyling from 'qr-code-styling'

export default function DisplayQRCode() {
  const auth = useAuth()
  const [qrCodeImgUrl, setQrCodeImgUrl] = useState()
  const [isFetched, setIsFetched] = useState<boolean>(false)

  useEffect(() => {
    const fetchQrCode = async () => {
      const docRef = doc(db, 'users', auth.uid)
      const userDoc = await getDoc(docRef)
      const uid_qr_code = userDoc.data()?.qr_code
      console.log('useEffect modal ', uid_qr_code)
      setQrCodeImgUrl(uid_qr_code)
      setIsFetched(true)
    }
    if (!isFetched) {
      fetchQrCode()
    }
  }, [])

  return isFetched ? (
    <>
      {!qrCodeImgUrl ? (
        <></>
      ) : (
        <DisplayURLQRcode imgUrl={qrCodeImgUrl} />
      )}
    </>
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Spinner />
    </div>
  )
}


function DisplayURLQRcode({ imgUrl }: { imgUrl: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="grow"></div>
      <h3>This is your QR code.</h3>
      <div className="grow"></div>
      <div className="relative mb-[10px] flex h-[315px] w-[315px] items-center justify-center rounded-xl bg-gray-100 shadow-xl">
        <Image src={imgUrl} objectFit="cover" layout="fill" />
      </div>
      <p className="text-red-400">Please DO NOT share this to the public.</p>
      <div className="grow"></div>
    </div>
  )
}
