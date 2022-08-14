import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { verifyDiscord, verifyTwitter } from '../../services/verify_profile'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebase_config'
import absoluteUrl from 'next-absolute-url'

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID

export default function Verify() {
  const { asPath } = useRouter()
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [checked, setChecked] = useState(false)
  const [discordVerified, setDiscordVerified] = useState(false)
  const [twitterVerified, setTwitterVerified] = useState(false)
  const uid = 'guJqAglqTLAzoMIQA6Gi'

  // checks if user is verified on discord and twitter
  // if user is not verified and hash is present, run verification and update db
  useEffect(() => {
    const pathParts = asPath.split('code=')
    let hash = ''
    if (pathParts.length >= 2) {
      hash = pathParts.slice(-1)[0]
    }

    const checkVerification = async () => {
      const docRef = doc(db, 'user', uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        if (docSnap.data().discord_verified === false) {
          if (hash !== '' && !asPath.includes('state')) {
            const response = await verifyDiscord(hash, uid)
            if (response === true) {
              setDiscordVerified(true)
            }
          }
        } else {
          setDiscordVerified(true)
        }
        if (docSnap.data().twitter_verified === false) {
          if (hash !== '' && asPath.includes('state')) {
            const response = await verifyTwitter(hash, uid)
            if (response === true) {
              setTwitterVerified(true)
            }
          }
        } else {
          setTwitterVerified(true)
        }
      }
      setChecked(true)
    }

    if (!checked) {
      checkVerification()
    }
  }, [])

  useEffect(() => {
    const { origin } = absoluteUrl()
    setUrl(`${origin}${router.pathname}`)
  }, [])

  return (
    <div className="flex flex-grow bg-secondaryBg">
      <div className="mx-auto flex w-[160px] flex-col justify-center space-y-1 text-center">
        {discordVerified ? (
          <p className="inline-flex h-[40px] w-full items-center justify-center rounded-[6px] border border-[#5865f2] bg-white text-[14px] font-semibold text-[#5865f2]">
            Discord Verified
          </p>
        ) : (
          <a
            href={`https://discord.com/api/oauth2/authorize?client_id=997585077548617728&redirect_uri=${url}&response_type=code&scope=identify`}
            className="inline-flex h-[40px] w-full items-center justify-center rounded-[6px] bg-[#5865f2] text-[14px] font-semibold text-white hover:bg-[#4752c4]"
          >
            Verify Discord
          </a>
        )}
        {twitterVerified ? (
          <p className="inline-flex h-[40px] w-full items-center justify-center rounded-[6px] border border-[#1d9bf0] bg-white text-[14px] font-semibold text-[#1d9bf0]">
            Twitter Verified
          </p>
        ) : (
          <a
            href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${url}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`}
            className="inline-flex h-[40px] w-full items-center justify-center rounded-[6px] bg-[#1d9bf0] text-[14px] font-semibold text-white hover:bg-[#1a8cd8]"
          >
            Verify Twitter
          </a>
        )}
      </div>
    </div>
  )
}
