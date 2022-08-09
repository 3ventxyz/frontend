// author: marthel
export default function Modal({
  visible,
  onClose
}: {
  visible: boolean
  onClose: () => void
}) {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') {
      onClose()
    }
  }
  if (!visible) return null
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="backdrop-blue-sm fixed inset-0 flex items-center justify-center bg-black bg-opacity-25"
    >
      <div className="w-72 rounded bg-white p-2">modal children</div>
    </div>
  )
}
