// author: marthel
import Button from './button'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  const headerTextButtonStyle =
    'cursor-pointer hidden md:block text-[14px] font-semibold text-linkDisabled underline-offset-4 hover:underline'
  const activeHeaderTextButtonStyle =
    'cursor-pointer hidden md:block text-[14px] font-semibold text-primary underline-offset-4 underline'
  const { asPath } = useRouter()
  const [path, setPath] = useState('')

  // determines which path or sub element we are focused on
  useEffect(() => {
    const pathParts = asPath.split('#')
    if (pathParts.length >= 2) {
      const hash = pathParts.slice(-1)[0]
      setPath(hash)
    } else {
      setPath('')
    }
  }, [asPath])

  return (
    <nav className="fixed top-0 left-0 z-10 flex h-[78px] w-full flex-row items-center justify-between bg-white px-[20px] md:px-[112px]">
      <div className="flex flex-row items-center space-x-[32px]">
        <Link href="/">
          <div className="flex cursor-pointer flex-row items-center">
            <img
              src={'/assets/logo-icon.svg'}
              className="mr-[8px]"
              alt="3vent logo icon"
            />
            <p className="text-[30px] font-medium tracking-[1px]">3vent</p>
          </div>
        </Link>
        <Link href="/">
          <p
            className={
              path === '/' || path === 'features'
                ? activeHeaderTextButtonStyle
                : headerTextButtonStyle
            }
          >
            Home
          </p>
        </Link>
        <Link href="/details#details-features">
          <p
            className={
              path === 'details-features'
                ? activeHeaderTextButtonStyle
                : headerTextButtonStyle
            }
          >
            Features
          </p>
        </Link>
        <Link href="/details#details-pricing">
          <p
            className={
              path === 'details-pricing'
                ? activeHeaderTextButtonStyle
                : headerTextButtonStyle
            }
          >
            Pricing
          </p>
        </Link>
        <Link href="/dashboard">
          <p
            className={
              path === '/dashboard'
                ? activeHeaderTextButtonStyle
                : headerTextButtonStyle
            }
          >
            Dashboard
          </p>
        </Link>
      </div>
      {path === '/mint' ? (
        <ConnectButton />
      ) : (
        // <Button
        //   active={true}
        //   text={'Connect Wallet'}
        //   onClick={() => {
        //     return
        //   }}
        // />
        <a
          href="https://forms.gle/LzvnhgUnw8TabykB8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            active={true}
            text={'Apply for Beta'}
            onClick={() => {
              return
            }}
          />
        </a>
      )}
    </nav>
  )
}
