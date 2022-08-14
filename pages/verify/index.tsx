import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { VerifyDiscord, VerifyTwitter } from '../../services/verify_profile'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebase_config'
import absoluteUrl from 'next-absolute-url'
import { getRedirectResult } from '@firebase/auth'

export default function Verify() {
  const { asPath } = useRouter()
  const router = useRouter()
  const [discordVerified, setDiscordVerified] = useState(false)
  const [twitterVerified, setTwitterVerified] = useState(false)
  const [url, setUrl] = useState('')
  const uid = 'guJqAglqTLAzoMIQA6Gi'

  useEffect(() => {
    const checkDiscord = async () => {
      const docRef = doc(db, 'user', uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        if (docSnap.data().discordVerified === true) {
          setDiscordVerified(true)
        }
        if (docSnap.data().twitterVerified === true) {
          setTwitterVerified(true)
        }
        console.log('Document data:', docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    checkDiscord()
  }, [])

  useEffect(() => {
    const pathParts = asPath.split('code=')
    if (pathParts.length >= 2) {
      const hash = pathParts.slice(-1)[0]
      /*Use access code once app was authorized*/
      if (hash !== '') {
        console.log(hash)
        /*Verify access token and store verification state in database*/
        VerifyTwitter(hash, uid)
        //VerifyDiscord(hash, uid)
      }
    }
  }, [])

  useEffect(() => {
    const { origin } = absoluteUrl()
    setUrl(`${origin}${router.pathname}`)
  }, [])
  
  useEffect(() => {
    console.log(url)
  }, [url])

  return (
    <div className="px-12 md:px-32">
      <div className="py-2">
        {discordVerified ? (
          <p className="h-[40px] w-full sm:w-[160px] items-center justify-center rounded-[6px] border border-[#5865f2] bg-white px-[5px] md:px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-[#5865f2]">
            Discord Verified
          </p>
        ) : (
          <a
            href={`https://discord.com/api/oauth2/authorize?client_id=997585077548617728&redirect_uri=${url}&response_type=code&scope=identify`}
            className="h-[40px] w-full sm:w-[160px] items-center justify-center rounded-[6px] bg-[#5865f2] px-[5px] md:px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-white hover:bg-[#4752c4]"
          >
            Discord
          </a>
        )}
      </div>
      <div className="py-2">
        {twitterVerified ? (
        <p
        className="h-[40px] w-full sm:w-[160px] items-center justify-center rounded-[6px] border border-[#1d9bf0] bg-white px-[5px] md:px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-[#1d9bf0]"
      >
        Twitter Verified
      </p>
        ) : (
          <a
          href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=MVlFOFhNVHM0UGtJYUtkbnVkMlE6MTpjaQ&redirect_uri=${url}&scope=tweet.read&state=state&code_challenge=challenge&code_challenge_method=plain`}
          className="h-[40px] w-full sm:w-[160px] items-center justify-center rounded-[6px] bg-[#1d9bf0] px-[5px] md:px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-white hover:bg-[#1a8cd8]"
        >
          Twitter
        </a>
        )}
      </div>
    </div>
  )
}
