import axios from 'axios'
import { app } from './firebase_config';
import url from 'url'

export default async function DiscordConfig (accessCode: string){
    // TODO: env variables
    try {
        const url = 'https://discord.com/api/v10/oauth2/token'

        const formData = new URLSearchParams({
            "client_id": '997585077548617728',
            "client_secret": 'e-LTOH-gMZfdIZXCq16EdrQR-AvAR7Qv', 
            "grant_type": 'authorization_code',
            "code": accessCode,
            "redirect_uri": 'http://localhost:3000/temp/verify',
            "scope": 'identify'
        });

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })


        console.log(response)
        console.log(response.json())
    } catch(err) {
        console.log(err);
    }
}