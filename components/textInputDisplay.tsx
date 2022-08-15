interface TextInputDisplayProps {
  labelText: string
  bodyText: string
}

export default function TextInputDisplay({
  labelText,
  bodyText
}: TextInputDisplayProps) {
  return (
    <form className="flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-semibold">
      <p>{labelText}</p>
      <p className="flex min-h-[48px] w-full max-w-[400px] flex-wrap items-center justify-start break-all rounded-[10px] border-[1px] border-black bg-white px-4 py-2 leading-[24px] text-secondary">
        {bodyText}
      </p>
    </form>
  )
}
