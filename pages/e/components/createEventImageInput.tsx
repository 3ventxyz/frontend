import { useState } from 'react'
import { FileImageInput } from '../../../components/inputs/fileImageInput'
import PredefinedEventPictures from './predefinedEventPictures'

export default function CreateEventImageInput({
  labelText,
  fileImg,
  imgUrl,
  parentClassName = '',
  imgMenuClassName = '',
  landingMode,
  setFileImg,
  setPredefinedImgUrl,
  onFocus = () => {}
}: {
  labelText: string
  fileImg: File | null
  imgUrl: string
  parentClassName: string
  imgMenuClassName: string
  landingMode: boolean
  setFileImg: (name: string, fileImg: File) => void
  setPredefinedImgUrl: (name: string, predefinedImgUrl: string) => void
  onFocus: () => void
}) {
  const [menuVisible, setMenuVisible] = useState(false)
  const imgUrlName = landingMode ? 'landing_img_url' : 'event_img_url'
  const fileImgName = landingMode ? 'landing_file_img' : 'event_file_img'

  const onChangePredefinedImage = ({
    setPredefinedImgUrl,
    imgUrl
  }: {
    setPredefinedImgUrl: (name: string, imgUrl: string) => void
    imgUrl: string
  }) => {
    setPredefinedImgUrl(imgUrlName, imgUrl)
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
      <div
        onClick={() => {
          onFocus()
        }}
        className="z-10"
      >
        <FileImageInput
          name={fileImgName}
          fileImg={fileImg}
          setFileImg={setFileImg}
          imgUrlTemplate={imgUrl ?? ''}
          mode={landingMode ? 'landing' : 'event'}
        />
      </div>
      {fileImg === null && menuVisible ? (
        <div className={imgMenuClassName}>
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
