// author: marthel
import { useState } from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { storage } from '../services/firebase_config'
import Image from 'next/image'
// TODO add the logic of adding a picture from the desktop computer
export default function FileImageInput() {
  // const [fileImg, setFileImg] = useState<File | null>(null)
  const [fileImg, setFileImg] = useState<File | null>(null)
  const [imgURl, setImgUrl] = useState('')

  const fileImgHoverContent = () => {}

  return fileImg !== null ? (
    <div className="relative h-[384px] max-h-[320px] w-[380px] rounded-3xl bg-gray-300 hover:cursor-pointer hover:bg-gray-500 sm:max-h-full">
      <Image src={imgURl}
      layout="fill"
      objectFit='cover'
      />
    </div>
  ) : (
    <div className="relative h-[384px] max-h-[320px] w-[380px] rounded-3xl bg-gray-300 hover:cursor-pointer sm:max-h-full">
      <input
        type="file"
        // find the type for the single file; do NOT use files.!!!!
        // the type is FileList
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
