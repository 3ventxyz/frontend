import React, { FormEvent, useState } from 'react'
import { useAuth } from '../../contexts/auth'
import { useRouter } from 'next/router'
import Button from '../../components/button'
import Link from 'next/link'
import AuthInput from '../../components/inputs/authInput'

export default function Login() {
  const emailRef = React.createRef<HTMLInputElement>()
  const passwordRef = React.createRef<HTMLInputElement>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const auth = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await auth.login({
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      })
      console.log('log in success')
      router.push('/mint')
    } catch {
      setError('Failed to log in')
      console.log('log in error')
    }
    setLoading(false)
  }

  return (
    <div className="p-auto flex flex-grow flex-col items-center justify-center bg-secondaryBg">
      <h3 className="text-[32px]">Welcome Back!</h3>
      <p className="p2 w-[240px] text-center text-primary">
        Login to your account to get this party started 🎉
      </p>
      <form action="" onSubmit={handleSubmit}>
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
        <div className="mb-6 flex items-center justify-between">
          <a
            href="#!"
            className="text-secondaryDark hover:text-tertiaryDark focus:text-primaryDark active:text-primaryDark transition duration-200 ease-in-out"
          >
            Forgot password?
          </a>
        </div>
        <Button
          text="LOGIN"
          active={!loading}
          onClick={() => null}
          type="submit"
        />
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="text-primaryDark mx-4 mb-0 text-center font-semibold">
            Don&apos;t have an account?
          </p>
        </div>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </form>
    </div>
  )
}
