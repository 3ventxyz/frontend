// author: marthel
export default function Spinner() {
  return (
    <div
      className="h-[100px] w-[100px] animate-spin rounded-full border-4 border-solid border-blue-400 border-t-white/[.00]"
      role="status"
    >
      <span className="hidden">Loading...</span>
    </div>
  )
}
