import { useState, useEffect } from 'react'
import { db } from '../services/firebase_config'
import { doc, collection, getDoc } from '@firebase/firestore'
import TextInputDisplay from '../components/textInputDisplay'
import { useAuth } from '../contexts/auth'

export default function Settings() {
  const [wallets, setWallets] = useState([])
  const auth = useAuth()

  // GET WALLET ADDRESSES
  useEffect(() => {
    const fetch = async () => {
      const userDocRef = doc(db, 'user', auth.uid)
      const userDocSnap = await getDoc(userDocRef)
      console.log(userDocSnap)
      console.log(userDocSnap.data())
      console.log(userDocSnap.data())
      console.log(auth.uid)
    }

    if (wallets.length === 0 && auth.isLoggedIn()) {
      fetch()
    }
  }, [])

  return (
    <div className="flex flex-grow bg-secondaryBg pt-[78px]">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-start justify-start space-y-8 px-2 sm:px-0">
        {/* TITLE AND HEADER */}
        <h3 className="w-full border-b border-disabled">Settings</h3>
        {/* PROFILE INFORMATION */}
        <div className="flex w-full flex-col space-y-5 pl-2 md:pl-8">
          {/* NUMBER */}
          <TextInputDisplay
            labelText={'Phone Number'}
            bodyText={'(222)-333-4444'}
          />
          {/* WALLET ADDRESS */}
          <TextInputDisplay
            labelText={'Public Address'}
            bodyText={'0x4444...4444'}
          />
        </div>
      </div>
    </div>
  )
}
