import { db } from './firebase_config'
import { doc, updateDoc, arrayUnion} from 'firebase/firestore'

export async function verifyDiscord(
  accessCode: string,
  uid: string,
  redirectUrl: string
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
      const userResponse = await fetch('https://discordapp.com/api/users/@me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      let userData = await userResponse.json()
      console.log(userData)
      userData = JSON.stringify(userData)
      const id = JSON.parse(userData).id
      /*change value on database*/
      try {
        const docRef = doc(db, 'users', uid)
        await updateDoc(docRef, {
          discord_verified: true,
          discord_id: id
        })
        console.log('Data written into doc ID: ', docRef.id)
        return true
      } catch (e) {
        console.error('Error adding data: ', e)
      }
    }
  } catch (err) {
    console.log(err)
  }
  return false
}

export async function verifyTwitter(
  accessCode: string,
  uid: string,
  redirectUrl: string
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

      /*change value on database*/
      try {
        const docRef = doc(db, 'users', uid)
        await updateDoc(docRef, {
          twitter_name: arrayUnion(twitterIdJson.data.username),
          tw_verifs: arrayUnion(twitterIdJson.data.id)
        })
        console.log('Data written into doc ID: ', docRef.id)
        return true
      } catch (e) {
        console.error('Error adding data: ', e)
      }
    }
  } catch (err) {
    console.log(err)
  }
  return false
}