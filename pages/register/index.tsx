import React, { FormEvent, useState } from 'react'
import { useAuth } from '../../contexts/auth'
import { useRouter } from 'next/router'
import Button from '../../components/button'
import Link from 'next/link'
import AuthInput from '../../components/inputs/authInput'
import ButtonOutlined from '../../components/buttonOutlined'

export default function Register() {
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
    <div className="flex flex-grow items-center justify-center bg-secondaryBg py-[40px] px-[20px] sm:px-[56px] md:px-[112px]">
      <div className="p-auto flex min-w-[343px] flex-col items-center gap-y-6">
        <div>
          <h3 className="mb-2 w-full text-center text-[32px]">
            Join the Party!🎉
          </h3>
          <p className="p2 text-center text-primary">
            Create an account to get started.
          </p>
        </div>
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
            bottomText="Forgot Password?"
            bottomRedirect="/recover"
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
            onClick={() => null}
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
