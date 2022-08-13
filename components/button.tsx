export default function Button({
  text,
  onClick,
  active,
  type = 'button',
  isExpanded = false
}: {
  text: string
  onClick: () => void
  active: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  isExpanded?: boolean
}) {
  return (
    <button
      type={type}
      disabled={!active}
      onClick={onClick}
      className={`h-[40px] items-center justify-center rounded-[6px] bg-primary px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-white ${
        isExpanded ? 'w-full' : 'w-fit'
      }`}
    >
      {text}
    </button>
  )
}
