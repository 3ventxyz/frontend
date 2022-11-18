interface TextInputProps {
  id: string
  labelText: string
  placeholder?: string
  maxWidth?: number
  maxWidthForm?: number
  errorMsg?: string
  textArea?: boolean
  isDisabled?: boolean
  setValue: (value: string) => void
  width?: string
  xMargin?: string
}

export default function TextInput({
  labelText,
  placeholder,
  id,
  maxWidth = 400,
  maxWidthForm = 400,
  textArea = false,
  isDisabled = false,
  setValue,
  width = 'w-full',
  xMargin = 'mx-auto'
}: TextInputProps) {
  return (
    <form
      className={`mx-auto flex w-full max-w-[${maxWidthForm}px] flex-col items-start space-y-1 font-normal`}
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
          className={`${width} focus:shadow-outline leading-0 block max-w-[${maxWidth}px] min-h-[80px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
          id={id}
          placeholder={placeholder}
          disabled={isDisabled}
        ></textarea>
      )}
    </form>
  )
}
