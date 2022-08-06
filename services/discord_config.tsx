import axios from 'axios'
import { app } from './firebase_config';
import url from 'url'

export default async function DiscordConfig (accessCode: string){
    try {
        const formData = new url.URLSearchParams({
            /*Add info correctly*/
               client_id: '997585077548617728',
               client_secret: 'e-LTOH-gMZfdIZXCq16EdrQR-AvAR7Qv', 
               grant_type: 'authorization_code',
               accessCode,
               redirect_uri: 'http://localhost:3000/temp/verify',
           });
    const response = await axios.post('https://discord.com/api/v8/oauth2/token', 
    formData.toString(),
     {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    console.log(`RESPONSE: ${response}`)
    } catch(err) {
        console.log(err);
    }
}