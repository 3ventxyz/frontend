import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { verifyDiscord, verifyTwitter } from '../../services/verify_profile'
import absoluteUrl from 'next-absolute-url'
import { useAuth } from '../../contexts/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebase_config'

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID

export default function Verify({
  twitter = true,
  discord = true
}: {
  twitter: boolean
  discord: boolean
}) {
  const { asPath } = useRouter()
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [discordVerified, setDiscordVerified] = useState(false)
  const auth = useAuth()
  const uid = auth?.uid
  const { origin } = absoluteUrl()
  const url = `${origin}${router.pathname}`
  const [twitterVerifs, setTwitterVerifs] = useState<string[]>([''])
  const [twitterNames, setTwitterNames] = useState<string[]>([''])
  const [twitterSize, setTwitterSize] = useState(0)

  useEffect(() => {
    const getTwitterInfo = async () => {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setTwitterSize(docSnap.data().tw_verifs.length)
        setTwitterVerifs(docSnap.data().tw_verifs)
        setTwitterNames(docSnap.data().twitter_name)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }
    getTwitterInfo()
  }, [twitterVerifs])

  useEffect(() => {
    const pathParts = asPath.split('code=')
    let hash = ''
    if (pathParts.length >= 2) {
      hash = pathParts.slice(-1)[0]
    }

    const checkVerification = async () => {
      if (auth?.userModel?.discord_verified !== true) {
        if (hash !== '' && !asPath.includes('state')) {
          console.log('attempt to change discord')
          const response = await verifyDiscord(hash, auth.uid, url)
          if (response === true) {
            if (auth?.userModel) {
              var authModelCopy = { ...auth.userModel }
              authModelCopy.discord_verified = true
              auth.setUserModel(authModelCopy)
            }
            setDiscordVerified(true)
          }
        }
      } else {
        setDiscordVerified(true)
      }
      if (twitterVerifs[twitterSize] === '') {
        if (hash !== '' && asPath.includes('state')) {
          const response = await verifyTwitter(hash, auth.uid, url)
          if (response === true) {
            if (auth?.userModel) {
              var authModelCopy = { ...auth.userModel }
              auth.setUserModel(authModelCopy)
            }
          }
        }
      } else {
      }
      setChecked(true)
    }

    if (!checked) {
      checkVerification()
    }
  }, [])
  return (
    <div className="flex flex-grow flex-col space-y-1 bg-secondaryBg">
      <p className="font-semibold">Verify Social Accounts</p>
      <div className="flex w-full flex-col flex-wrap items-start justify-center space-y-2 text-center">
        <>
          {discord ? (
            discordVerified ? (
              <p className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] border border-[#5865f2] bg-white text-[14px] font-semibold text-[#5865f2]">
                Discord Verified
              </p>
            ) : (
              <a
                href={`https://discord.com/api/oauth2/authorize?client_id=997585077548617728&redirect_uri=${url}&response_type=code&scope=identify`}
                className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#5865f2] text-[14px] font-semibold text-white hover:bg-[#4752c4]"
              >
                Verify Discord
              </a>
            )
          ) : (
            <></>
          )}
        </>
        {twitter ? (
          twitterSize === 0 ? (
            <a
              href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${url}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`}
              className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#1d9bf0] text-[14px] font-semibold text-white hover:bg-[#1a8cd8]"
            >
              Verify Twitter
            </a>
          ) : (
            twitterVerifs.map((account, index) => {
              return (
                <>
                  {twitterVerifs[index] !== '' ? (
                    <div className="flex w-full space-x-2">
                      <p className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] border border-[#1d9bf0] bg-white text-[14px] font-semibold text-[#1d9bf0]">
                        Twitter Verified - {twitterNames[index]}
                      </p>
                      {index !== twitterSize - 1 ? (
                        <></>
                      ) : (
                        <a
                          className="text-4xl"
                          href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${url}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`}
                        >
                          +
                        </a>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )
            })
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
