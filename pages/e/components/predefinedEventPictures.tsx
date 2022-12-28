import { useState } from 'react'
import Image from 'next/image'
export default function PredefinedEventPictures({
  setSelectedPredefinedEventImgUrl
}: {
  setSelectedPredefinedEventImgUrl: (
    selectedPredefinedEventImgUrl: string
  ) => void
}) {
  /**predefined constant images */
  const staticImgUrl1: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent1.jpg?alt=media&token=841706c6-4890-4716-8ea1-16a1af49154a'
  const staticImgUrl2: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent2.jpg?alt=media&token=8be3fca4-9f01-4c0a-8654-984990ea8963'
  const staticImgUrl3: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent3.jpg?alt=media&token=ae0f2e20-6c24-4c0f-b080-8b4cdaf0ba7d'
  const staticImgUrl4: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent4.jpg?alt=media&token=145fdc18-f398-4d26-b441-0f63356db72e'

  const [selectedPredefinedImgIndex, setSelectedPredefinedImgIndex] =
    useState<number>(0)

  return (
    <div className="w-[300px]  rounded-r-3xl bg-white px-[15px] py-[5px]">
      <h4 className="">
        <span>predefined images</span>
      </h4>
      <div className="  flex flex-col items-center space-y-2">
        <p>
          In case that you don&apos;t have an image for your event. Please
          select one of the pictures that we offer.
        </p>
        <div className="flex space-x-2">
          <PredefinedImageOption
            setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
            setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
            imgIndex={1}
            selectedPredefinedImgIndex={selectedPredefinedImgIndex}
            predefinedImgUrl={staticImgUrl1}
          />
          <PredefinedImageOption
            setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
            setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
            imgIndex={2}
            selectedPredefinedImgIndex={selectedPredefinedImgIndex}
            predefinedImgUrl={staticImgUrl2}
          />
        </div>
        <div className="flex space-x-2">
          <PredefinedImageOption
            setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
            setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
            imgIndex={3}
            selectedPredefinedImgIndex={selectedPredefinedImgIndex}
            predefinedImgUrl={staticImgUrl3}
          />
          <PredefinedImageOption
            setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
            setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
            imgIndex={4}
            selectedPredefinedImgIndex={selectedPredefinedImgIndex}
            predefinedImgUrl={staticImgUrl4}
          />
        </div>
      </div>
    </div>
  )
}

function PredefinedImageOption({
  setSelectedPredefinedImgIndex,
  setSelectedPredefinedEventImgUrl,
  selectedPredefinedImgIndex,
  imgIndex,
  predefinedImgUrl
}: {
  setSelectedPredefinedImgIndex: (selectedPredefinedImgIndex: number) => void
  setSelectedPredefinedEventImgUrl: (predefinedImgUrl: string) => void
  imgIndex: number
  selectedPredefinedImgIndex: number
  predefinedImgUrl: string
}) {
  return (
    <button
      onClick={() => {
        setSelectedPredefinedImgIndex(imgIndex)
        setSelectedPredefinedEventImgUrl(predefinedImgUrl)
      }}
    >
      <div
        className={`relative h-[120px] w-[120px] rounded-3xl   ${
          selectedPredefinedImgIndex === imgIndex
            ? 'border-[3px] border-blue-600'
            : ''
        }`}
      >
        <Image
          src={predefinedImgUrl}
          layout="fill"
          loading="lazy"
          objectFit="cover"
          className="rounded-3xl"
        />
      </div>
    </button>
  )
}
