import Image from 'next/image'

export default function PredefinedImageOption({
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
        className={`relative h-[150px] w-[150px] rounded-3xl   ${
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
