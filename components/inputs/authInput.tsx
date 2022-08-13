import Image from 'next/image'
import Link from 'next/link'
interface AuthInputProps {
  id: string
  labelText: string
  icon?: string
  iconAlt?: string
  placeholder?: string
  bottomText?: string
  bottomRedirect?: string
  maxWidth?: number
  inputRef: React.RefObject<HTMLInputElement>
  type: string
}

export default function AuthInput({
  labelText,
  placeholder,
  id,
  icon,
  iconAlt,
  maxWidth,
  inputRef,
  type,
  bottomText,
  bottomRedirect
}: AuthInputProps) {
  return (
    <div className="mx-auto flex w-full flex-col items-start space-y-1 text-[16px] font-normal">
      <label htmlFor={id}>{labelText}</label>
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
          {icon && <img alt={iconAlt} src={icon} width="20" />}
        </div>
        <input
          type={type}
          id={id}
          ref={inputRef}
          className={`block h-[56px] w-full rounded-[16px] border border-black bg-transparent p-2.5 pr-[20px] pl-[56px] text-[16px] text-gray-700 ${
            type === 'password'
              ? 'placeholder:text-[8px]'
              : 'placeholder:italic'
          } focus:border-blue-500 focus:ring-blue-500`}
          placeholder={placeholder}
          required
        />
      </div>
      {bottomText && bottomRedirect && (
        <Link href={bottomRedirect}>
          <a className="text-secondaryDark hover:text-tertiaryDark focus:text-primaryDark active:text-primaryDark ml-[18px] text-[12px] underline transition duration-200 ease-in-out">
            {bottomText}
          </a>
        </Link>
      )}
    </div>
  )
}
