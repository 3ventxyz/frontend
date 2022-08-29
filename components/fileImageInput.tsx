// author: marthel
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'

// TODO add the logic of adding a picture from the desktop computer
export default function FileImageInput() {
  return (
    <div className="relative h-[384px] max-h-[320px] w-[380px] rounded-3xl bg-gray-300 sm:max-h-full">
      <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
        <MdOutlineAddPhotoAlternate className="h-[150px] w-[150px]" />
      </div>
    </div>
  )
}
