 import TextInput from '../../components/textInput'
 import LocationInput from '../../components/locationInput'
 import { useEffect, useState } from 'react'
 import FileInput from '../../components/fileInput'
 import Button from '../../components/button'
 import { db } from '../../services/firebase_config'
 import { doc, getDoc } from "firebase/firestore";
 import { useAuth } from '../../contexts/auth'
 import Link from 'next/link'

 export default function EditProfile() {
   const [name, setName] = useState('')
   const [bio, setBio] = useState('')
   const [location, setLocation] = useState('')
   const [avatar, setAvatar] = useState('')
   const auth = useAuth()
   const uid = auth?.uid

   useEffect(() => {
    const getInfo = async () => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setName(docSnap.data().username)
          setBio(docSnap.data().bio)
          setLocation(docSnap.data().location)
          setAvatar(`${docSnap.data().gravatar}?s=200`)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    }
    getInfo()
    },[])

   return (
     <div className="w-full items-center space-y-4 px-4 text-center sm:px-0 bg-secondaryBg py-[40px]">
      <div className="w-1/2 mx-auto content-center">
         <Link href="/profile/edit" className="float-right"><p className="cursor-pointer hover:underline text-right">edit</p></Link>
      </div>
         <div className="flex justify-around w-1/2 mx-auto content-center">
            <div className="text-left w-1/2 p-2">
                <p className="text-left text-[16px] font-semibold pt-2 mb-2 border-b border-primary">Username</p>
                <p className="p-1 text-secondary">{name}</p>
                <TextInput
                    labelText=""
                    id="username"
                    placeholder={name}
                    maxWidth={500}
                    width={'w-auto'}
                    textArea={false}
                    setValue={setName}
                />
                <p className="text-left text-[16px] font-semibold pt-2 mb-2 border-b border-primary">Bio</p>       
                <TextInput
                    labelText=""
                    id="bio"
                    placeholder="Bio"
                    maxWidth={500}
                    width={'w-auto'}
                    textArea={false}
                    setValue={setBio}
                />
                <p className="text-left text-[16px] font-semibold pt-2 mb-2 border-b border-primary">Location</p>
                <LocationInput
                    labelText=""
                    id="user_location"
                    placeholder="Where are you based?"
                    setLocation={setLocation}
                />
            </div>
            <img src={avatar} />
        </div>
        <p>Events</p>
    </div>
   )
 }