import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useAuth } from '../contexts/auth'
import {TextInputDisplay} from '../components/inputs/textInputDisplay'
import SignInButton from '../components/siwe'
import Verify from '../components/auth/verify'
import { Button } from '../components/buttons/button'
import EmailVerification from './u/components/emailVerification'
import { useState } from 'react'

export default function Settings() {
  const auth = useAuth()
  const { openConnectModal } = useConnectModal()
  const { address } = useAccount()

  return (
    <div className="flex flex-grow bg-secondaryBg py-[78px]">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-start justify-start space-y-8 px-2 sm:px-0">
        {/* TITLE AND HEADER */}
        <h3 className="w-full max-w-[600px] border-b border-disabled">
          Settings
        </h3>
        {/* PROFILE INFORMATION */}
        <div className="flex w-full flex-col space-y-5 px-2 md:px-8">
          {/* NUMBER */}
          <TextInputDisplay
            labelText={'Phone Number'}
            bodyText={
              auth?.userModel?.phone_number || 'no phone number connected'
            }
          />
          {/* WALLET ADDRESS */}
          <div className="flex flex-col space-y-2">
            <TextInputDisplay
              labelText={'Verified Wallet Address'}
              bodyText={auth?.userModel?.wallet || 'no wallet verified'}
            />
            {/* TODO: this should actually check iron session + expiry */}
            {address ? (
              <SignInButton
                onSuccess={(address: any) => console.log(address)}
                onError={(address: any) => console.log(address)}
              />
            ) : (
              <Button
                active={true}
                text={address ? address : 'Connect Wallet'}
                onClick={openConnectModal}
              />
            )}
          </div>
          {/*EMAIL*/}
          <EmailVerification />
          <Verify twitter={true} discord={true} />
        </div>
      </div>
    </div>
  )
}
