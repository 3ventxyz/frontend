export default function DiscordConfig (){
    import requests

    API_ENDPOINT = 'https://discord.com/api/v10'
    CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_API_ID
    CLIENT_SECRET = process.env.NEXT_PUBLIC_DISCORD_API_SECRET
    REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL

    def exchange_code(code):
    data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    r = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers)
    r.raise_for_status()
    return r.json()
}