export default function Button({
  text,
  onClick,
  active
}: {
  text: string
  onClick: () => void
  active: boolean
}) {
  return (
    <button
      disabled={!active}
      onClick={onClick}
      className="h-[40px] w-fit items-center justify-center rounded-[6px] bg-primary px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-white"
    >
      {text}
    </button>
  )
}
