// author: marthel
import Link from 'next/link'

export default function Footer() {
  const footerTextButtonStyle =
    'font-medium text-[#4B5563] underline-offset-4 hover:underline cursor-pointer'
  return (
    <footer className=" flex w-full flex-col px-[20px] py-[30px] md:px-[112px] lg:py-[80px]">
      <hr />
      <div className="my-[24px] mx-[14px] flex flex-col items-center justify-between space-y-[15px] lg:flex-row lg:space-y-0">
        <Link href="">
          <div className="flex w-[130px] cursor-pointer flex-row items-center">
            <img
              src={'/assets/logo-icon.svg'}
              className="mr-[8px]"
              alt="3vent logo icon"
            />
            <p className="text-[30px] font-medium tracking-[1px]">3vent</p>
          </div>
        </Link>
        <div className="grid content-center justify-center gap-y-[10px] gap-x-[32px] text-center lg:grid-cols-5 lg:gap-y-0">
          <Link href="/details#details-features">
            <p className={`${footerTextButtonStyle}`}>Feature</p>
          </Link>
          <Link href="/details#details-pricing">
            <p className={`${footerTextButtonStyle}`}>Pricing</p>
          </Link>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:contact@3vent.xyz"
            className={` ${footerTextButtonStyle}`}
          >
            Contact
          </a>
          <Link href="/tos">
            <p className={`${footerTextButtonStyle}`}>Terms</p>
          </Link>
          <Link href="/privacy">
            <p className={`${footerTextButtonStyle}`}>Privacy</p>
          </Link>
        </div>
        <div className="flex w-[130px] flex-row justify-center lg:justify-end">
          <a
            href="https://twitter.com/intent/follow?screen_name=3ventxyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={'/assets/twitter.svg'}
              className="h-[27px] w-[27px]"
              alt="twitter logo icon"
            />
          </a>
        </div>
      </div>
      <p className="mx-auto text-[12px] font-medium text-secondary">
        © 2022 3vent. All Rights Reserved.
      </p>
    </footer>
  )
}
