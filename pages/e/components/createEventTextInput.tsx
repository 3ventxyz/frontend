interface TextInputProps {
  id: string
  labelText: string
  placeholder?: string
  maxWidth?: number
  maxWidthForm?: number
  errorMsg?: string
  textArea?: boolean
  isDisabled?: boolean
  setTextValue: (name: string, value: string) => void
  name: string
  width?: string
  height?: string
  xMargin?: string
}

export default function CreateEventTextInput({
  labelText,
  placeholder,
  id,
  maxWidth = 400,
  maxWidthForm = 400,
  textArea = false,
  isDisabled = false,
  setTextValue,
  name,
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
          onChange={(e) => setTextValue(name, e.target.value)}
          className={`${width} focus:shadow-outline leading-0 block h-full max-w-[500px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
          id={id}
          type="text"
          placeholder={placeholder}
          disabled={isDisabled}
        />
      ) : (
        <textarea
          onChange={(e) => setTextValue(name, e.target.value)}
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
