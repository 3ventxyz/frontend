import axios from 'axios'
import { app, db } from './firebase_config';
import url from 'url'
import { doc, updateDoc, collection, getDoc } from 'firebase/firestore'

export default async function DiscordConfig (accessCode: string, setDiscordVerified: any ){
    // TODO: env variables
    try {
        const url = 'https://discord.com/api/v10/oauth2/token'

        const formData = new URLSearchParams({
            "client_id": process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID.toString(),
            "client_secret": process.env.NEXT_PUBLIC_DISCORD_API_SECRET.toString(), 
            "grant_type": 'authorization_code',
            "code": accessCode,
            "redirect_uri": process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URL.toString(),
            "scope": 'identify'
        });

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
        let data = await response.json();
        data = JSON.stringify(data);
        const token = JSON.parse(data).access_token;
        if (token && token !== undefined) {
            /*change value on database*/
                try {
                  const docRef = doc(db, 'user', 'guJqAglqTLAzoMIQA6Gi');
                  await updateDoc(docRef, {
                    discordVerified: true
                  })
                  console.log('Data written into doc ID: ', docRef.id)
                } catch (e) {
                  console.error('Error adding data: ', e)
                }
              }
                } catch(err) {
                    console.log(err);
                }

    /*Check database to change FE*/
    const docRef = doc(db, "user", "guJqAglqTLAzoMIQA6Gi");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        if(docSnap.data().discordVerified === true){
            setDiscordVerified(true)
            console.log('verification succeded')
        }
        else
            console.log('verification failed')
    console.log("Document data:", docSnap.data());
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
}