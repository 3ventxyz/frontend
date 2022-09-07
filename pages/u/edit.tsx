import TextInput from '../../components/textInput'
import LocationInput from '../../components/locationInput'
import { useState, useEffect } from 'react'
import Button from '../../components/button'
import { db } from '../../services/firebase_config'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../../contexts/auth'
import Modal from '../../components/modal'

interface LocationData {
  lat: number
  long: number
  address: string
}

const CreateProfile = async (
  uid: string,
  name: string,
  bio: string,
  location?: LocationData,
  email = '',
  gravatarLink = ''
) => {
  try {
    const docRef = doc(db, 'users', uid)
    await updateDoc(docRef, {
      username: name,
      bio: bio,
      location: location,
      gravatar: gravatarLink,
      email: email
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
  const [modal, setModal] = useState(false)
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
                  CreateProfile(uid, name, bio, location, email, avatar)
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
        <div className="flex w-[300px] flex-col items-stretch">
          <Image
            src={avatar}
            width="300px"
            height="300px"
            layout="intrinsic"
            className="rounded-[15px]"
          />
                <Modal
        visible={modal}
        onClose={() => setModal(false)}
        width="w-[500px]"
        height="h-[500px]"
      >
        <p onClick={() => setModal(false)}>close</p>
          <p className="mt-[14px] mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
            Email
            <TextInput
            labelText=""
            id="email"
            placeholder="Enter email"
            maxWidth={500}
            width={'w-full'}
            textArea={false}
            setValue={setEmail}
          />
          <div className="h-2" />
          <Button
            text="Send"
            onClick={() => {
              fetchAvatar(email, setAvatar)
            }}
            active={true}
          />
          </p>
          </Modal>
          <Button
                    text="Upload Profile Picture"
                    onClick={() => {
                      setModal(true)
                    }}
                    active={true} />
          <div className="h-2" />
        </div>
      </div>
    </div>
  )
}
