import TextInput from '../../components/textInput'
 import LocationInput from '../../components/locationInput'
 import { useState } from 'react'
 import FileInput from '../../components/fileInput'
 import Button from '../../components/button'
 import { db } from '../../services/firebase_config'
 import { doc, updateDoc } from 'firebase/firestore'
 import Link from 'next/link'
 import { useAuth } from '../../contexts/auth'

 interface LocationData {
   lat: number
   long: number
   address: string
 }

 const CreateProfile = async (uid: string, name: string, bio: string, address = '', gravatarLink= '') => {
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
  const md5 = require( 'md5' );

  function getGravatarURL( email: string ) {
    const address = String( email ).trim().toLowerCase();
    const hash = md5( address );
    const url = `https://www.gravatar.com/avatar/${ hash }`;
    console.log('url', url)
    return url;
  }
  const url = getGravatarURL(email)
  setGravatar(url)
 }
 export default function CreateOrganization() {
   const [name, setName] = useState('')
   const [bio, setBio] = useState('')
   const [location, setLocation] = useState<LocationData>()
   const [email, setEmail] = useState('')
   const [gravatar, setGravatar] = useState('')
   const auth = useAuth()
   const uid = auth?.uid
   
   return (
     <div className="flex w-full flex-col items-center space-y-4 px-4 py-[43px] text-center sm:px-0 bg-secondaryBg">
        <div className="w-1/2 text-left">
        <h3 className="pb-[40px]">Create your Profile</h3>
       <TextInput
         labelText="Username"
         id="username"
         placeholder="Username"
         maxWidth={500}
         textArea={false}
         setValue={setName}
       />
       <TextInput
         labelText="Bio"
         id="bio"
         placeholder="Bio"
         maxWidth={500}
         textArea={false}
         setValue={setBio}
       />
       <LocationInput
         labelText="Location"
         id="user_location"
         placeholder="Where are you based?"
         setLocation={setLocation}
       />
   <p className="text-left text-[16px] font-semibold py-4">Avatar</p>
   <FileInput />
   <TextInput
          labelText="Email"
          id="email"
          placeholder="Email"
          maxWidth={500}
          textArea={false}
          setValue={setEmail}
        />
    <button onClick={() => {fetchAvatar(email, setGravatar)}}>Set with Gravatar</button>
   <Link href="/profile">      
      <Button text="Save" onClick={() => {
        CreateProfile(uid, name, bio, location.address, gravatar)
   }} active={true}/>
   </Link>
     </div>
        </div>
   )
 }