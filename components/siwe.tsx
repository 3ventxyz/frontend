import { Button } from './buttons/button'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/auth'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { db } from '../services/firebase_config'
import { doc, updateDoc } from 'firebase/firestore'

export default function SignInButton({
  onSuccess,
  onError
}: {
  onSuccess: (args: { address?: string }) => void
  onError: (args: { error?: Error }) => void
}) {
  const [state, setState] = useState<{
    address?: string
    message?: string
    error?: Error
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
    const handler = async () => {
      try {
        const res = await fetch('api/me')
        const { address } = await res.json()

        if (address && isSiweValid()) {
          setState((x) => ({ ...x, address }))
          onSuccess({ address })
        } else {
          signOut()
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchNonce()
    handler()
    window.addEventListener('focus', handler)

    return () => window.removeEventListener('focus', handler)
  }, [])

  const isSiweValid = () => {
    if (auth?.userModel?.siwe_expiration_time) {
      if (Date.parse(auth?.userModel?.siwe_expiration_time) > Date.now()) {
        return true
      }
    }
    return false
  }

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
        nonce: state.nonce,
        expirationTime: new Date(Date.now() + 86400000).toISOString()
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

      setState((x) => ({ ...x, address, loading: false }))
      onSuccess({ address })

      // UPDATE DB
      try {
        const docRef = doc(db, 'users', auth.uid)
        await updateDoc(docRef, {
          wallet: address,
          siwe_expiration_time: message.expirationTime ?? ''
        })
        console.log('Data written into doc ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding data: ', e)
      }

      // UPDATE AUTH CONTEXT
      if (auth?.userModel) {
        var authModelCopy = { ...auth.userModel }
        authModelCopy.wallet = address
        authModelCopy.siwe_expiration_time = message.expirationTime ?? ''
        auth.setUserModel(authModelCopy)
      }
    } catch (error) {
      setState((x) => ({ ...x, loading: false, nonce: undefined }))
      onError({ error: error as Error })
      fetchNonce()
    }
  }

  const signOut = async () => {
    const res = await fetch('/api/logout', {
      method: 'GET'
    })
    onSuccess({})
    setState({})
  }

  // useEffect(() => {
  //   if (((state.nonce && !state.loading) || false) && !invoked) {
  //     console.log('attempt sign in')
  //     signIn()
  //     setInvoked(true)
  //   }
  // }, [state.nonce, state.loading])

  return (
    <>
      {!isSiweValid() && (
        <Button
          active={(state.nonce && !state.loading) || false}
          text={'Verify Wallet'}
          onClick={signIn}
        />
      )}
    </>
  )
}
