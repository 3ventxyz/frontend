// author: marthel
//TODO (09/17) update this name.

interface TicketRegTextInputProps {
  /**id of the element */
  id: string
  /**hint for the text input */
  placeholder: string
  /**name of the variable */
  inputName: string
  /**id for the html */
  htmlFor: string
  /**title for the input */
  labelTitle: string
  /**width of the input */
  width?: string
  /**height of the input */
  height?: string
}

/**text input for the event registration form */
export function TicketRegTextInput({
  id,
  placeholder,
  inputName,
  htmlFor,
  labelTitle,
  width = 'w-auto',
  height = 'h-[43px]'
}: TicketRegTextInputProps) {
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
