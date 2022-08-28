interface TextInputProps {
  id: string
  labelText: string
  placeholder?: string
  maxWidth?: number
  textArea?: boolean
  isDisabled?: boolean
  setValue: (value: string) => void
}

export default function TextInput({
  labelText,
  placeholder,
  id,
  maxWidth,
  textArea = false,
  isDisabled = false,
  setValue
}: TextInputProps) {
  return (
    <form className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
      <label htmlFor={id}>{labelText}</label>
      {textArea !== true ? (
        <input
          onChange={(e) => setValue(e.target.value)}
          className={`focus:shadow-outline leading-0 h-full min-h-[56px] w-full max-w-[400px] rounded-[16px] border-[1.5px] ${
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
          className={`focus:shadow-outline leading-0 h-full min-h-[100px] w-full max-w-[400px] rounded-[16px] border-[1.5px]  ${
            isDisabled
              ? 'border-gray-300  text-gray-300'
              : 'border-black  text-gray-700'
          } p-2  focus:outline-none`}
          id={id}
          placeholder={placeholder}
          disabled={isDisabled}
        ></textarea>
      )}
    </form>
  )
}