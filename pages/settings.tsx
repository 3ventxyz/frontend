import Image from 'next/image'
import { useState, useEffect } from 'react'
import TextInputDisplay from '../components/textInputDisplay'
import { useAuth } from '../contexts/auth'
import Verify from './profile-settings'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'

export default function Settings() {
  const auth = useAuth()
  const { openConnectModal } = useConnectModal()
  const { address } = useAccount()

  useEffect(() => {
    console.log(address)
  }, [address])

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
            {address ? (
              <SignInButton
                onSuccess={(address: any) => console.log(address)}
                onError={(address: any) => console.log(address)}
              />
            ) : (
              <button
                onClick={openConnectModal}
                className="relative mt-2 h-[31px] w-[105px] cursor-pointer"
              >
                <Image src="/assets/add.svg" layout="fill" loading="lazy" />
              </button>
            )}
          </div>
          <Verify />
        </div>
      </div>
    </div>
  )
}

function SignInButton({
  onSuccess,
  onError
}: {
  onSuccess: (args: { address: string }) => void
  onError: (args: { error: Error }) => void
}) {
  const [state, setState] = useState<{
    loading?: boolean
    nonce?: string
  }>({})

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch('/api/siwe/nonce')
      const nonce = await nonceRes.text()
      setState((x) => ({ ...x, nonce }))
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error }))
    }
  }

  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  useEffect(() => {
    fetchNonce()
  }, [])

  const { address } = useAccount()
  const { chain: activeChain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  const signIn = async () => {
    try {
      const chainId = activeChain?.id
      if (!address || !chainId) return

      setState((x) => ({ ...x, loading: true }))
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: state.nonce
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage()
      })

      // Verify signature
      const verifyRes = await fetch('/api/siwe/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, signature })
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, loading: false }))
      onSuccess({ address })
    } catch (error) {
      setState((x) => ({ ...x, loading: false, nonce: undefined }))
      onError({ error: error as Error })
      fetchNonce()
    }
  }

  return (
    <button disabled={!state.nonce || state.loading} onClick={signIn}>
      Sign-In with Ethereum
    </button>
  )
}
