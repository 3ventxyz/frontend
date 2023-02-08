// author: marthel
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'
import { Button } from '../buttons/button'
import { useConnectModal, ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import SignInButton from '../siwe'

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
    'cursor-pointer hidden md:block text-[14px] font-semibold pt-1 text-linkDisabled underline-offset-4 hover:underline'
  const activeHeaderTextButtonStyle =
    'cursor-pointer hidden md:block text-[14px] font-semibold pt-1 text-primary underline-offset-4 underline'
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
      <nav className="fixed top-0 left-0 z-50 flex h-[78px] w-full flex-row items-center justify-between bg-white px-[20px] md:px-[112px]">
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
          {!auth.isLoggedIn() && (
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
          )}
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
          <Link href="/creator">
            <p
              className={
                path === '/creator'
                  ? activeHeaderTextButtonStyle
                  : headerTextButtonStyle
              }
            >
              Creator
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
                <SignInButton
                  onSuccess={(address: any) => console.log(address)}
                  onError={(address: any) => console.log(address)}
                />
              </>
            ) : !auth.userModel?.wallet ? (
              <Button
                active={true}
                text={address ? address : 'Connect Wallet'}
                onClick={openConnectModal}
              />
            ) : (
              <Link href="/e/create">
                <Button
                  active={true}
                  text={'Create an Event'}
                  onClick={() => {
                    return
                  }}
                />
              </Link>
            )}
            <img
              alt="avatar"
              src="/assets/auth/avatar.svg"
              width="36"
              className="hover:cursor-pointer"
              onMouseEnter={() => {
                userMenuShow(userMenu, setUserMenu)
              }}
              onMouseLeave={() => {
                userMenuHide(userMenu, setUserMenu)
              }}
            />
            <div
              className={`absolute right-28 top-14 hover:block ${
                userMenu === false && 'hidden'
              }`}
              onMouseLeave={() => {
                userMenuHide(userMenu, setUserMenu)
              }}
            >
              <div className="h-[10px]" />
              <ul className="w-full min-w-[200px] list-none rounded-[15px] border-2 border-primary bg-primaryBg p-2 hover:block">
                <Link href="/u" className="w-full">
                  <li className="border-b-1 w-full cursor-pointer border-primary px-2 py-1 underline-offset-4 hover:underline active:font-bold active:underline">
                    Profile
                  </li>
                </Link>
                <Link href="/settings" className="w-full">
                  <li className="border-b-1 cursor-pointer border-primary px-2 py-1 underline-offset-4 hover:underline active:font-bold active:underline">
                    Settings
                  </li>
                </Link>
                <li className="border-b-1 cursor-pointer border-primary px-2 py-1 underline-offset-4 hover:underline active:font-bold active:underline">
                  <p
                    className="w-full cursor-pointer"
                    onClick={async () => await auth.logout()}
                  >
                    Log out
                  </p>
                </li>
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
          text={
            process.env.NODE_ENV === 'development'
              ? 'Quick Login'
              : 'Launch App'
          }
          onClick={() => {
            router.push('/login')
          }}
        />
      </nav>
    )
  }
}
