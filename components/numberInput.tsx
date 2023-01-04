export default function NumberInput({
  setValue,
  disabled = false
}: {
  setValue: (value: number) => void
  disabled?: boolean
}) {
  return (
    <input
      onChange={(e) => {
        setValue(parseInt(e.target.value))
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
  )
}
