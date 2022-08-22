export default function Button({
  text,
  onClick,
  active,
  type = 'button',
  isExpanded = false,
  id = '',
  auth = false,
  activeStyling = false
}: {
  text: string
  onClick: (() => void) | undefined
  active: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  isExpanded?: boolean
  id?: string
  auth?: boolean
  activeStyling?: boolean
}) {
  if (auth) {
    return (
      <button
        id={id}
        type={type}
        disabled={!active}
        onClick={onClick}
        className={`h-[56px] items-center justify-center rounded-[16px] bg-primary px-[20px] py-[10px] text-[16px] font-bold leading-[] text-white ${
          isExpanded ? 'w-full' : 'w-fit'
        }`}
      >
        {text}
      </button>
    )
  }
  return (
    <button
      type={type}
      disabled={!active}
      onClick={onClick}
      className={`h-[40px] items-center justify-center rounded-[6px]  px-[20px] py-[10px] text-[14px] font-semibold leading-[]  ${
        isExpanded ? 'w-full' : 'w-fit'
      } ${
        !activeStyling
          ? !active
            ? 'bg-white text-disabled'
            : 'bg-black text-white'
          : !active
          ? 'cursor-pointer bg-black text-white'
          : 'cursor-pointer bg-slate-50 text-disabled hover:bg-black hover:text-white'
      }`}
    >
      {text}
    </button>
  )
}
