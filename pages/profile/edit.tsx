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

 const CreateProfile = async (uid: string, name: string, bio: string, address: string) => {
  try {
    const docRef = doc(db, 'users', uid)
    if (address) {
      await updateDoc(docRef, {
        location: address
      }) 
    } 
    await updateDoc(docRef, {
      username: name,
      bio: bio,
    })
    console.log('Data written into doc ID: ', docRef.id)
    return true
  } catch (e) {
    console.error('Error adding data: ', e)
  }
 }

 export default function CreateOrganization() {
   const [name, setName] = useState('')
   const [bio, setBio] = useState('')
   const [location, setLocation] = useState<LocationData>()
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
   <FileInput/>
   <Link href="/profile">      
      <Button text="Save" onClick={() => {
        if (location) {CreateProfile(uid, name, bio, location.address)} 
    else {
      CreateProfile(uid, name, bio, null)
    }}} active={true}/>
   </Link>
     </div>
        </div>
   )
 }