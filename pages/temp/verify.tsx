import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import DiscordConfig from "../../services/discord_config";

export default function Verify() {
    const { asPath } = useRouter()
    const [accessCode, setAccessCode] = useState('')

    useEffect(() => {
        const pathParts = asPath.split('=')
        if (pathParts.length >= 2) {
          const hash = pathParts.slice(-1)[0]
          setAccessCode(hash)
        } else {
          setAccessCode('')
        }
      }, [asPath])

    /*Use access code once app was authorized*/
    if (accessCode !== '') {
        console.log(`Access Code: ${accessCode}`)
        /*Get access token from discord_config*/
    }

    return (
    <div className="px-32">
        <h3 className="w-full max-w-[480px]">Verify your account</h3>
        <div className="py-4">
            <a href="https://discord.com/api/oauth2/authorize?client_id=997585077548617728&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ftemp%2Fverify&response_type=code&scope=identify" className="h-[40px] w-fit items-center justify-center rounded-[6px] px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-white bg-[#5865f2] hover:bg-[#4752c4]">
                Discord
            </a>
    </div>
    </div>
    )

}
