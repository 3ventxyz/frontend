import { useState } from 'react'
import FileImageInput from '../../../components/fileImageInput'
import PredefinedImageOption from './predefinedImageOption'

export default function ThirdStepInputs() {
  const staticImgUrl1: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent1.jpg?alt=media&token=841706c6-4890-4716-8ea1-16a1af49154a'
  const staticImgUrl2: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent2.jpg?alt=media&token=8be3fca4-9f01-4c0a-8654-984990ea8963'
  const staticImgUrl3: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent3.jpg?alt=media&token=ae0f2e20-6c24-4c0f-b080-8b4cdaf0ba7d'
  const staticImgUrl4: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent4.jpg?alt=media&token=145fdc18-f398-4d26-b441-0f63356db72e'

  const [fileImg, setFileImg] = useState<File | null>(null)
  const [selectedPredefinedEventImgUrl, setSelectedPredefinedEventImgUrl] =
    useState<string>('')
  const [selectedPredefinedImgIndex, setSelectedPredefinedImgIndex] =
    useState<number>(0)
  return (
    <div id="step-3">
      <h4>3.- Landing portrait and ticket image</h4>
      <hr />
      <br />
      <div className="flex flex-col">
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <label className="mb-2 block text-sm font-medium text-gray-900 ">
            IMAGE
          </label>
          <FileImageInput
            fileImg={fileImg}
            setFileImg={setFileImg}
            imgUrlTemplate={selectedPredefinedEventImgUrl}
          />
          {fileImg === null ? (
            <div>
              <h4 className="w-full">
                <span>predefined images</span>
              </h4>
              <div className="flex flex-col items-center space-y-2">
                <p>
                  In case that you don&apos;t have an image for your event.
                  Please select one of the pictures that we offer.
                </p>
                <div className="flex space-x-2">
                  <PredefinedImageOption
                    setSelectedPredefinedImgIndex={
                      setSelectedPredefinedImgIndex
                    }
                    setSelectedPredefinedEventImgUrl={
                      setSelectedPredefinedEventImgUrl
                    }
                    imgIndex={1}
                    selectedPredefinedImgIndex={selectedPredefinedImgIndex}
                    predefinedImgUrl={staticImgUrl1}
                  />
                  <PredefinedImageOption
                    setSelectedPredefinedImgIndex={
                      setSelectedPredefinedImgIndex
                    }
                    setSelectedPredefinedEventImgUrl={
                      setSelectedPredefinedEventImgUrl
                    }
                    imgIndex={2}
                    selectedPredefinedImgIndex={selectedPredefinedImgIndex}
                    predefinedImgUrl={staticImgUrl2}
                  />
                </div>
                <div className="flex space-x-2">
                  <PredefinedImageOption
                    setSelectedPredefinedImgIndex={
                      setSelectedPredefinedImgIndex
                    }
                    setSelectedPredefinedEventImgUrl={
                      setSelectedPredefinedEventImgUrl
                    }
                    imgIndex={3}
                    selectedPredefinedImgIndex={selectedPredefinedImgIndex}
                    predefinedImgUrl={staticImgUrl3}
                  />
                  <PredefinedImageOption
                    setSelectedPredefinedImgIndex={
                      setSelectedPredefinedImgIndex
                    }
                    setSelectedPredefinedEventImgUrl={
                      setSelectedPredefinedEventImgUrl
                    }
                    imgIndex={4}
                    selectedPredefinedImgIndex={selectedPredefinedImgIndex}
                    predefinedImgUrl={staticImgUrl4}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
