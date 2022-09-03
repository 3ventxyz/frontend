import TextInput from '../../components/textInput'
import LocationInput from '../../components/locationInput'
import { useState, useEffect } from 'react'
import FileInput from '../../components/fileInput'
import Button from '../../components/button'
import { db } from '../../services/firebase_config'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import { useAuth } from '../../contexts/auth'

interface LocationData {
  lat: number
  long: number
  address: string
}

const CreateProfile = async (
  uid: string,
  name: string,
  bio: string,
  address = '',
  gravatarLink = ''
) => {
  try {
    const docRef = doc(db, 'users', uid)
    await updateDoc(docRef, {
      username: name,
      bio: bio,
      location: address,
      gravatar: gravatarLink
    })
    console.log('Data written into doc ID: ', docRef.id)
    return true
  } catch (e) {
    console.error('Error adding data: ', e)
  }
}

const fetchAvatar = (email: string, setGravatar: any) => {
  const md5 = require('md5')

  function getGravatarURL(email: string) {
    const address = String(email).trim().toLowerCase()
    const hash = md5(address)
    const url = `https://www.gravatar.com/avatar/${hash}`
    console.log('url', url)
    return url
  }
  const url = getGravatarURL(email)
  setGravatar(url)
}

export default function CreateUser() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState<LocationData>()
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const auth = useAuth()
  const uid = auth?.uid
  let remakeProfile = false

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
  }, [remakeProfile])

  return (
    <div className="w-full items-center space-y-4 bg-secondaryBg px-4 py-[40px] text-center sm:px-0">
      <div className="mx-auto w-1/2 content-center"></div>
      <div className="mx-auto flex w-1/2 content-center justify-around">
        <div className="w-1/2 p-2 text-left">
          <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
            Username
          </p>
          <TextInput
            labelText=""
            id="username"
            placeholder={name}
            maxWidth={500}
            width={'w-auto'}
            textArea={false}
            setValue={setName}
          />
          <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
            Bio
          </p>
          <TextInput
            labelText="Bio"
            id="bio"
            placeholder={bio}
            maxWidth={500}
            width={'w-auto'}
            textArea={false}
            setValue={setBio}
          />
          <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
            Location
          </p>
          <LocationInput
            labelText="Location"
            id="user_location"
            placeholder="Where are you located?"
            setLocation={setLocation}
          />
        </div>
        <div>
          <img src={avatar} />
          <TextInput
            labelText="Email"
            id="email"
            placeholder="Enter gravatar email"
            maxWidth={500}
            width={'w-auto'}
            textArea={false}
            setValue={setEmail}
          />
        </div>
      </div>
      <div>
        <Link href="/profile">
          <Button
            text="Save"
            onClick={() => {
              CreateProfile(uid, name, bio, location?.address, avatar)
            }}
            active={true}
          />
        </Link>
        <Link href="/profile">
          <Button
            text="Discard"
            onClick={() => {
              remakeProfile = true
            }}
            active={true}
          />
        </Link>
      </div>
      <p>Events</p>
    </div>
  )
}
