import Button from './button'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/auth'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { db } from '../services/firebase_config'
import { doc, updateDoc } from 'firebase/firestore'
import { sign } from 'crypto'

export default function SignInButton({
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
  const { address } = useAccount()
  const { chain: activeChain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  const [invoked, setInvoked] = useState(false)
  const auth = useAuth()

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch('/api/siwe/nonce')
      const nonce = await nonceRes.text()
      setState((x) => ({ ...x, nonce }))
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error }))
    }
  }

  useEffect(() => {
    fetchNonce()
  }, [])

  const signIn = async () => {
    try {
      const chainId = activeChain?.id
      if (!address || !chainId) return

      setState((x) => ({ ...x, loading: true }))

      // CREATE SIWE MESSAGE
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

      // VERIFY SIGNATURE
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

      // UPDATE DB
      try {
        const docRef = doc(db, 'users', auth.uid)
        await updateDoc(docRef, {
          wallet: address
        })
        console.log('Data written into doc ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding data: ', e)
      }

      // UPDATE AUTH CONTEXT
      if (auth?.userModel) {
        var authModelCopy = { ...auth.userModel }
        authModelCopy.wallet = address
        auth.setUserModel(authModelCopy)
      }
    } catch (error) {
      setState((x) => ({ ...x, loading: false, nonce: undefined }))
      onError({ error: error as Error })
      fetchNonce()
    }
  }

  // useEffect(() => {
  //   if (((state.nonce && !state.loading) || false) && !invoked) {
  //     console.log('attempt sign in')
  //     signIn()
  //     setInvoked(true)
  //   }
  // }, [state.nonce, state.loading])

  return (
    <Button
      active={(state.nonce && !state.loading) || false}
      text={'Verify Wallet'}
      onClick={signIn}
    />
  )
}
