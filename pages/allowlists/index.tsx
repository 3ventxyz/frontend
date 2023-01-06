import Allowlists from '../../components/allowlist/allowlist'

export default function Allowlist() {
  return (
    <div className="flex w-screen flex-col space-y-[35px] bg-secondaryBg px-[20px] pb-[106px] pt-[35px] text-center md:px-[112px]">
      <Allowlists />
    </div>
  )
}

// Allowlists.requireAuth = true
