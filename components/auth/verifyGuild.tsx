import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import absoluteUrl from 'next-absolute-url'
import { doc, updateDoc, collection } from 'firebase/firestore'
import { useAuth } from '../../contexts/auth'
import { db } from '../../services/firebase_config'

const saveFollowing = async (
  discord_guild: boolean,
  lid: string,
  uid: string,
  discord_username: string
) => {
  try {
    const docRef = doc(db, 'lists', `${lid}`)
    await updateDoc(doc(collection(docRef, 'registered_users'), `${uid}`), {
      discord_guild: discord_guild,
      discord_username: discord_username
    })
    console.log('Data written into doc ID: ', docRef.id)
    return true
  } catch (e) {
    console.error('Error adding data: ', e)
  }
}

export async function verifyDiscord(
  accessCode: string,
  uid: string,
  redirectUrl: string,
  guildId: string,
  lid: string
) {
  try {
    const url = 'https://discord.com/api/v10/oauth2/token'

    const formData = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '',
      client_secret: process.env.NEXT_PUBLIC_DISCORD_API_SECRET || '',
      grant_type: 'authorization_code',
      code: accessCode,
      redirect_uri: redirectUrl,
      scope: 'identify'
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
    let data = await response.json()
    data = JSON.stringify(data)
    const token = JSON.parse(data).access_token
    if (token && token !== undefined) {
      const userResponse = await fetch(
        'https://discordapp.com/api//users/@me',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const guildResponse = await fetch(
        'https://discordapp.com/api//users/@me/guilds',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      let userData = await userResponse.json()
      userData = JSON.stringify(userData)
      const user = JSON.parse(userData)

      let guildsData = await guildResponse.json()
      guildsData = JSON.stringify(guildsData)
      const guilds = JSON.parse(guildsData)
      /*check if guild is in the list*/
      guilds.forEach((guild: any) => {
        if (guild.id === guildId) {
          saveFollowing(true, lid, uid, user.username)
          return true
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
  return false
}

export default function VerifyGuild({
  discordGuildID = '',
  lid = ''
}: {
  discordGuildID: string
  lid: string
}) {
  const { asPath } = useRouter()
  const router = useRouter()
  const discordGuild = discordGuildID
  const auth = useAuth()
  const uid = auth?.uid
  const { origin } = absoluteUrl()
  const url = `${origin}${router.pathname}`
  const [hash, setHash] = useState('')
  const state = btoa(lid)

  useEffect(() => {
    const pathParts = asPath.split('code=')
    {
      if (pathParts.length >= 2) {
        if (pathParts[1].includes('state')) {
          const separatePath = pathParts[1].split('&state=')
          setHash(separatePath[0])
        } else {
          setHash(pathParts.slice(-1)[0])
        }
      }
    }
    if (hash != '') {
      verifyDiscord(hash, uid, url, discordGuild, lid)
    }
  }, [hash])

  return (
    <div className="flex flex-grow flex-col space-y-1 bg-secondaryBg">
      <p className="font-semibold">Check Guild</p>
      <div className="flex w-full flex-row items-center justify-start space-x-2 text-center">
        <a
          href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${url}&response_type=code&scope=identify%20guilds&state=${state}`}
          className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#5865f2] px-4 text-[14px] font-semibold text-white hover:bg-[#4752c4]"
        >
          Verify Guild Membership
        </a>
      </div>
    </div>
  )
}
