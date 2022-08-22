interface ErrorAlertProps {
  onClose: () => void
  title?: string
  description?: string
}

export default function ErrorAlert({
  title = '',
  description = '',
  onClose
}: ErrorAlertProps) {
  return (
    <div
      className="text-error relative my-3 w-full rounded border border-red-400 bg-red-100 py-3 px-4 "
      role="alert"
    >
      <strong className="pr-2 font-bold">{title}</strong>
      <span className="block sm:inline">{description}</span>
      <span className="absolute inset-y-0 right-0 py-3 px-4">
        <svg
          className="text-error h-6 w-6 fill-current"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={onClose}
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  )
}
