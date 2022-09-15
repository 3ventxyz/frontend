import React, { FormEvent, useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode.react'
import Button from '../../../components/button'
import { uploadQRImage } from '../../../services/upload_qr_image'
import { useAuth } from '../../../contexts/auth'
import { db } from '../../../services/firebase_config'
import { doc, getDoc, updateDoc } from '@firebase/firestore'
import Spinner from '../../../components/spinner'
import Image from 'next/image'
import QRCodeStyling from 'qr-code-styling'

export default function DisplayQRCode() {
  const auth = useAuth()
  const qrRef = useRef<any>()
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
        <GenerateNewQRCode uid={auth.uid} qrRef={qrRef} />
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

function GenerateNewQRCode({ uid, qrRef }: { uid: string; qrRef: any }) {
  const [newQrCodeGenerated, setNewQRCodeGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const qrCode = new QRCodeStyling(
    {
      width: 300,
      height: 300,
      image: 'assets/logo-icon.svg',
      data: `https://www.3vent.xyz/u/${uid}`,
      type: 'canvas',
      dotsOptions: { color: '#000000' }
    }
    // <QRCode
    //   id="qrCodeId"
    //   size={300}
    //   value={`https://www.3vent.xyz/u/${uid}`}
    //   bgColor="white"
    //   includeMargin={true}
    //   fgColor="black"
    //   level="H"
    //   imageSettings={{
    //     src: 'assets/logo-icon.svg',
    //     excavate: true,
    //     width: 400 * 0.1,
    //     height: 400 * 0.1
    //   }}
    // />
  )

  const uploadQRCode = (evt: FormEvent) => {
    evt.preventDefault()
    setIsGenerating(true)
    // let canvas = qrRef.current.querySelector('canvas')
    let canvas = qrCode._canvas
    uploadQRImage(canvas, `${uid}/qrCode`, async (url) => {
      try {
        const userDocRef = await doc(db, 'users', uid)
        updateDoc(userDocRef, { qr_code: url })
        setIsGenerating(false)
        setNewQRCodeGenerated(true)
      } catch (e) {
        alert(e)
      }
      console.log('SUCCESS URL:', url)
    })
  }
  console.log('before return: ',uid);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="grow"></div>
      <h3>This is your QR code.</h3>
      <div className="grow"></div>
      <div className="mb-[10px] flex h-[315px] w-[315px] items-center justify-center rounded-xl bg-gray-100 shadow-xl">
        <div className={`${newQrCodeGenerated ? 'hidden' : 'block'}`}>
          <form action="" onSubmit={uploadQRCode}>
            {isGenerating ? (
              <>
                <Spinner />
              </>
            ) : (
              <Button
                text={'Generate new QR code'}
                type={'submit'}
                active={true}
                onClick={() => {
                  console.log('generating and uploading to firebase')
                }}
              />
            )}
          </form>
        </div>
        <div
          className={`qr-container__qr-code ${
            newQrCodeGenerated ? 'block' : 'hidden'
          }`}
          ref={qrRef}
        >
          uploaded
          {/* {qrCode} */}
        </div>
      </div>
      <p className="text-red-400">Please DO NOT share this to the public.</p>
      <div className="grow"></div>
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
