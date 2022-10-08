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
    console.log('header checking if emulators are active')
    console.log(process.env.FUNCTIONS_EMULATOR)
    console.log('=====================================')

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
          <Link href="/e/create">
            <p
              className={
                path === '/e/create'
                  ? activeHeaderTextButtonStyle
                  : headerTextButtonStyle
              }
            >
              Create an Event
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
              ? 'Quick login'
              : 'Launch App'
          }
          onClick={() => {
            //here I can add a special edge case.
            //if the page is connected to firebase emulators and is also running the auth emulator.
            //then make this button onClick, a super quick loggin, also later in the future it could redirect to a new page
            //where the user can select 2 or 3 dummy users so it can interact with each other.
            if (process.env.NODE_ENV === 'development') {
              //create a quick login and make a push to the logged in user.
              //sign in with password and pass the auth
              //and login as a regular user

              
              // const userDocRef = doc(db, 'users', result.user.uid)
              //     const userDocSnap = await getDoc(userDocRef)
              //     const data = userDocSnap.data()
              //     const userModel: UserModel = {
              //       phone_number: data?.phone_number,
              //       discord_id: data?.discord_id,
              //       discord_verified: data?.discord_verified,
              //       twitter_id: data?.twitter_id,
              //       twitter_verified: data?.twitter_verified,
              //       wallet: data?.wallet,
              //       siwe_expiration_time: data?.siwe_expiration_time
              //     }
              //     authContext.setUserModel(userModel)

                  router.push('/u')
            } else {
              router.push('/login')
            }
          }}
        />
      </nav>
    )
  }
}
