export default async function handler(req, res) {
  const query = req.query
  const { accessCode } = query
  const url = 'https://api.twitter.com/2/users/me?user.fields=id%2Cname'

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessCode}`
    }
  })

  console.log(response)
  let data = await response.json()
  console.log(data)
  res.status(200).json(data)
}
