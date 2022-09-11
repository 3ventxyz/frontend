import React, { FormEvent, useState } from 'react'
import Button from '../../../components/button'
import { db } from '../../../services/firebase_config'
import { collection, addDoc, doc } from '@firebase/firestore'
import { useAuth } from '../../../contexts/auth'
import Web3 from 'web3'
import ErrorAlert from '../../../components/alerts/errorAlert'
import MerkleGenerator from '../../../services/merkle_generator'

export default function CreateAllowlistForm({
  onSuccess
}: {
  onSuccess: () => void
}) {
  const titleRef = React.createRef<HTMLInputElement>()
  const descriptionRef = React.createRef<HTMLInputElement>()
  const allowlistRef = React.createRef<HTMLTextAreaElement>()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const listsCollectionRef = collection(db, 'lists')
  const auth = useAuth()

  const isValidAddress = (adr: string) => {
    try {
      const web3 = new Web3()
      web3.utils.toChecksumAddress(adr)
      return true
    } catch (e) {
      return false
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const allowlist = allowlistRef.current?.value
        .split(',')
        .filter((val, id, array) => {
          return array.indexOf(val) === id && isValidAddress(val)
        })

      if (allowlist && allowlist.length > 0) {
        const merkle = new MerkleGenerator(allowlist)
        console.log(merkle.merkleTree.toString())

        await addDoc(listsCollectionRef, {
          title: titleRef.current?.value,
          description: descriptionRef.current?.value,
          allowlist: allowlist,
          uid: doc(db, 'users', auth.uid),
          merkle_root: `0x${merkle.rootGenerator()}`
        })
        onSuccess()
      } else {
        setError('Any of the addresses are valid')
      }
    } catch (error) {
      setError('Could not create the allowlist')
    }
    setLoading(false)
  }

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-900 "
        >
          TITLE
        </label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-900 "
        >
          DESCRIPTION
        </label>
        <input
          type="text"
          id="description"
          ref={descriptionRef}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          ADDRESSES
        </label>
        <textarea
          id="message"
          rows={4}
          ref={allowlistRef}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Add the list of addresses separated with comma"
          required
        ></textarea>
      </div>
      <Button
        type="submit"
        isExpanded={true}
        text="Create New Allowlist"
        active={!loading}
        onClick={() => null}
      ></Button>
      {error && (
        <ErrorAlert
          title="Oops!"
          description={error}
          onClose={() => setError('')}
        />
      )}
    </form>
  )
}
