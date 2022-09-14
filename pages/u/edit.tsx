import TextInput from '../../components/textInput'
import LocationInput from '../../components/locationInput'
import { useState, useEffect } from 'react'
import Button from '../../components/button'
import { db } from '../../services/firebase_config'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import { useAuth } from '../../contexts/auth'
import FileImageInput from '../../components/fileImageInput'
import { uploadImage } from '../../services/upload_image'

interface LocationData {
  lat: number
  long: number
  address: string
}

const fetchAvatar = (email: string, setGravatar: any) => {
  const md5 = require('md5')

  function getGravatarURL(email: string) {
    const address = String(email).trim().toLowerCase()
    const hash = md5(address)
    const url = `https://www.gravatar.com/avatar/${hash}?d=mp`
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
  const [fileImg, setFileImg] = useState<File | null>(null)

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

  const createProfile = async (
    email = '',
    fileImg: File | null,
    uid: string,
    name: string,
    bio: string,
    location?: LocationData
  ) => {
    try {
      await uploadImage(fileImg, `${uid}/profile.jpg` ?? '', async (url: string) => {
        const docRef = doc(db, 'users', uid)
        await updateDoc(docRef, {
          username: name,
          bio: bio,
          location: location,
          avatar: url,
          email: email
        })
        console.log('Data written into doc ID: ', docRef.id)
      })
      return true
    } catch (e) {
      console.error('Error adding data: ', e)
    }
  }
  
  return (
    <div className="h-screen w-screen bg-secondaryBg">
      <div className="mx-auto flex max-w-[300px] flex-col-reverse items-center justify-center lg:max-w-full lg:flex-row  lg:items-start lg:justify-center lg:space-x-24 lg:pt-14">
        <div className="flex w-[300px] flex-col items-stretch text-left">
          <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
            Username
          </p>
          <TextInput
            labelText=""
            id="username"
            placeholder={name}
            maxWidth={500}
            width={'w-full'}
            textArea={false}
            setValue={setName}
          />
          <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
            Bio
          </p>
          <TextInput
            labelText=""
            id="bio"
            placeholder={bio}
            maxWidth={500}
            width={'w-full'}
            textArea={false}
            setValue={setBio}
          />
           <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
            Email
          </p>
          <TextInput
            labelText=""
            id="email"
            placeholder={bio}
            maxWidth={500}
            width={'w-full'}
            textArea={false}
            setValue={setEmail}
          />
          <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
            Location
          </p>
          <LocationInput
            labelText=""
            id="user_location"
            placeholder={location?.address || 'Where are you located?'}
            setLocation={setLocation}
          />
          <div className="flex w-full flex-row justify-start space-x-2 pt-4">
            <Link href="/u">
              <Button
                text="Save"
                onClick={() => {
                  createProfile(email, fileImg, uid, name, bio, location)
                }}
                active={true}
              />
            </Link>
            <Link href="/u">
              <Button
                text="Discard"
                onClick={() => {
                  remakeProfile = true
                }}
                active={true}
              />
            </Link>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <p>Event Image:</p>
          <FileImageInput fileImg={fileImg} setFileImg={setFileImg} />
        </div>
      </div>
    </div>
  )
}