import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { verifyDiscord, verifyTwitter } from '../services/verify_profile'
import absoluteUrl from 'next-absolute-url'
import { useAuth } from '../contexts/auth'
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import { db } from '../services/firebase_config'

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID

export default function Verify() {
  const { asPath } = useRouter()
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [discordVerified, setDiscordVerified] = useState(false)
  /*TO-DO Make this state an array of booleans which are initialized as false*/
  const [twitterVerifications, setTwitterVerifications] = useState<boolean[]>([
    false
  ])
  const [twitterVerified, setTwitterVerified] = useState(false)
  const auth = useAuth()
  const uid = auth?.uid
  const { origin } = absoluteUrl()
  const url = `${origin}${router.pathname}`
  const [twitterVerifs, setTwitterVerifs] = useState<string[]>([''])
  const [twitterNames, setTwitterNames] = useState<string[]>([''])
  const [addTwitterButtons, setAddTwitterButtons] = useState(false)

  useEffect(() => {
    const getSize = async () => {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setTwitterVerifs(docSnap.data().tw_verifs)
        setTwitterVerifications(docSnap.data().tw_verifications)
        setTwitterNames(docSnap.data().twitter_name)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }
    getSize()
    setAddTwitterButtons(false)
  }, [addTwitterButtons])
  

  const addTwAccount = async () => {
    setAddTwitterButtons(true)
    const docRef = doc(db, 'users', uid)
    await updateDoc(docRef, {
      tw_verifs: arrayUnion('')
    })
  }

  const deleteTwAccount = async () => {
    setAddTwitterButtons(true)
    const docRef = doc(db, 'users', uid)
    await updateDoc(docRef, {
      tw_verifs: arrayRemove('')
    })
  }

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
      /*TO-DO Figure out how to make all the twitterVerified arrays and how 
to put the true/false value on the correct index */
      if (auth?.userModel?.twitter_verified !== true) {
        if (hash !== '' && asPath.includes('state')) {
          const response = await verifyTwitter(hash, auth.uid, url)
          if (response === true) {
            console.log('response true')
            if (auth?.userModel) {
              console.log('update twitter')
              var authModelCopy = { ...auth.userModel }
              authModelCopy.twitter_verified = true
              /*TO-DO Get the twitterVerifications array in the correct index OR push into the array*/
              authModelCopy.twitter_verifications = [
                ...twitterVerifications,
                true
              ]
              auth.setUserModel(authModelCopy)
            }
            setTwitterVerified(true)
            setTwitterVerifications([...twitterVerifications, true])
          }
        }
      } else {
        setTwitterVerified(true)
        setTwitterVerifications([...twitterVerifications, true])
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
      {/*
        1. Check the number of the size of the array, print out a verification row for each
        2. When clicking on the add button, a new row appears. Clicking the X button deletes the row
        3. If the row is verified, the row does not display the x button
        4. Only the last row displays the + button
        */}
      <div className="flex w-full flex-row flex-wrap items-center justify-start space-x-2 text-center">
        {discordVerified ? (
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
        )}
        {twitterVerified ? (
          <>
            <p className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] border border-[#1d9bf0] bg-white text-[14px] font-semibold text-[#1d9bf0]">
              Twitter Verified
            </p>
            <a
              className="w-auto cursor-pointer text-4xl"
              href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${url}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`}
            >
              +
            </a>
          </>
        ) : (
          <a
            href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${url}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`}
            className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#1d9bf0] text-[14px] font-semibold text-white hover:bg-[#1a8cd8]"
          >
            Verify Twitter
          </a>
        )}
        {twitterVerifs.map((account, index) => {
          console.log('index', index)
          return (
            <>
              {twitterVerifications[index] ? (
                <div className="flex w-full space-x-2">
                  <p className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] border border-[#1d9bf0] bg-white text-[14px] font-semibold text-[#1d9bf0]">
                    Twitter Verified - {twitterNames[index]}
                  </p>
                  {index !== twitterVerifs.length ? (
                    <></>
                  ) : (
                    <p
                      className="w-auto cursor-pointer text-4xl"
                      onClick={() => addTwAccount()}
                    >
                      +
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex w-full space-x-2">
                  <a
                    href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${url}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`}
                    className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#1d9bf0] text-[14px] font-semibold text-white hover:bg-[#1a8cd8]"
                  >
                    Verify Twitter
                  </a>
                  {index === 0 ? (
                    <></>
                  ) : (
                    <p
                      className="w-auto cursor-pointer text-4xl"
                      onClick={() => deleteTwAccount()}
                    >
                      x
                    </p>
                  )}
                </div>
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}
