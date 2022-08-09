import { db } from './firebase_config'
import { doc, updateDoc } from 'firebase/firestore'

export async function VerifyDiscord(
  accessCode: string,
  uid: string
) {

  try {
    const url = 'https://discord.com/api/v10/oauth2/token'

    const formData = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '',
      client_secret: process.env.NEXT_PUBLIC_DISCORD_API_SECRET || '',
      grant_type: 'authorization_code',
      code: accessCode,
      redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URL || '',
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
      /*change value on database*/
      try {
        const docRef = doc(db, 'user', uid)
        await updateDoc(docRef, {
          discordVerified: true
        })
        console.log('Data written into doc ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding data: ', e)
      }
    }
  } catch (err) {
    console.log(err)
  }
}
