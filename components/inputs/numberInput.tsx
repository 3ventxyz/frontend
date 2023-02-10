interface NumberInputProps {
  /**passed function that updates the value, based from the passed name */
  setNumberValue: (name: string, value: number) => void
  /**the name of the variable to update */
  name: string
  /** the title of the input */
  labelText: string
  /**disables the ability to change the value */
  disabled?: boolean
}

/**
 * input that only accepts numeric values
 */
export function NumberInput({
  setNumberValue,
  name,
  labelText,
  disabled = false
}: NumberInputProps) {
  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
      <label className="mb-2 block text-sm font-medium text-gray-900 ">
        {labelText}
      </label>
      <input
        onChange={(e) => {
          setNumberValue(name, parseInt(e.target.value))
        }}
        className={`focus:shadow-outline leading-0 h-full w-full max-w-[400px] rounded-lg border-[1.5px] p-2.5 text-sm ${
          disabled
            ? 'border-gray-300  text-gray-300'
            : 'bg-gray-50   text-gray-700'
        } px-2  focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
        id={'event_ticket_max'}
        type="number"
        placeholder={'0'}
        disabled={disabled}
      />
    </div>
  )
}
