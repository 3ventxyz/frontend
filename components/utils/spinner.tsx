// author: marthel
interface SpinnerProps {
  /**
   * width of the spinner
   */
  width?: number
  /**
   * height of the spinner
   */
  height?: number
}

export function Spinner({ width = 100, height = 100 }: SpinnerProps) {
  return (
    <div
      className={`h-[${height}px] w-[${width}px] animate-spin rounded-full border-4 border-solid border-blue-400 border-t-white/[.00]`}
      role="status"
    >
      <span className="hidden">Loading...</span>
    </div>
  )
}
