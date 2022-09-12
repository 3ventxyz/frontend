import React, { FormEvent, useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode.react'
import Button from '../../../components/button'
import { uploadQRImage } from '../../../services/upload_qr_image'
import { useAuth } from '../../../contexts/auth'
import { db } from '../../../services/firebase_config'
import { doc, getDoc, updateDoc } from '@firebase/firestore'
import Spinner from '../../../components/spinner'
import Image from 'next/image'
export default function DisplayQRCode({ uid }: { uid: string }) {
  // const qrRef = useRef<any>()
  const auth = useAuth()
  const [qrCodeImgUrl, setQrCodeImgUrl] = useState()
  const [isFetched, setIsFetched] = useState<boolean>(false)

  // const uploadQRCode = (evt: FormEvent) => {
  //   evt.preventDefault()
  //   let canvas = qrRef.current.querySelector('canvas')

  //   uploadQRImage(canvas, `${auth.uid}/qrCode`, async (url) => {
  //     try {
  //       const userDocRef = await doc(db, 'users', auth.uid)
  //       updateDoc(userDocRef, { qr_code: url })
  //     } catch (e) {
  //       alert(e)
  //     }
  //     console.log('SUCCESS URL:', url)
  //   })
  // }

  useEffect(() => {
    /**
    //retrieve the qr code from the firestore db,
    // if the qrcode image is null, meaning that the field doesn't exist, then 
     * show a message telling the user that his qr code is not created yet, click the button "generate qr code " to create
     * and upload a new qr code, and theen show the component with the qr as shown below.
     * 
     * Otherwise, if a link to a qrCodeImg already exists in the firestore db and its successfully retrieved, then use that one. 
     */
    //

    const fetchQrCode = async () => {
      // setIsFetched(true)

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

  // const qrCode = (
  //   <QRCode
  //     id="qrCodeId"
  //     size={300}
  //     value={`https://www.3vent.xyz/u/${uid}`}
  //     bgColor="white"
  //     includeMargin={true}
  //     fgColor="black"
  //     level="H"
  //     imageSettings={{
  //       src: 'assets/logo-icon.svg',
  //       excavate: true,
  //       width: 400 * 0.1,
  //       height: 400 * 0.1
  //     }}
  //   />
  // )
  return isFetched ? (
    <>
      {!qrCodeImgUrl ? (
        <GenerateNewQRCode uid={auth.uid} />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="grow"></div>
          <h3>This is your QR code.</h3>
          <div className="grow"></div>
          <div className="relative mb-[10px] flex h-[315px] w-[315px] items-center justify-center rounded-xl bg-gray-100 shadow-xl">
            {/* <div className="qr-container__qr-code" ref={qrRef}>
              {qrCode}
            </div> */}
            <Image src={qrCodeImgUrl} objectFit="cover" layout="fill" />
          </div>
          <p className="text-red-400">
            Please DO NOT share this to the public.
          </p>
          <div className="grow"></div>

          {/* <div>
            <form action="" onSubmit={uploadQRCode}>
              <Button
                text={'Download qr code'}
                type={'submit'}
                active={true}
                onClick={() => {
                  console.log('download')
                }}
              />
            </form>
          </div> */}
        </div>
      )}
    </>
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Spinner />
    </div>
  )
}

function GenerateNewQRCode({ uid }: { uid: string }) {
  const qrRef = useRef<any>()
  const [newQrCodeGenerated, setNewQRCodeGenerated] = useState(false)
  const qrCode = (
    <QRCode
      id="qrCodeId"
      size={300}
      value={`https://www.3vent.xyz/u/${uid}`}
      bgColor="white"
      includeMargin={true}
      fgColor="black"
      level="H"
      imageSettings={{
        src: 'assets/logo-icon.svg',
        excavate: true,
        width: 400 * 0.1,
        height: 400 * 0.1
      }}
    />
  )

  const uploadQRCode = (evt: FormEvent) => {
    evt.preventDefault()
    let canvas = qrRef.current.querySelector('canvas')
    uploadQRImage(canvas, `${uid}/qrCode`, async (url) => {
      try {
        const userDocRef = await doc(db, 'users', uid)
        updateDoc(userDocRef, { qr_code: url })
        setNewQRCodeGenerated(true)
      } catch (e) {
        alert(e)
      }
      console.log('SUCCESS URL:', url)
    })
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="grow"></div>
      <h3>This is your QR code.</h3>
      <div className="grow"></div>
      <div className="mb-[10px] flex h-[315px] w-[315px] items-center justify-center rounded-xl bg-gray-100 shadow-xl">
        {!newQrCodeGenerated ? (
          <div>
            <form action="" onSubmit={uploadQRCode}>
              <Button
                text={'Generate new QR code'}
                type={'submit'}
                active={true}
                onClick={() => {
                  console.log('generating and uploading to firebase')
                }}
              />
            </form>
          </div>
        ) : (
          <div className="qr-container__qr-code" ref={qrRef}>
            {qrCode}
          </div>
        )}
      </div>
      <p className="text-red-400">Please DO NOT share this to the public.</p>
      <div className="grow"></div>
    </div>
  )
}
function displayQRcode() {
  // return (
  //   <div className="flex h-full w-full flex-col items-center justify-center">
  //     <div className="grow"></div>
  //     <h3>This is your QR code.</h3>
  //     <div className="grow"></div>
  //     <div className="mb-[10px] flex h-[315px] w-[315px] items-center justify-center rounded-xl bg-gray-100 shadow-xl">
  //       <div className="qr-container__qr-code" ref={qrRef}>
  //     {qrCode}
  //   </div>
  //       {/* <Image src={qrCodeImgUrl} /> */}
  //     </div>
  //     <p className="text-red-400">Please DO NOT share this to the public.</p>
  //     <div className="grow"></div>
  //     <div>
  //       <form action="" onSubmit={uploadQRCode}>
  //         <Button
  //           text={'Download qr code'}
  //           type={'submit'}
  //           active={true}
  //           onClick={() => {
  //             console.log('download')
  //           }}
  //         />
  //       </form>
  //     </div>
  //   </div>
  // )
}
