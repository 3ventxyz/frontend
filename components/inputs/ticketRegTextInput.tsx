// author: marthel
//TODO (09/17) update this name.

/**
 *Function: TicketRegTextInput
 *inputs:
 * 	-id: string, unique id for the form.
 * 	-placeholder: string, text hint for using the input.
 * 	-inputName: string, name of the input.
 * 	-htmlFor: string, text that sets the html parameter for the form.
 * 	-labelTitle: string, label text that is displayed above the input.
 * 	-width?: string (default value: 'w-auto'), tailwindcss class that sets the component's width.
 * 	-height?: string (default value: 'h-[43px]'), tailwindcss class that sets the component's height.
 */
export default function TicketRegTextInput({
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