import EventTile from './eventTile'
import { BiLandscape } from 'react-icons/bi'
export default function LandingPortraitImageInput({
  fileImg,
  setFileImg,
  imgUrlTemplate = ''
}: {
  fileImg?: File | null
  setFileImg?: (value: File) => void
  imgUrlTemplate?: string
}) {
  return (
    <div className="flex h-[285px] w-[600px] space-x-[60px] rounded-3xl bg-gray-400 px-[40px] py-[20px] hover:cursor-pointer hover:bg-gray-600">
      <div className="flex w-full flex-col items-center justify-center">
        <div>
          <BiLandscape className="h-[200px] w-[200px]" />
        </div>
        <div className="text-[20px] font-semibold">
          landing portrait image upload
        </div>
      </div>
    </div>
  )
}
