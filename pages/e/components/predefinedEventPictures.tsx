import { useState } from 'react'
import Image from 'next/image'
export default function PredefinedEventPictures({
  setSelectedPredefinedEventImgUrl,
  landingMode = false
}: {
  setSelectedPredefinedEventImgUrl: (
    selectedPredefinedEventImgUrl: string
  ) => void
  landingMode?: boolean
}) {
  /**predefined constant images */
  const staticEventImgUrl1: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent1.jpg?alt=media&token=841706c6-4890-4716-8ea1-16a1af49154a'
  const staticEventImgUrl2: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent2.jpg?alt=media&token=8be3fca4-9f01-4c0a-8654-984990ea8963'
  const staticEventImgUrl3: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent3.jpg?alt=media&token=ae0f2e20-6c24-4c0f-b080-8b4cdaf0ba7d'
  const staticEventImgUrl4: string =
    'https://firebasestorage.googleapis.com/v0/b/vent-d1d85.appspot.com/o/eventsPics%2FpastEvent4.jpg?alt=media&token=145fdc18-f398-4d26-b441-0f63356db72e'

  const staticLandingImgUrl1: string = ''
  const staticLandingImgUrl2: string = ''
  const staticLandingImgUrl3: string = ''
  const staticLandingImgUrl4: string = ''
  const [selectedPredefinedImgIndex, setSelectedPredefinedImgIndex] =
    useState<number>(0)

  return landingMode ? (
    <div className="h-[250px] w-[375px] rounded-3xl bg-gray-200 px-[2px]">
      <div className="flex space-x-2 space-y-2">
        <PredefinedLandingImageOption
          setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
          setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
          imgIndex={1}
          selectedPredefinedImgIndex={selectedPredefinedImgIndex}
          predefinedImgUrl={staticEventImgUrl1}
        />
        <PredefinedLandingImageOption
          setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
          setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
          imgIndex={2}
          selectedPredefinedImgIndex={selectedPredefinedImgIndex}
          predefinedImgUrl={staticEventImgUrl2}
        />
      </div>
      <div className="flex space-x-2 space-y-2">
        <PredefinedLandingImageOption
          setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
          setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
          imgIndex={3}
          selectedPredefinedImgIndex={selectedPredefinedImgIndex}
          predefinedImgUrl={staticEventImgUrl3}
        />
        <PredefinedLandingImageOption
          setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
          setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
          imgIndex={4}
          selectedPredefinedImgIndex={selectedPredefinedImgIndex}
          predefinedImgUrl={staticEventImgUrl4}
        />
      </div>
    </div>
  ) : (
    <div className="h-[355px] w-[308px] rounded-r-3xl bg-white py-[2px] pl-[25px] pr-[15px]">
      <h4 className="">
        <span>predefined images</span>
      </h4>
      <div className="  flex flex-col items-end space-y-[3px]">
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
            predefinedImgUrl={staticEventImgUrl1}
          />
          <PredefinedImageOption
            setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
            setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
            imgIndex={2}
            selectedPredefinedImgIndex={selectedPredefinedImgIndex}
            predefinedImgUrl={staticEventImgUrl2}
          />
        </div>
        <div className="flex space-x-2">
          <PredefinedImageOption
            setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
            setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
            imgIndex={3}
            selectedPredefinedImgIndex={selectedPredefinedImgIndex}
            predefinedImgUrl={staticEventImgUrl3}
          />
          <PredefinedImageOption
            setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
            setSelectedPredefinedEventImgUrl={setSelectedPredefinedEventImgUrl}
            imgIndex={4}
            selectedPredefinedImgIndex={selectedPredefinedImgIndex}
            predefinedImgUrl={staticEventImgUrl4}
          />
        </div>
      </div>
    </div>
  )
}

function PredefinedLandingImageOption({
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
        className={`relative h-[120px] w-[175px] rounded-3xl   ${
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
