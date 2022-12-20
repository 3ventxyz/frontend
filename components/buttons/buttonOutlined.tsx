/**ButtonOutlined
 * parameters:
 *    --text: todo test this component.
 *    --onClick: todo test this component.
 *    --active: todo test this component.
 *    --type: todo test this component.
 *    --isExpanded: todo test this component.
 *    --icon: todo test this component.
 *    --iconAlt: todo test this component.
 * move to buttons directory.
 */


export default function ButtonOutlined({
  text,
  onClick,
  active,
  type = 'button',
  isExpanded = false,
  icon,
  iconAlt
}: {
  text: string
  onClick: () => void
  active: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  isExpanded?: boolean
  icon?: string
  iconAlt?: string
}) {
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
