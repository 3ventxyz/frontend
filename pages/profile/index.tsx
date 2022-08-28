import TextInput from '../../components/textInput'
 import LocationInput from '../../components/locationInput'
 import { useEffect, useState } from 'react'
 import FileInput from '../../components/fileInput'
 import Button from '../../components/button'
 import { db } from '../../services/firebase_config'
 import { doc, getDoc } from "firebase/firestore";


 export default function UserProfile() {
   const [name, setName] = useState('')
   const [bio, setBio] = useState('')
   const [location, setLocation] = useState('')
     /*TO-DO Get user id from auth context*/
     const uid = '6Xnrn4fq1iUNPmfjyiYfM4pkr2l1'
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
         <h3>User Profile</h3>
         <div className="flex justify-around w-1/2 mx-auto content-center">
            <div className="text-left w-1/2 p-2">
                <p className="text-left text-[16px] font-semibold py-2">Username</p>
                <p className="rounded bg-primaryBg p-1 border border-primary text-secondary">{name}</p>
                <p className="text-left text-[16px] font-semibold py-2">Bio</p>       
                <p className="rounded bg-primaryBg p-1 border border-primary text-secondary">{bio}</p>
                <p className="text-left text-[16px] font-semibold py-2">Location</p>
                <p className="rounded bg-primaryBg p-1 border border-primary text-secondary">{location}</p>
            </div>
            <p className="w-1/2 p-2 m-auto">Avatar</p>
        </div>
        <p>Events</p>
    </div>
   )
 }