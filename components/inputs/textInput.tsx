interface TextInputProps {
  id: string
  labelText: string
  placeholder?: string
  errorMsg?: string
  textArea?: boolean
  isDisabled?: boolean
  setValue: (value: string) => void
  width?: string
  xMargin?: string
}

/**Function: TextInput
 **Inputs:
 *  -id: string, id for the submitted form.
 *  -labelText: string, text that is displayed above the input.
 *  -placeholder?: string, text that shows an example usage.
 *  -textArea?: boolean (defualt: false), option that enables textArea component.
 *  -isDisabled?: boolean, option that enables user to input text.
 *  -setValue: (value: string) => void, function that sets the inputted text value.
 *  -width?: string (default: 'w-full'), tailwindcss class for the component's width.
 *  -xMargin?: string (default: 'mx-auto'), tailwindcss class for the component's horizontal margin.
 * 
*/
export default function TextInput({
  id,
  labelText,
  placeholder,
  textArea = false,
  isDisabled = false,
  setValue,
  width = 'w-full',
  xMargin = 'mx-auto'
}: TextInputProps) {
  return (
    <form className={`${xMargin} flex w-full max-w-[400px] flex-col items-start space-y-1 font-normal`}>
      <label
        className="mb-2 block text-sm font-medium text-gray-900"
        htmlFor={id}
      >
        {labelText.toUpperCase()}
      </label>
      {textArea !== true ? (
        <input
          onChange={(e) => setValue(e.target.value)}
          className={`${width} focus:shadow-outline leading-0 block max-w-[400px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
          id={id}
          type="text"
          placeholder={placeholder}
          disabled={isDisabled}
        />
      ) : (
        <textarea
          onChange={(e) => setValue(e.target.value)}
          name="textarea"
          className={`${width} focus:shadow-outline leading-0 block max-w-[400px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
          id={id}
          placeholder={placeholder}
          disabled={isDisabled}
        ></textarea>
      )}
    </form>
  )
}
