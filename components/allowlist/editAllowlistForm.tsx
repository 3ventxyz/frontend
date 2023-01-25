import React, { FormEvent, useState, useRef } from 'react'
import { useAuth } from '../../contexts/auth'
import AllowlistService from '../../services/allowlists'
import { AllowlistInterface } from '../../shared/interface/common'
import ErrorAlert from '../alerts/errorAlert'
import Button from '../buttons/button'
import TextInput from '../inputs/textInput'
import ToggleSwitch from '../toggles/toggleSwitch'

export default function EditAllowlistForm({
  onSuccess,
  allowlist,
  id
}: {
  onSuccess: () => void
  allowlist: AllowlistInterface | null
  id: string
}) {
  const titleRef = React.createRef<HTMLInputElement>()
  const descriptionRef = React.createRef<HTMLInputElement>()
  const allowlistRef = React.createRef<HTMLTextAreaElement>()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const allowlistService = new AllowlistService()
  const auth = useAuth()

  const walletVerification = useRef(false)
  const twitterVerification = useRef(false)
  const [twitterFollowing, setTwitterFollowing] = useState(false)
  const discordVerification = useRef(false)
  const [discordGuild, setDiscordGuild] = useState(false)
  const [twitterAccount, setTwitterAccount] = useState('')
  const [guild, setGuild] = useState('')
  const [permalink, setPermalink] = useState('')
  const emailVerification = useRef(false)
  const [checkTokens, setCheckTokens] = useState(false)
  const [contractAddress, setContractAddress] = useState('')
  const [checkNumOfTokens, setCheckNumOfTokens] = useState(false)
  const [numberOfTokens, setNumberOfTokens] = useState('0')

  const changeValue = (ref: any) => {
    ref.current = !ref.current
    console.log(ref, ref.current)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await allowlistService.update(
        id,
        {
          allowlist: allowlistService.getAllowlistFromString(
            allowlistRef.current?.value ?? ''
          ),
          uid: allowlist?.uid ?? '',
          title: titleRef.current?.value ?? '',
          description: descriptionRef.current?.value ?? '',
          allowlist_id: id
        },
        auth.currentUser?.uid ?? '',
        walletVerification.current,
        twitterVerification.current,
        twitterFollowing,
        twitterAccount,
        discordVerification.current,
        discordGuild,
        guild,
        emailVerification.current,
        permalink,
        checkTokens,
        contractAddress,
        checkNumOfTokens,
        parseInt(numberOfTokens)
      )

      if (!response?.success) {
        throw Error(response?.message)
      }
      onSuccess()
    } catch (error) {
      setError((error as Error).message)
    }
    setLoading(false)
  }

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="mb-6">
      <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 "
            >
              TITLE
            </label>
            <input
              type="text"
              id="title"
              ref={titleRef}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 "
            >
              DESCRIPTION
            </label>
            <input
              type="text"
              id="description"
              ref={descriptionRef}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              ADDRESSES
            </label>
            <textarea
              id="message"
              rows={4}
              ref={allowlistRef}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Add the list of addresses separated with comma"
              required
            ></textarea>
          </div>
          <div className="mb-6 flex max-w-[400px] items-center justify-between">
            <span className="text-sm font-medium text-gray-900">WALLET</span>
            <ToggleSwitch
              label="wallet"
              onClick={() => changeValue(walletVerification)}
            />
          </div>
          <div className="mb-6 flex max-w-[400px] items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              TWITTER VERIFICATION
            </span>
            <ToggleSwitch
              label="twitterVerification"
              onClick={() => changeValue(twitterVerification)}
            />
          </div>
          <div className="mb-6 flex max-w-[400px] items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              ASK USER TO FOLLOW TWITTER ACCOUNT
            </span>
            <ToggleSwitch
              label="twitterFollowing"
              onClick={() => setTwitterFollowing(!twitterFollowing)}
            />
          </div>
          {twitterFollowing ? (
            <div className="mb-6 flex max-w-[400px] items-center justify-between">
              <TextInput
                id="twitterAccount"
                labelText="TWITTER ACCOUNT ID"
                placeholder="Twitter Account ID"
                setValue={setTwitterAccount}
                xMargin="mx-0"
              />
            </div>
          ) : (
            <></>
          )}
          <div className="mb-6 flex max-w-[400px] items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              DISCORD VERIFICATION
            </span>
            <ToggleSwitch
              label="discordVerification"
              onClick={() => changeValue(discordVerification)}
            />
          </div>
          <div className="mb-6 flex max-w-[400px] items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              CHECK DISCORD GUILD
            </span>
            <ToggleSwitch
              label="discordGuild"
              onClick={() => setDiscordGuild(!discordGuild)}
            />
          </div>
          {discordGuild ? (
            <>
              <div className="mb-6 flex max-w-[400px] items-center justify-between">
                <TextInput
                  id="discordGuild"
                  labelText="DISCORD GUILD ID"
                  placeholder="Discord Guild ID"
                  setValue={setGuild}
                  xMargin="mx-0"
                />
              </div>
              <div className="mb-6 flex max-w-[400px] items-center justify-between">
                <TextInput
                  id="discordPermalink"
                  labelText="Guild invite permalink"
                  placeholder="Guild invite permalink"
                  setValue={setPermalink}
                  xMargin="mx-0"
                />
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="mb-6 flex max-w-[400px] items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              EMAIL VERIFICATION
            </span>
            <ToggleSwitch
              label="emailVerification"
              onClick={() => changeValue(emailVerification)}
            />
          </div>
          <div className="mb-6 flex max-w-[400px] items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              TOKEN OWNERSHIP
            </span>
            <ToggleSwitch
              label="checkTokens"
              onClick={() => setCheckTokens(!checkTokens)}
            />
          </div>
          {checkTokens ? (
            <>
              <div className="mb-6 flex max-w-[400px] items-center justify-between">
                <TextInput
                  id="contractAddress"
                  labelText="CONTRACT ADDRESS"
                  placeholder="Contract address"
                  setValue={setContractAddress}
                  xMargin="mx-0"
                />
              </div>
            </>
          ) : (
            <></>
          )}
                    <div className="mb-6 flex max-w-[400px] items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              REQUEST MINIMUM NUMBER OF TOKENS
            </span>
            <ToggleSwitch
              label="checkNumOftokens"
              onClick={() => setCheckNumOfTokens(!checkNumOfTokens)}
            />
          </div>
          {checkNumOfTokens ? (
            <>
              <div className="mb-6 flex max-w-[400px] items-center justify-between">
                <TextInput
                  id="numberOfTokens"
                  labelText="NUMBER OF TOKENS"
                  placeholder="Number of Tokens"
                  setValue={setNumberOfTokens}
                  xMargin="mx-0"
                />
              </div>
            </>
          ) : (
            <></>
          )}
      <Button
        type="submit"
        isExpanded={true}
        text="Update Allowlist"
        active={!loading}
        onClick={() => null}
      ></Button>
      {error && (
        <ErrorAlert
          title="Oops!"
          description={error}
          onClose={() => setError('')}
        />
      )}
    </form>
  )
}
