// author: marthel

/**TODO add description for this one. */
export default function Spinner({width=100, height=100}:{width?:number, height?:number}) {
  return (
    <div
      className={`h-[${height}px] w-[${width}px] animate-spin rounded-full border-4 border-solid border-blue-400 border-t-white/[.00]`}
      role="status"
    >
      <span className="hidden">Loading...</span>
    </div>
  )
}
