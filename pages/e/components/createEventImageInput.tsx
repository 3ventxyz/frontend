import { useState } from 'react'
import FileImageInput from '../../../components/inputs/fileImageInput'
import PredefinedEventPictures from './predefinedEventPictures'

export default function CreateEventImageInput({
  labelText,
  fileImgName,
  predefinedImgName,
  fileImg,
  eventImgUrl,
  parentClassName = '',
  imageInputMenuClasses = '',
  landingMode,
  setFileImg,
  setPredefinedImgUrl
}: {
  labelText: string
  fileImgName: string
  predefinedImgName: string
  fileImg: File | null
  eventImgUrl: string
  parentClassName: string
  imageInputMenuClasses: string
  landingMode: boolean
  setFileImg: (name: string, fileImg: File) => void
  setPredefinedImgUrl: (name: string, predefinedImgUrl: string) => void
}) {
  const [menuVisible, setMenuVisible] = useState(true)

  const onChangePredefinedImage = ({
    setPredefinedImgUrl,
    imgUrl
  }: {
    setPredefinedImgUrl: (name: string, imgUrl: string) => void
    imgUrl: string
  }) => {
    setPredefinedImgUrl(predefinedImgName, imgUrl)
    setMenuVisible(false)
  }

  return (
    <div className={parentClassName}>
      <div className="flex w-full justify-between">
        <label className="mb-2 block text-sm font-medium text-gray-900 ">
          {labelText}
        </label>
        <span
          onClick={() => {
            setMenuVisible(!menuVisible)
          }}
          className="text-blue-800 hover:cursor-pointer hover:underline"
        >
          Predefined Images
        </span>
      </div>
      <div className="z-10">
        <FileImageInput
          name={fileImgName}
          fileImg={fileImg}
          setFileImg={setFileImg}
          imgUrlTemplate={eventImgUrl ?? ''}
          mode={landingMode ? 'landing' : 'event'}
        />
      </div>
      {fileImg === null && menuVisible ? (
        <div className={imageInputMenuClasses}>
          <PredefinedEventPictures
            setSelectedPredefinedEventImgUrl={(imgUrl: string) => {
              onChangePredefinedImage({
                imgUrl: imgUrl,
                setPredefinedImgUrl: setPredefinedImgUrl
              })
            }}
            landingMode={landingMode}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
