import Image from 'next/image'
import { useState, useEffect } from 'react'
import TextInputDisplay from '../components/textInputDisplay'
import { useAuth } from '../contexts/auth'
import Verify from './profile-settings'

export default function Settings() {
  const auth = useAuth()

  return (
    <div className="flex flex-grow bg-secondaryBg pt-[78px]">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-start justify-start space-y-8 px-2 sm:px-0">
        {/* TITLE AND HEADER */}
        <h3 className="w-full border-b border-disabled">Settings</h3>
        {/* PROFILE INFORMATION */}
        <div className="flex w-full flex-col space-y-5 px-2 md:px-8">
          {/* NUMBER */}
          <TextInputDisplay
            labelText={'Phone Number'}
            bodyText={auth.userModel?.phone_number || '+15551231234'}
          />
          {/* WALLET ADDRESS */}
          <div>
            <TextInputDisplay
              labelText={'Wallet Addresses'}
              bodyText={auth.userModel?.wallets[0] || 'no wallets connected'}
            />
            <button className="relative mt-2 h-[31px] w-[105px] cursor-pointer">
              <Image src="/assets/add.svg" layout="fill" loading="lazy" />
            </button>
          </div>
          <Verify />
        </div>
      </div>
    </div>
  )
}
