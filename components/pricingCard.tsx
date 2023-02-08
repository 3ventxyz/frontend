import { Button } from './buttons/button'

export default function PricingCard({
  title,
  description,
  price,
  icon,
  iconAlt,
  bgColor,
  buttonText,
  onClickButton = () => null
}: {
  title: string
  description: Array<string>
  price: string
  icon: string
  iconAlt: string
  bgColor: string
  buttonText?: string
  onClickButton?: () => void
}) {
  return (
    <div
      className={`flex h-full w-full max-w-[384px] flex-col items-center rounded-[15px] ${bgColor} p-8 text-center`}
    >
      <img src={icon} alt={iconAlt} width="64" />
      <h4 className="mt-[24px] mb-[16px] leading-[30px]">{title}</h4>
      <div className="flex h-full flex-col justify-between">
        <div className="mb-12">
          {description.map((e, i) => (
            <p className="p2" key={i}>
              {e}
            </p>
          ))}
        </div>
        <p className="p2">{price}</p>
      </div>
      {buttonText && (
        <div className="mt-6">
          <Button onClick={onClickButton} text={buttonText} active={true} />
        </div>
      )}
    </div>
  )
}
