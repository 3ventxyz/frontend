import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import absoluteUrl from 'next-absolute-url'
import { useAuth } from '../contexts/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase_config'
import TextInput from '../components/textInput'
import Button from '../components/button'

export async function verifyDiscord(
  accessCode: string,
  uid: string,
  redirectUrl: string,
  guildId: string
) {
  try {
    const url = 'https://discord.com/api/v10/oauth2/token'

    console.log(redirectUrl)

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
      /*Get User ID*/
      const userResponse = await fetch(
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
      const guilds = JSON.parse(userData)
      /*check if guild is in the list*/
      guilds.forEach((guild: any) => {
        if (guild.id === guildId) {
          console.log('following')
          return true
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
  return false
}

export default function VerifyGuild({discordGuildID = ''}:{discordGuildID: string}) {
  const { asPath } = useRouter()
  const router = useRouter()
  const discordGuild = discordGuildID
  const auth = useAuth()
  const uid = auth?.uid
  const { origin } = absoluteUrl()
  const url = `${origin}${router.pathname}`
  const [hash, setHash] = useState('')

  useEffect(() => {
    const pathParts = asPath.split('code=')
    if (pathParts.length >= 2) {
      setHash(pathParts.slice(-1)[0])
    }
  }, [])

  return (
    <div className="flex flex-grow flex-col space-y-1 bg-secondaryBg">
      <p className="font-semibold">Check Guild</p>
      <div className="flex w-full flex-row items-center justify-start space-x-2 text-center">
        <a
          href={`https://discord.com/api/oauth2/authorize?client_id=997585077548617728&redirect_uri=${url}&response_type=code&scope=guilds`}
          className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#5865f2] text-[14px] font-semibold text-white hover:bg-[#4752c4]"
        >
          Choose an account
        </a>
        <Button
          text={'Verify'}
          onClick={() => {
            verifyDiscord(hash, uid, url, discordGuild)
          }}
          active={true}
        />
      </div>
    </div>
  )
}
