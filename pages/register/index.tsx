import React, { FormEvent, useState } from 'react'
import { useAuth } from '../../contexts/auth'
import { useRouter } from 'next/router'
import Button from '../../components/button'
import Link from 'next/link'
import AuthInput from '../../components/inputs/authInput'
import ButtonOutlined from '../../components/buttonOutlined'
import ErrorAlert from '../../components/alerts/errorAlert'

export default function Register() {
  const emailRef = React.createRef<HTMLInputElement>()
  const passwordRef = React.createRef<HTMLInputElement>()
  const passwordConfirmRef = React.createRef<HTMLInputElement>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const auth = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)

      await auth.register({
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      })
      console.log('register success')
      router.push('/register/verify')
    } catch {
      setError('Failed to register')
      console.log('register error')
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    try {
      setError('')
      setLoading(true)

      await auth.signInWithGoogle()
      console.log('register success')
      router.push('/register/verify')
    } catch {
      setError('Failed to register')
      console.log('google register error')
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-grow items-center justify-center bg-secondaryBg py-[40px] px-[20px] sm:px-[56px] md:px-[112px]">
      <div className="p-auto flex max-w-[343px] flex-grow flex-col items-center gap-y-6">
        <div className="flex w-full flex-col items-center">
          <h3 className="mb-2 w-full text-center text-[32px]">
            Join the Party!🎉
          </h3>
          <p className="p2 text-center text-primary">
            Create an account to get started.
          </p>
        </div>
        {error && (
          <ErrorAlert
            title="Holy Smokes!"
            description={error}
            onClose={() => setError('')}
          />
        )}
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-y-6"
        >
          {/* email input */}
          <AuthInput
            id="email"
            type="email"
            labelText="Email"
            inputRef={emailRef}
            placeholder="Ex: abc@example.com"
            icon="assets/auth/atSign.svg"
          />
          {/* password input */}
          <AuthInput
            id="password"
            type="password"
            labelText="Your Password"
            inputRef={passwordRef}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            icon="assets/auth/lock.svg"
          />
          {/* password confirmation */}
          <AuthInput
            id="password-confirm"
            type="password"
            labelText="Password Confirmation"
            inputRef={passwordConfirmRef}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            icon="assets/auth/lock.svg"
          />
          <Button
            text="Sign Up"
            active={!loading}
            onClick={() => null}
            type="submit"
            isExpanded={true}
          />
          <div className="border-[1px] border-t border-primary"></div>
          <ButtonOutlined
            text="Continue with Google"
            active={!loading}
            onClick={handleGoogleLogin}
            isExpanded={true}
            icon="assets/auth/google.svg"
          />
        </form>
        <p className="p2 mx-4 mb-0 text-center text-primary">
          Already have an account?
          <span className="ml-[6px] cursor-pointer text-linkText underline">
            <Link href="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  )
}
