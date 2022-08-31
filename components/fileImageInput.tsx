// author: marthel
import { useState } from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { storage } from '../services/firebase_config'
import Image from 'next/image'

export default function FileImageInput() {
  const [fileImg, setFileImg] = useState<File | null>(null)
  const [imgURl, setImgUrl] = useState('')
  const [isMouseHover, setMouseHover] = useState<boolean>(false)
  const [fileErrorMsg, setFileErrorMsg] = useState<String | null>(null)

  return fileImg !== null ? (
    <div
      onMouseEnter={() => {
        console.log('mouse hovered on image')
        setMouseHover(true)
      }}
      onMouseLeave={() => {
        console.log('mouse stop hovering on image')
        setMouseHover(false)
      }}
      className="relative h-[384px] max-h-[320px] w-[380px] rounded-3xl bg-gray-300 hover:cursor-pointer hover:bg-gray-500 sm:max-h-full"
    >
      <Image
        src={imgURl}
        layout="fill"
        objectFit="cover"
        className="rounded-3xl"
      />
      {isMouseHover ? (
        <div className="flex h-full w-full items-center justify-center rounded-3xl bg-gray-400 text-white opacity-70">
          Please click to change your image
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div className="relative h-[384px] max-h-[320px] w-[380px] rounded-3xl bg-gray-300 hover:cursor-pointer sm:max-h-full">
      <input
        type="file"
        onChange={(event: any) => {
          console.log(
            'uploading picture, no big than 600px and no big than 10 mbs'
          )
          setFileImg(event.target.files[0])
          console.log('=========================================')
          console.log(event.target.files)

          console.log('=========================================')
          console.log('+++++URL+++++++++++++++++++++++++++++++++++')
          console.log(URL.createObjectURL(event.target.files[0]))
          setImgUrl(URL.createObjectURL(event.target.files[0]))
          console.log('++++++++++++++++++++++++++++++++++++++++++')
        }}
      />
      <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
        <MdOutlineAddPhotoAlternate className="h-[150px] w-[150px]" />
      </div>
    </div>
  )
}
