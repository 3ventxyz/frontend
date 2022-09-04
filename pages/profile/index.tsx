import { useEffect, useState } from 'react'
import Button from '../../components/button'
import { db } from '../../services/firebase_config'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../../contexts/auth'
import Link from 'next/link'
import Image from 'next/image'
import Dashboard from '../../components/dashboard'

interface LocationData {
  lat: number
  long: number
  address: string
}

export default function UserProfile() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState<LocationData>()
  const [avatar, setAvatar] = useState('')
  const [twitterName, setTwitterName] = useState('')
  const auth = useAuth()
  const uid = auth?.uid

  useEffect(() => {
    const getInfo = async () => {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setName(docSnap.data().username)
        setBio(docSnap.data().bio)
        setLocation(docSnap.data().location)
        setAvatar(`${docSnap.data().gravatar}?s=200`)
        setTwitterName(docSnap.data().twitter_name)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }
    getInfo()
  }, [])

  return (
    <div className="flex w-full flex-col items-start space-y-4 bg-secondaryBg  px-4 py-[40px] text-center sm:px-0">
      <div className="mx-auto flex w-full flex-col px-[20px] md:px-[112px]">
        <div className="flex w-full flex-col items-start justify-start  space-y-4 px-[20px] md:px-[112px] lg:flex-row lg:space-y-0 lg:space-x-8">
          <Image
            src={avatar}
            width="300px"
            height="300px"
            layout="intrinsic"
            className="rounded-[15px]"
          />
          <div className="flex w-full max-w-[300px] flex-col items-stretch justify-start text-left">
            <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
              Username
            </p>
            <p className="p-1 text-secondary">{name}</p>
            <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
              Bio
            </p>
            <p className="p-1 text-secondary">{bio}</p>
            <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
              Location
            </p>
            <p className="p-1 text-secondary">{location?.address}</p>
            {twitterName && (
              <>
                <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
                  Twitter
                </p>
                <a
                  className="p-1 text-linkText"
                  href={`https://twitter.com/${twitterName}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Twitter
                </a>
              </>
            )}
            <div className="h-4" />
            <Link href="/profile/edit">
              <Button text={'Edit'} onClick={() => {}} active={true} />
            </Link>
          </div>
        </div>
      </div>
      <Dashboard />
    </div>
  )
}
