// author: marthel
import { useEffect, useState } from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { BiLandscape } from 'react-icons/bi'
import Image from 'next/image'

interface FileImageInputProps {
  /**the selected file that will be used for uploading image */
  fileImg: File | null
  /** useState function hook for setting the value fileImage, along the name of the variable  */
  setFileImg: (name: string, value: File) => void
  /** the img url  that will be used for displaying the image on this component*/
  imgUrlTemplate?: string
  /**the name given for the uploaded file*/
  name: string
  /** the mode that defines what type of image will be needed*/
  mode?: 'event' | 'landing' | undefined
}

//imgUrl for the previous template.
//if a url is passed but a fileImg is still null, display the imgUrl.

//add a boolean param, that will set the layout if its from the
// create event page or from edit.
//a dissable upload option will be added and it will be removed, once
//the storage issue has been fixed.

/**
 * component that will be used for selecting a file image from the computer
 * or a predefined image.
 */
export function FileImageInput({
  fileImg,
  setFileImg,
  imgUrlTemplate = '',
  mode = 'event',
  name
}: FileImageInputProps) {
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
            ? 'h-[325px] max-h-[320px] w-[325px] md:h-[384px] md:w-[380px]'
            : 'h-[166px] w-[352px] md:h-[285px] md:w-[600px]'
        } relative rounded-3xl bg-gray-300 hover:cursor-pointer hover:bg-gray-500 sm:max-h-full`}
      >
        <DisplayPredefinedImage
          name={name}
          mode={mode}
          imgUrlTemplate={imgUrlTemplate}
          isMouseHover={isMouseHover}
          setFileImg={setFileImg}
          setImgUrl={setImgUrl}
          setMouseHover={setMouseHover}
        />
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
          ? 'h-[325px] max-h-[320px] w-[325px] md:h-[384px] md:w-[380px]'
          : 'h-[166px] w-[352px] md:h-[285px] md:w-[600px]'
      } relative rounded-3xl bg-gray-300 hover:cursor-pointer hover:bg-gray-500 sm:max-h-full`}
    >
      <FileImageUploaded
        name={name}
        mode={mode}
        imgUrl={imgUrl}
        isMouseHover={isMouseHover}
        setFileImg={setFileImg}
        setImgUrl={setImgUrl}
        setMouseHover={setMouseHover}
      />
    </div>
  ) : (
    // upload an image
    <div
      className={`${
        mode === 'event'
          ? 'h-[325px] max-h-[320px] w-[325px] md:h-[384px] md:w-[380px]'
          : 'h-[166px] w-[352px] md:h-[285px] md:w-[600px]'
      } relative rounded-3xl bg-gray-300  hover:bg-gray-400  sm:max-h-full`}
    >
      <UploadFileImage
        name={name}
        mode={mode}
        setFileImg={setFileImg}
        setImgUrl={setImgUrl}
      />
    </div>
  )
}

function UploadFileImage({
  mode,
  name,
  setFileImg,
  setImgUrl
}: {
  mode: string
  name: string
  setFileImg: (name: string, file: File) => void
  setImgUrl: (url: string) => void
}) {
  return (
    <label htmlFor={`img-input-${mode}`}>
      <input
        id={`img-input-${mode}`}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(event: any) => {
          setFileImg(name, event.target.files[0])
          setImgUrl(URL.createObjectURL(event.target.files[0]))
        }}
      />
      {/* check the previous code. and it may not be from dev. */}
      <div className="flex h-full items-center justify-center text-gray-400 hover:cursor-pointer hover:text-gray-500">
        <div className="flex w-[150px] flex-col items-center  justify-center ">
          {mode === 'event' ? (
            <MdOutlineAddPhotoAlternate className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] " />
          ) : (
            <BiLandscape className="h-[75px] w-[75px] md:h-[150px] md:w-[150px]" />
          )}
          <div className="md:text-0 text-[12px]">
            {mode === 'event'
              ? 'Please select a ticket image'
              : 'Please select a landing portrait'}
          </div>
        </div>
      </div>
    </label>
  )
}

function FileImageUploaded({
  mode,
  imgUrl,
  isMouseHover,
  name,
  setFileImg,
  setImgUrl,
  setMouseHover
}: {
  mode: string
  imgUrl: string
  isMouseHover: boolean
  name: string
  setFileImg: (name: string, file: File) => void
  setImgUrl: (url: string) => void
  setMouseHover: (mouseHover: boolean) => void
}) {
  return (
    <label htmlFor={`img-input-${mode}`}>
      <Image
        src={imgUrl}
        layout="fill"
        objectFit="cover"
        className="rounded-3xl"
      />
      {isMouseHover ? (
        <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-3xl bg-gray-400 text-white opacity-70">
          <MdOutlineAddPhotoAlternate className="h-[100px] w-[100px] md:h-[150px] md:w-[150px]" />
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
          setFileImg(name, event.target.files[0])
          setImgUrl(URL.createObjectURL(event.target.files[0]))
          setMouseHover(false)
        }}
      />
    </label>
  )
}
function DisplayPredefinedImage({
  mode,
  imgUrlTemplate,
  isMouseHover,
  name,
  setFileImg,
  setImgUrl,
  setMouseHover
}: {
  mode: string
  imgUrlTemplate: string
  isMouseHover: boolean
  name: string
  setFileImg: (name: string, file: File) => void
  setImgUrl: (url: string) => void
  setMouseHover: (mouseHover: boolean) => void
}) {
  return (
    <label htmlFor={`img-input-${mode}`}>
      <Image
        src={imgUrlTemplate}
        layout="fill"
        objectFit="cover"
        className="rounded-3xl"
      />
      {isMouseHover ? (
        <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-3xl bg-gray-400 text-white opacity-70">
          <MdOutlineAddPhotoAlternate className="h-[100px] w-[100px] md:h-[150px] md:w-[150px]" />
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
          setFileImg(name, event.target.files[0])
          setImgUrl(URL.createObjectURL(event.target.files[0]))
          setMouseHover(false)
        }}
      />
    </label>
  )
}
