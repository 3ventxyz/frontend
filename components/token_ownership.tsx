/* eslint-disable react-hooks/rules-of-hooks */
import { useContractRead } from 'wagmi'
import { useAuth } from '../contexts/auth'
import abi from '../services/abi.json'
import { useState } from 'react'
import { doc, updateDoc, collection } from 'firebase/firestore'
import { db } from '../services/firebase_config'

export default function TokenOwnership({
  numberOfTokens,
  contractAddress,
  lid,
  setNumberOfUserTokens,
  numberOfUserTokens
}: {
  numberOfTokens: number
  contractAddress: string
  lid: string
  setNumberOfUserTokens: (num: number) => void
  numberOfUserTokens: number
}) {
  const auth = useAuth()
  const [userTokens, setUserTokens] = useState(false)
  const [checkedTokens, setCheckedTokens] = useState(false)
  const uid = auth?.uid
  /*Check if wallet is connected*/
  if (auth.userModel?.wallet) {
    /*use Contract Read and check tokens owned*/
    if (contractAddress !== undefined) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data, isError, isLoading } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: abi,
        functionName: 'balanceOf',
        args: [auth.userModel?.wallet],
        onSuccess(data) {
          /*Function to do something if token is owned or not*/
          setUserTokens(parseInt(data._hex) >= numberOfTokens)
          setNumberOfUserTokens(parseInt(data._hex))
          saveTokens(parseInt(data._hex) >= numberOfTokens, parseInt(data._hex))
        },
        onError(error) {
          console.log('Error', error)
        }
      })
    }
  }

  const saveTokens = async (userTokens: boolean, userTokenBalance: number) => {
    setCheckedTokens(true)
    try {
      const docRef = doc(db, 'lists', `${lid}`)
      await updateDoc(doc(collection(docRef, 'registered_users'), `${uid}`), {
        userTokens: userTokens,
        userTokenBalance: userTokenBalance
      })
      console.log('Data written into doc ID: ', docRef.id)
      return true
    } catch (e) {
      console.error('Error adding data: ', e)
    }
  }
  return (
    <>
      {checkedTokens ? (
        <div>
          <p className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] border border-secondary bg-secondary text-[14px] font-semibold text-white">
              Checked Tokens
            </p>
          {numberOfTokens > numberOfUserTokens ? (
            <p>You don&apos;t own enough tokens to apply to this list</p>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div onClick={() => saveTokens(userTokens, numberOfUserTokens)}>
          <p className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] border border-primary bg-primary text-[14px] font-semibold text-white hover:cursor-pointer">
            Check token balance
          </p>
        </div>
      )}
    </>
  )
}
