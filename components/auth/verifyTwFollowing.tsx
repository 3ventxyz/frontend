import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import absoluteUrl from 'next-absolute-url'
import { useAuth } from '../../contexts/auth'
import { doc, updateDoc, collection } from 'firebase/firestore'
import { db } from '../../services/firebase_config'

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID

const saveFollowing = async (
  tw_following: boolean,
  lid: string,
  uid: string
) => {
  try {
    const docRef = doc(db, 'lists', `${lid}`)
    await updateDoc(doc(collection(docRef, 'registered_users'), `${uid}`), {
      tw_following: tw_following
    })
    console.log('Data written into doc ID: ', docRef.id)
    return true
  } catch (e) {
    console.error('Error adding data: ', e)
  }
}

export async function verifyTwitter(
  accessCode: string,
  uid: string,
  redirectUrl: string,
  twitterAccount: string,
  lid: string
) {
  try {
    const rawResponse = await fetch(
      'api/twitter?accessCode=' + accessCode + '&redirectUrl=' + redirectUrl
    )
 
    const response = await rawResponse.json()
    const token = response.access_token
    
    if (token && token !== undefined) {
      /* get twitter id */
      const getTwitterId = await fetch('api/twitter-id?accessCode=' + token)
      const twitterIdJson = await getTwitterId.json()
      console.log('id', twitterIdJson) 
      /* get twitter following*/
     const getTwitterFollowing = await fetch('api/twitter-following?accessCode=' + token + '&id=' + twitterIdJson.data.id)
     const twitterFollowing = await getTwitterFollowing.json()
     const twitterFollowingArray = twitterFollowing.data
     console.log('array', twitterFollowingArray)
     /*Check if user is following */
     twitterFollowingArray.forEach((account: any) => {
      const accountId = account.id
      if (accountId === twitterAccount) {
        saveFollowing(true, lid, uid)
        return true
      } else {
        saveFollowing(false, lid, uid)
        return false
      }
    })
    }
  } catch (err) {
    console.log(err)
  }
  return false
}

export default function VerifyFollowing({twitterAccount = '', lid = ''}:{twitterAccount: string, lid: string}) {
  const { asPath } = useRouter()
  const router = useRouter()
  const auth = useAuth()
  const uid = auth?.uid
  const { origin } = absoluteUrl()
  const url = `${origin}${router.pathname}`
  const [hash, setHash] = useState('')
  const state = btoa(lid)

  useEffect(() => {
    const pathParts = asPath.split('code=')
    if (pathParts.includes('state')) {
      const pathParts = asPath.split('state=')
      const separatePath = pathParts[1].split('&code=')
      setHash(separatePath[1])
    } else {
      if (pathParts.length >= 2) {
        setHash(pathParts.slice(-1)[0])
      }
    }
    if (hash != '') {
      verifyTwitter(hash, uid, url, twitterAccount, lid)
    }
  }, [hash])

  return (
    <div className="flex flex-grow flex-col space-y-1 bg-secondaryBg">
      <p className="font-semibold">Check Account Following</p>
      <div className="flex w-full flex-row items-center justify-start space-x-2 text-center">
        <a
          href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${url}&scope=tweet.read%20users.read%20follows.read&state=${state}&code_challenge=challenge&code_challenge_method=plain`}
          className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#1d9bf0] text-[14px] font-semibold text-white hover:bg-[#1a8cd8]"
        >
          Following Check
        </a>
      </div>
    </div>
  )
}