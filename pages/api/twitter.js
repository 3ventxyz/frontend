export default async function handler(req, res) {
  const query = req.query
  const { accessCode, redirectUrl } = query
  const url = 'https://api.twitter.com/2/oauth2/token'

  const formData = new URLSearchParams({
    code: accessCode,
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID || '',
    redirect_uri: redirectUrl,
    code_verifier: 'challenge'
  })

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  })

  let data = await response.json()
  res.status(200).json(data)
}
