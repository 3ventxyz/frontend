import TextInput from '../../components/textInput'
import LocationInput from '../../components/locationInput'
import { useEffect, useState } from 'react'
import FileInput from '../../components/fileInput'
import Button from '../../components/button'
import { db } from '../../services/firebase_config'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../../contexts/auth'
import Link from 'next/link'

export default function UserProfile() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [avatar, setAvatar] = useState('')
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
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }
    getInfo()
  }, [])

  return (
    <div className="w-full items-center space-y-4 bg-secondaryBg px-4 py-[40px] text-center sm:px-0">
      <div className="mx-auto w-1/2 content-center">
        <Link href="/profile/edit" className="float-right">
          <p className="cursor-pointer text-right hover:underline">edit</p>
        </Link>
      </div>
      <div className="mx-auto flex w-1/2 content-center justify-around">
        <div className="w-1/2 p-2 text-left">
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
          <p className="p-1 text-secondary">{location}</p>
        </div>
        <img src={avatar}/>
      </div>
      <p>Events</p>
    </div>
  )
}
