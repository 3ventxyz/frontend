import React, { FormEvent, useState } from 'react'
import { useAuth } from '../../contexts/auth'
import { useRouter } from 'next/router'
import Button from '../../components/button'
import Link from 'next/link'

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
    <div className="p-auto flex flex-grow items-center justify-center bg-secondaryBg">
      <form action="" onSubmit={handleSubmit}>
        {/* email input */}
        <div className="mb-6">
          <input
            type="text"
            className="text-primaryDark focus:text-secondaryDark bg-surfaceDark border-backgroundDark focus:border-tertiaryDark form-control m-0 block w-full rounded border border-solid bg-clip-padding py-2 px-4 text-xl font-normal transition ease-in-out focus:outline-none"
            placeholder="Email address"
            ref={emailRef}
            required
          />
        </div>
        {/* password input */}
        <div className="mb-6">
          <input
            type="password"
            className="text-primaryDark focus:text-secondaryDark bg-surfaceDark border-backgroundDark focus:border-tertiaryDark form-control m-0 block w-full rounded border border-solid bg-clip-padding py-2 px-4 text-xl font-normal transition ease-in-out focus:outline-none"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </div>
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
