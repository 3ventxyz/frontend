interface ButtonOutlinedProps {
  /**
   * text that will be displayed on the button.
   */
  text: string
  /**
   * function that will be executed.
   */
  onClick: () => void
  /**
   * sets is active or not.
   */
  active: boolean
  /**
   * defines the type of button usage.
   */
  type?: 'button' | 'submit' | 'reset' | undefined
  /**
   * expands the width of the button.
   */
  isExpanded?: boolean
  /**
   * path to icon.
   */
  icon?: string
  /**
   * text description of the icon.
   */
  iconAlt?: string
}

/**
 *  Outlined UI Button. It will execute the passed function when pressed.
 */
export function ButtonOutlined({
  text,
  onClick,
  active,
  type = 'button',
  isExpanded = false,
  icon,
  iconAlt
}: ButtonOutlinedProps) {
  return (
    <button
      type={type}
      disabled={!active}
      onClick={onClick}
      className={`h-[40px] items-center justify-center rounded-[6px] border border-primary bg-transparent px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-primary ${
        isExpanded ? 'w-full' : 'w-fit'
      } flex flex-row gap-x-2`}
    >
      {icon && <img alt={iconAlt} src={icon} width="20" />}
      {text}
    </button>
  )
}
