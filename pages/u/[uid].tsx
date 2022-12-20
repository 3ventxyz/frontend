import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebase_config'
import Dashboard from '../../components/events/dashboard'
import ProfileDisplay from './components/profileDisplay'
import { LocationData } from '../../shared/interface/common'

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
        setAvatar(docSnap.data().avatar)
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
      <ProfileDisplay
        name={name}
        bio={bio}
        img={avatar}
        address={location?.address || 'NA'}
        twitterName={twitterName}
      />
      <Dashboard />
    </div>
  )
}
