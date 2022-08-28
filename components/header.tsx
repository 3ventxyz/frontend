// author: marthel
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/auth'
import Button from './button'
import { useConnectModal, ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import SignInButton from './siwe'

const userMenuShow = (userMenu: boolean, setUserMenu: any) => {
  setUserMenu(true)
  return userMenu
}
const userMenuHide = (userMenu: boolean, setUserMenu: any) => {
  setUserMenu(false)
  return userMenu
} 

export default function Header() {
  const headerTextButtonStyle =
    'cursor-pointer hidden md:block text-[14px] font-semibold text-linkDisabled underline-offset-4 hover:underline'
  const activeHeaderTextButtonStyle =
    'cursor-pointer hidden md:block text-[14px] font-semibold text-primary underline-offset-4 underline'
  const router = useRouter()
  const [path, setPath] = useState('')
  const auth = useAuth()
  const { openConnectModal } = useConnectModal()
  const { address } = useAccount()
  const [userMenu, setUserMenu] = useState(false)
  
  // determines which path or sub element we are focused on
  useEffect(() => {
    const pathParts = router.asPath.split('#')
    if (pathParts.length >= 2) {
      const hash = pathParts.slice(-1)[0]
      setPath(hash)
    } else {
      setPath(router.asPath)
    }
  }, [router.asPath])

  if (auth.currentUser) {
    // NAVBAR: LOGGED IN, APP LAUNCHED
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
          <Link href="/dashboard">
            <p
              className={
                path.includes('dashboard')
                  ? activeHeaderTextButtonStyle
                  : headerTextButtonStyle
              }
            >
              Dashboard
            </p>
          </Link>
          <Link href="/settings">
            <p
              className={
                path.includes('settings')
                  ? activeHeaderTextButtonStyle
                  : headerTextButtonStyle
              }
            >
              Settings
            </p>
          </Link>
        </div>
        {auth.currentUser ? (
          <div className="flex flex-row gap-x-4">
            {address ? (
              <>
                <ConnectButton
                  accountStatus="address"
                  chainStatus="none"
                  showBalance={false}
                />
                {/* TODO: this should actually check iron session + expiry */}
                {!auth.userModel?.wallet && (
                  <SignInButton
                    onSuccess={(address: any) => console.log(address)}
                    onError={(address: any) => console.log(address)}
                  />
                )}
              </>
            ) : (
              <Button
                active={true}
                text={address ? address : 'Connect Wallet'}
                onClick={openConnectModal}
              />
            )}
            <img
              alt="avatar"
              src="/assets/auth/avatar.svg"
              width="36"
              onClick={async () => await auth.logout()}
              className="hover:cursor-pointer"
              onMouseEnter={() => {
                userMenuShow(userMenu, setUserMenu)
              }}
            />
            <div>
              <ul className={`list-none absolute border-2 border-primary top-16 right-24 bg-primaryBg hover:block ${userMenu ? '' : 'hidden'}`}               
              onMouseLeave={() => {
                userMenuHide(userMenu, setUserMenu)
              }}
              >
                <li className="px-2 py-1 border-b-1 border-primary hover:underline underline-offset-4 active:underline active:font-bold"><Link href="#">Profile</Link></li>
                <li className="px-2 py-1 border-b-1 border-primary hover:underline underline-offset-4 active:underline active:font-bold"><Link href="#">Settings</Link></li>
                <li className="px-2 py-1 border-b-1 border-primary hover:underline underline-offset-4 active:underline active:font-bold"><Link href="#">Log out</Link></li>
              </ul>
            </div>
          </div>
        ) : (
          <Button
            active={true}
            text={'Login'}
            onClick={() => {
              router.push('/login')
            }}
          />
        )}
      </nav>
    )
  } else {
    // NAVBAR: LANDING PAGE
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
        <Button
          active={true}
          text={'Launch App'}
          onClick={() => {
            router.push('/login')
          }}
        />
      </nav>
    )
  }
}
