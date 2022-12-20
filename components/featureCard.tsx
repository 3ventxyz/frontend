
/**TODO: MOVE THIS TO LANDING DIRECTORY */
export default function FeatureCard({
  title,
  text,
  icon,
  iconAlt,
  border
}: {
  title: string
  text: string
  icon: string
  iconAlt: string
  border: boolean
}) {
  return (
    <div
      className={`flex flex-row content-center items-center py-[16px] ${
        border ? 'border-b border-[#E5E7EB]' : ''
      }`}
    >
      <img src={icon} alt={iconAlt} className="mr-[24px]" />
      <div className="max-w-[384px] text-left leading-[30px]">
        <h4>{title}</h4>
        <p className="p2 pt-[8px] leading-[24px]">{text}</p>
      </div>
    </div>
  )
}
