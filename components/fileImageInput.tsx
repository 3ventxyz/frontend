// author: marthel
import { useEffect, useState } from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import Image from 'next/image'

//imgUrl for the previous template.
//if a url is passed but a fileImg is still null, display the imgUrl.
export default function FileImageInput({
  fileImg,
  setFileImg,
  imgUrlTemplate = '',
  mode = 'img-input-empty'
}: {
  fileImg: File | null
  setFileImg: (value: File) => void
  imgUrlTemplate?: string
  mode?: string
}) {
  const [imgUrl, setImgUrl] = useState('')
  const [isMouseHover, setMouseHover] = useState<boolean>(false)

  useEffect(() => {
    console.log(fileImg, imgUrlTemplate, mode)
  }, [fileImg, imgUrlTemplate, mode])

  // display predefined image
  if (imgUrlTemplate !== '' && imgUrl === '') {
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
        <label htmlFor={mode}>
          <Image
            src={imgUrlTemplate}
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
          {isMouseHover ? (
            <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-3xl bg-gray-400 text-white opacity-70">
              <MdOutlineAddPhotoAlternate className="h-[150px] w-[150px]" />
              <div>Please click to change your image</div>
            </div>
          ) : (
            <></>
          )}

          <input
            id={mode}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(event: any) => {
              setFileImg(event.target.files[0])
              setImgUrl(URL.createObjectURL(event.target.files[0]))
              console.log('onchange 2 from fileImageInput')
              // console.log('fileImg type:',fileImg?.type)
              setMouseHover(false)
            }}
          />
        </label>
      </div>
    )
  }

  // image has been uploaded
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
      <label htmlFor={mode}>
        <Image
          // id={mode}
          src={imgUrl}
          layout="fill"
          objectFit="cover"
          className="rounded-3xl"
        />
        {isMouseHover ? (
          <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-3xl bg-gray-400 text-white opacity-70">
            <MdOutlineAddPhotoAlternate className="h-[150px] w-[150px]" />
            <div>Please click to change your image</div>
          </div>
        ) : (
          <></>
        )}

        <input
          id={mode}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(event: any) => {
            setFileImg(event.target.files[0])
            setImgUrl(URL.createObjectURL(event.target.files[0]))
            setMouseHover(false)
            console.log('onchange 3 from fileImageInput')
          }}
        />
      </label>
    </div>
  ) : (
    // upload an image
    <div className="relative h-[384px] max-h-[320px] w-[380px] rounded-3xl bg-gray-300 hover:bg-gray-400 sm:max-h-full">
      <label htmlFor={mode}>
        <input
          id={mode}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(event: any) => {
            setFileImg(event.target.files[0])
            setImgUrl(URL.createObjectURL(event.target.files[0]))
            console.log(event.target.files[0])
          }}
        />
        <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-gray-400 hover:text-gray-500">
          <MdOutlineAddPhotoAlternate className="h-[150px] w-[150px]" />
          <div>Please add an Image</div>
        </div>
      </label>
    </div>
  )
}
