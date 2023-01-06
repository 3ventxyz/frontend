// author: constanza
import { useEffect, useState } from 'react'
import { db } from '../../services/firebase_config'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../../contexts/auth'
import Dashboard from '../../components/events/dashboard'
import ProfileDisplay from './components/profileDisplay'

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
        setAvatar(docSnap.data().avatar)
        setTwitterName(docSnap.data().twitter_name)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }
    getInfo()
  }, [])

  return (
    <div className="flex w-full flex-col items-start space-y-4 bg-secondaryBg px-4 py-[40px] text-center sm:px-0">
      <ProfileDisplay
        name={name}
        bio={bio}
        img={avatar}
        address={location?.address || 'NA'}
        twitterName={twitterName}
        edit={true}
      />
      <Dashboard />
    </div>
  )
}
