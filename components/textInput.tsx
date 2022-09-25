interface TextInputProps {
  id: string
  labelText: string
  name: string
  placeholder?: string
  maxWidth?: number
  errorMsg?: string
  textArea?: boolean
  isDisabled?: boolean
  setValue: (value: string) => void
  width?: string
}

export default function TextInput({
  labelText,
  placeholder,
  id,
  name,
  maxWidth,
  errorMsg = '',
  textArea = false,
  isDisabled = false,
  setValue,
  width = 'w-full'
}: TextInputProps) {
  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
      <label htmlFor={id}>{labelText}</label>
      {textArea !== true ? (
        <input
          name={name}
          onChange={(e) => setValue(e.target.value)}
          className={`${width} focus:shadow-outline leading-0 h-full min-h-[56px] max-w-[400px] rounded-[16px] border-[1.5px] ${
            isDisabled
              ? 'border-gray-300  text-gray-300'
              : 'border-black  text-gray-700'
          } px-2  focus:outline-none`}
          id={id}
          type="text"
          placeholder={placeholder}
          disabled={isDisabled}
        />
      ) : (
        <textarea
          onChange={(e) => setValue(e.target.value)}
          name="textarea"
          className={`${width} focus:shadow-outline leading-0 h-full min-h-[100px] max-w-[400px] rounded-[16px] border-[1.5px]  ${
            isDisabled
              ? 'border-gray-300  text-gray-300'
              : 'border-black  text-gray-700'
          } p-2  focus:outline-none`}
          id={id}
          placeholder={placeholder}
          disabled={isDisabled}
        ></textarea>
      )}
      <div
        className={`${
          errorMsg === '' ? 'hidden' : 'block'
        } ml-[20px] text-red-600`}
      >
        {errorMsg}
      </div>
    </div>
  )
}
