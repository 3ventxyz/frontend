// author: marthel
import { useState } from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import Image from 'next/image'

export default function FileImageInput({
  fileImg,
  setFileImg,
  //imgUrl for the previous template.
  //if a url is passed but a fileImg is still null, display the imgUrl.
  imgUrl=null,
}: {
  fileImg: File | null,
  setFileImg: (value: File) => void,
  imgUrl?: String | null,
}) {
  const [imgURl, setImgUrl] = useState('')
  const [isMouseHover, setMouseHover] = useState<boolean>(false)
  //TODO update the fileImageInput with the imgUrl, if an imgUrl is passed, display the UI with an image, instead of the empty image UI layout.
  return fileImg !== null ? (
    <div
      onMouseEnter={() => {
        setMouseHover(true)
      }}
      onMouseLeave={() => {
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
        accept="image/*"
        onChange={(event: any) => {
          setFileImg(event.target.files[0])
          setImgUrl(URL.createObjectURL(event.target.files[0]))
        }}
      />
      <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
        <MdOutlineAddPhotoAlternate className="h-[150px] w-[150px]" />
      </div>
    </div>
  )
}
