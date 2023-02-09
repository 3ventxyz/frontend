interface TextInputDisplayProps {
  labelText: string
  bodyText: string
}

export function TextInputDisplay({
  labelText,
  bodyText
}: TextInputDisplayProps) {
  if (labelText === 'Phone Number' && bodyText.startsWith('+1')) {
    bodyText =
      '+1 (' +
      bodyText.slice(2, 5) +
      ')-' +
      bodyText.slice(5, 8) +
      '-' +
      bodyText.slice(8)
  }

  return (
    <form className="flex w-full flex-col items-start space-y-1 text-[16px] font-semibold">
      <p>{labelText}</p>
      <p className="flex min-h-[48px] w-full flex-wrap items-center justify-start break-all rounded-[10px] border-[1px] border-black bg-white px-4 py-2 leading-[24px] text-secondary">
        {bodyText}
      </p>
    </form>
  )
}
