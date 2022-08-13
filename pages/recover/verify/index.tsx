import React, { FormEvent, useState } from 'react'
import { useAuth } from '../../../contexts/auth'
import { useRouter } from 'next/router'
import Button from '../../../components/button'
import Link from 'next/link'
import AuthInput from '../../../components/inputs/authInput'

export default function RecoverVerify() {
  const codeRef = React.createRef<HTMLInputElement>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const auth = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault()
    // try {
    //   setError('')
    //   setLoading(true)
    //   await auth.login({
    //     email: emailRef.current?.value,
    //     password: passwordRef.current?.value
    //   })
    //   console.log('log in success')
    //   router.push('/mint')
    // } catch {
    //   setError('Failed to log in')
    //   console.log('log in error')
    // }
    // setLoading(false)
  }

  return (
    <div className="flex flex-grow items-center justify-center bg-secondaryBg py-[40px] px-[20px] sm:px-[56px] md:px-[112px]">
      <div className="p-auto flex max-w-[343px] flex-grow flex-col items-center gap-y-6">
        <div>
          <h3 className="mb-2 w-full text-center text-[32px]">
            Forgot Password?
          </h3>
          <p className="p2 max-w-[280px] text-center text-primary">
            Check your email for a verification code and submit it below.
          </p>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-y-6"
        >
          {/* verification code input */}
          <AuthInput
            id="code"
            type="texts"
            labelText="Verification code"
            inputRef={codeRef}
            placeholder="Ex: 123456"
          />
          <Button
            text="Submit"
            active={!loading}
            onClick={() => null}
            type="submit"
            isExpanded={true}
          />
        </form>
        <p className="p2 mx-4 mb-0 text-center text-primary">
          Don&apos;t have an account?
          <span className="ml-[6px] cursor-pointer text-linkText underline">
            <Link href="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  )
}
