// author: marthel
//TODO (09/17) update this name.
export function TicketRegTextInput({
  id,
  placeholder,
  inputName,
  htmlFor,
  labelTitle,
  width = 'w-auto',
  height = 'h-[43px]'
}: {
  id: string
  placeholder: string
  inputName: string
  htmlFor: string
  labelTitle: string
  width?: string
  height?: string
}) {
  return (
    <div className="flex flex-col">
      <label className="text-[12px] font-semibold" htmlFor={htmlFor}>
        {labelTitle}
      </label>
      <input
        className={`${height} ${width} rounded-[6px] border-[2px] border-inputUnselected pl-[12px] placeholder-placeholderUnselected placeholder:text-[13px] placeholder:font-semibold focus:border-inputSelected focus:placeholder-inputSelected`}
        id={id}
        type="text"
        name={inputName}
        placeholder={placeholder}
      />
    </div>
  )
}
