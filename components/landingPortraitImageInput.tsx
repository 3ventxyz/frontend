import EventTile from './eventTile'

export default function LandingPortraitImageInput({
  title,
  username,
  avatar
}: {
  title: string
  username?: string
  avatar?: string
}) {
  return (
    <div className="flex h-[250px] w-[525px] hover:bg-gray-600 hover:cursor-pointer space-x-[60px] rounded-3xl bg-gray-400 px-[40px] py-[20px]">
      <div className="flex w-full flex-col items-start justify-start">
        <div className="text-[50px] font-bold">{title}</div>
		landing portrait image upload
      </div>
    </div>
  )
}
