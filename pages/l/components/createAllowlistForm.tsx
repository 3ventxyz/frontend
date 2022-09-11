import React, { FormEvent, useState } from 'react'
import Button from '../../../components/button'
import { db } from '../../../services/firebase_config'
import { collection, addDoc, doc } from '@firebase/firestore'
import { useAuth } from '../../../contexts/auth'

export default function CreateAllowlistForm({
  onSuccess
}: {
  onSuccess: () => void
}) {
  const titleRef = React.createRef<HTMLInputElement>()
  const descriptionRef = React.createRef<HTMLInputElement>()
  const allowlistRef = React.createRef<HTMLTextAreaElement>()

  const [loading, setLoading] = useState(false)
  const listsCollectionRef = collection(db, 'lists')
  const auth = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      await addDoc(listsCollectionRef, {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        allowlist: allowlistRef.current?.value.split(','),
        uid: doc(db, 'users', auth.uid)
      })
      onSuccess()
    } catch (error) {
      console.log(error)
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
    </form>
  )
}
