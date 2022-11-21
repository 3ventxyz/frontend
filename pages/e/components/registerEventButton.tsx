export default function RegisterEventButton({
  setShowModal
}: {
  setShowModal: (toggle: boolean) => void
}) {
  return (
    <div
      id="register-event-button"
      className="flex h-[85px] items-center justify-center rounded-2xl bg-[#DE6767] shadow-md transition-shadow hover:cursor-pointer hover:shadow-xl"
    >
      <button
        onClick={() => {
          setShowModal(true)
        }}
        className="h-full w-full"
      >
        <div className="text-[20px] font-bold text-white">Register Event</div>
      </button>
    </div>
  )
}
