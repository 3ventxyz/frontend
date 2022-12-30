import EventTile from './eventTile'
// import { BiLandscape } from 'react-icons/bi'
// export default function LandingPortraitImageInput({
//   fileImg,
//   setFileImg,
//   imgUrlTemplate = ''
// }: {
//   fileImg?: File | null
//   setFileImg?: (value: File) => void
//   imgUrlTemplate?: string
// }) {
//   /**setStates */
//   /**Functions */
//   const landingPortraitValidator=()=>{}
//   return (
//     <div className="flex h-[285px] w-[600px]  rounded-3xl text-gray-400 hover:text-gray-500 bg-gray-300 px-[40px] py-[20px] hover:cursor-pointer hover:bg-gray-400">
//       <div className="flex w-full flex-col items-center justify-center">
//         <div>
//           <BiLandscape className="h-[200px] w-[200px]" />
//         </div>
//         <div className="">
//           Click to upload an image
//         </div>
//       </div>
//     </div>
//   )
// }

// author: marthel
import { useState } from 'react'
// import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { BiLandscape } from 'react-icons/bi'
import Image from 'next/image'

//imgUrl for the previous template.
//if a url is passed but a fileImg is still null, display the imgUrl.
export default function LandingPortraitImageInput({
  fileImg,
  setFileImg,
  imgUrlTemplate2 = ''
}: {
  fileImg: File | null
  setFileImg: (value: File) => void
  imgUrlTemplate2?: string
}) {
  const [landingImgUrl, setLandingImgUrl] = useState('')
  const [isMouseHover, setMouseHover] = useState<boolean>(false)
  if (imgUrlTemplate2 !== '' && landingImgUrl === '') {
    return (
      <div
        onMouseEnter={() => {
          setMouseHover(true)
        }}
        onMouseLeave={() => {
          setMouseHover(false)
        }}
        className="relative  h-[384px] max-h-[320px] w-[380px] rounded-3xl bg-gray-300 hover:cursor-pointer hover:bg-gray-500 sm:max-h-full"
      >
        <label htmlFor="img-input">
          <Image
            src={imgUrlTemplate2}
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
          {isMouseHover ? (
            <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-3xl bg-gray-400 text-white opacity-70">
              <BiLandscape className="h-[150px] w-[150px]" />
              <div>Please click to change your image</div>
            </div>
          ) : (
            <></>
          )}

          <input
            id="img-input"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(event: any) => {
              setFileImg(event.target.files[0])
              setLandingImgUrl(URL.createObjectURL(event.target.files[0]))

              // console.log('fileImg type:',fileImg?.type)
              setMouseHover(false)
            }}
          />
        </label>
      </div>
    )
  }

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
      <label htmlFor="img-input">
        <Image
          src={landingImgUrl}
          layout="fill"
          objectFit="cover"
          className="rounded-3xl"
        />
        {isMouseHover ? (
          <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-3xl bg-gray-400 text-white opacity-70">
            <BiLandscape className="h-[150px] w-[150px]" />
            <div>Please click to change your image</div>
          </div>
        ) : (
          <></>
        )}

        <input
          id="img-input"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(event: any) => {
            setFileImg(event.target.files[0])
            setLandingImgUrl(URL.createObjectURL(event.target.files[0]))
            setMouseHover(false)
          }}
        />
      </label>
    </div>
  ) : (
    <div className="relative h-[384px] max-h-[320px] w-[380px] rounded-3xl bg-gray-300 hover:bg-gray-400 sm:max-h-full">
      <label htmlFor="img-input-empty">
        <input
          id="img-input-empty"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(event: any) => {
            setFileImg(event.target.files[0])
            setLandingImgUrl(URL.createObjectURL(event.target.files[0]))
          }}
        />
        <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-gray-400 hover:text-gray-500">
          <BiLandscape className="h-[150px] w-[150px]" />
          <div>Please add an Landing Image</div>
        </div>
      </label>
    </div>
  )
}
