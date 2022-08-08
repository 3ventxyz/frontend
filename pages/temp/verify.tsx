import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import DiscordConfig from "../../services/discord_config";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../services/firebase_config';

export default function Verify() {
    const { asPath } = useRouter()
    const [accessCode, setAccessCode] = useState('')
    const [discordVerified, setDiscordVerified] = useState(false)

    useEffect(() => {
        const pathParts = asPath.split('=')
        if (pathParts.length >= 2) {
            const hash = pathParts.slice(-1)[0]
            setAccessCode(hash)
            /*Use access code once app was authorized*/
            if (hash !== '') {
              /*Get access token from discord_config*/
                DiscordConfig(hash, setDiscordVerified)
            }
        } else {
          setAccessCode('')
        }
    }, [])

    if(discordVerified) {
        console.log('verified!')
        return (
            <div className="px-32">
                <h3 className="w-full max-w-[480px]">Verify your account</h3>
                <div className="py-4">
                    <p className="h-[40px] w-fit items-center justify-center rounded-[6px] px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-white bg-[#5865f2] hover:bg-[#4752c4]">
                        Discord Verified
                    </p>
            </div>
            </div>
            )
    }
        return (
        <div className="px-32">
            <h3 className="w-full max-w-[480px]">Verify your account</h3>
            <div className="py-4">
                <a href={process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL} className="h-[40px] w-fit items-center justify-center rounded-[6px] px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-white bg-[#5865f2] hover:bg-[#4752c4]">
                    Discord
                </a>
        </div>
        </div>
        )
    }
