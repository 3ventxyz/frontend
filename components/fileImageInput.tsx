// author: marthel
import { useEffect, useState } from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { BiLandscape } from 'react-icons/bi'
import Image from 'next/image'

//imgUrl for the previous template.
//if a url is passed but a fileImg is still null, display the imgUrl.
export default function FileImageInput({
  fileImg,
  setFileImg,
  imgUrlTemplate = '',
  mode = 'event'
}: {
  fileImg: File | null
  setFileImg: (value: File) => void
  imgUrlTemplate?: string
  mode?: 'event' | 'landing' | undefined
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
        className={`${
          mode === 'event'
            ? 'h-[384px] max-h-[320px] w-[380px]'
            : 'h-[285px] w-[600px]'
        } relative rounded-3xl bg-gray-300 hover:cursor-pointer hover:bg-gray-500 sm:max-h-full`}
      >
        <label htmlFor={`img-input-${mode}`}>
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
      className={`${
        mode === 'event'
          ? 'h-[384px] max-h-[320px] w-[380px]'
          : 'h-[285px] w-[600px]'
      } relative rounded-3xl bg-gray-300 hover:cursor-pointer hover:bg-gray-500 sm:max-h-full`}
    >
      <label htmlFor={`img-input-${mode}`}>
        <Image
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
          id={`img-input-${mode}`}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(event: any) => {
            setFileImg(event.target.files[0])
            setImgUrl(URL.createObjectURL(event.target.files[0]))
            setMouseHover(false)
          }}
        />
      </label>
    </div>
  ) : (
    // upload an image
    <div
      className={`${
        mode === 'event'
          ? 'h-[384px] max-h-[320px] w-[380px]'
          : 'h-[285px] w-[600px]'
      } relative rounded-3xl bg-gray-300 hover:bg-gray-400 sm:max-h-full`}
    >
      <label htmlFor={`img-input-${mode}`}>
        <input
          id={`img-input-${mode}`}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(event: any) => {
            setFileImg(event.target.files[0])
            setImgUrl(URL.createObjectURL(event.target.files[0]))
          }}
        />
        <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-gray-400 hover:text-gray-500">
          {mode === 'event' ? (
            <MdOutlineAddPhotoAlternate className="h-[150px] w-[150px]" />
          ) : (
            <BiLandscape className="h-[150px] w-[150px]" />
          )}
          <div>
            {mode === 'event'
              ? 'Please add an Image'
              : 'Please add a Landing Portrait'}
          </div>
        </div>
      </label>
    </div>
  )
}
