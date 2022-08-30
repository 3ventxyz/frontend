import TextInput from '../../components/textInput'
 import LocationInput from '../../components/locationInput'
 import { useEffect, useState } from 'react'
 import FileInput from '../../components/fileInput'
 import Button from '../../components/button'
 import { db } from '../../services/firebase_config'
 import { doc, getDoc } from "firebase/firestore";
 import { useAuth } from '../../contexts/auth'
 import Link from 'next/link'

 export default function UserProfile() {
   const [name, setName] = useState('')
   const [bio, setBio] = useState('')
   const [location, setLocation] = useState('')
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
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    }
    getInfo()
    },[])

   return (
     <div className="w-full items-center space-y-4 px-4 text-center sm:px-0 bg-secondaryBg py-[40px]">
      <div className="flex items-center justify-center">
         <h3>User Profile</h3>
         <Link href="/profile/edit"><img src={'assets/edit.svg'} className="w-[30px] cursor-pointer ml-2"/></Link>
      </div>
         <div className="flex justify-around w-1/2 mx-auto content-center">
            <div className="text-left w-1/2 p-2">
                <p className="text-left text-[16px] font-semibold pt-2 mb-2 border-b border-primary">Username</p>
                <p className="p-1 text-secondary">{name}</p>
                <p className="text-left text-[16px] font-semibold pt-2 mb-2 border-b border-primary">Bio</p>       
                <p className="p-1 text-secondary">{bio}</p>
                <p className="text-left text-[16px] font-semibold pt-2 mb-2 border-b border-primary">Location</p>
                <p className="p-1 text-secondary">{location}</p>
            </div>
            <p className="w-1/2 p-2 m-auto">Avatar</p>
        </div>
        <p>Events</p>
    </div>
   )
 }