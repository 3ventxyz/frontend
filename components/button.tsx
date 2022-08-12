export default function Button({
  text,
  onClick,
  active,
  type = 'button',
  activeStyling = false
}: {
  text: string
  onClick: () => void
  active: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  activeStyling?: boolean
}) {
  if (!activeStyling) {
    return (
      <button
        type={type}
        disabled={!active}
        onClick={onClick}
        className={`${
          !active ? 'bg-white text-disabled' : 'bg-black text-white'
        } h-[40px] w-fit items-center justify-center rounded-[6px] px-[20px] py-[10px] text-[14px] font-semibold leading-[] `}
      >
        {text}
      </button>
    )
  } else {
    return (
      <button
        type={type}
        disabled={!active}
        onClick={onClick}
        className={`
      ${
        !active
          ? 'bg-black text-white'
          : 'bg-white text-disabled hover:bg-black hover:text-white'
      }
      h-[40px] w-fit cursor-pointer items-center justify-center rounded-[6px] border px-[20px] py-[10px] text-[14px]  font-semibold`}
      >
        {text}
      </button>
    )
  }
}
