interface TextInputProps {
  /**id for the DOM */
  id: string
  /** title for the input */
  labelText: string
  /** hint for the input */
  placeholder?: string
  /** maximum width of the input component*/
  maxWidth?: number
  /** maximum width of the father div. */
  maxWidthForm?: number
  /** displays the error message below the main component. */
  errorMsg?: string
  /** enables the text area element. */
  textArea?: boolean
  /**disables the ability to change the value */
  isDisabled?: boolean
  /**setter that sets the value */
  setValue: (value: string) => void
  /** width of the element */
  width?: string
  /**height of the element */
  height?: string
  /**horizontal margin of the element */
  xMargin?: string
}

/**Text input for general use */
export function TextInput({
  labelText,
  placeholder,
  id,
  maxWidth = 400,
  maxWidthForm = 400,
  textArea = false,
  isDisabled = false,
  setValue,
  width = 'w-full',
  height = 'w-full',
  xMargin = 'mx-auto'
}: TextInputProps) {
  return (
    <form
      className={`${xMargin} flex w-full max-w-[${maxWidthForm}px] flex-col items-start space-y-1 font-normal`}
    >
      <label
        className="mb-2 block text-sm font-medium text-gray-900"
        htmlFor={id}
      >
        {labelText.toUpperCase()}
      </label>
      {textArea !== true ? (
        <input
          onChange={(e) => setValue(e.target.value)}
          className={`${width} focus:shadow-outline leading-0 block h-full max-w-[500px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
          id={id}
          type="text"
          placeholder={placeholder}
          disabled={isDisabled}
        />
      ) : (
        <textarea
          onChange={(e) => setValue(e.target.value)}
          name="textarea"
          className={`${width} focus:shadow-outline leading-0 block max-w-[${maxWidth}px] min-h-[80px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
          id={id}
          placeholder={placeholder}
          disabled={isDisabled}
        ></textarea>
      )}
    </form>
  )
}
