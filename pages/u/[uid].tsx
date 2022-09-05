import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebase_config'
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
  const router = useRouter()
  const { uid } = router.query

  useEffect(() => {
    const fetchData = async () => {
      const userId: any = uid
      const docRef = doc(db, 'users', userId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setName(docSnap.data().username)
        setBio(docSnap.data().bio)
        setLocation(docSnap.data().location)
        setAvatar(`${docSnap.data().gravatar}?s=200`)
        setTwitterName(docSnap.data().twitter_name)
      } else {
        console.log('No such document!')
      }
    }
    if (uid) {
      fetchData()
    }
  }, [uid])

  return (
    <div className="flex w-full flex-col items-start space-y-4 bg-secondaryBg px-4 py-[40px] text-center sm:px-0">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8 xl:justify-start">
        <div className="relative h-[384px] max-h-[320px] w-full max-w-[380px] rounded-3xl bg-gray-200 sm:max-h-full">
          <Image
            src={avatar}
            layout="fill"
            loading="lazy"
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
        <div className="flex w-full max-w-[380px] flex-col items-stretch justify-start text-left">
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
        </div>
      </div>
      <Dashboard />
    </div>
  )
}