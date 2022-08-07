interface TextInputProps {
  id: string
  labelText: string
  placeholder?: string
  maxWidth?: number
}

export default function TextInput({
  labelText,
  placeholder,
  id,
  maxWidth
}: TextInputProps) {
  return (
    <form className="mx-auto flex w-full max-w-[400px] flex-col items-start text-[16px] font-normal">
      <label htmlFor={id}>{labelText}</label>
      <input
        className="focus:shadow-outline leading-0 h-[56px] w-full max-w-[400px] rounded-[16px] border-[1.5px] border-black px-2 text-gray-700 focus:outline-none"
        id={id}
        type="text"
        placeholder={placeholder}
      />
    </form>
  )
}
