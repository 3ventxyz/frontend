export default async function handler(req, res) {
    const query = req.query
    const id = req.query["id"]
    const { accessCode } = query
    const url = `https://api.twitter.com/2/users/${id}/following`
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessCode}`
      }
    })
  
    console.log(response)
    let data = await response.json()
    console.log(data)
    console.log(data.meta.next_token)
    res.status(200).json(data)
  }