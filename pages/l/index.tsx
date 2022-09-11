import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/auth'
import { db } from '../../services/firebase_config'
import { AllowlistsInterface } from '../../shared/interface/common'
import Image from 'next/image'
import Modal from '../../components/modal'
import CreateAllowlistForm from './components/createAllowlistForm'
import { useRouter } from 'next/router'

export default function Allowlists() {
  const [allowlists, setAllowlists] = useState<AllowlistsInterface>([])
  const listsCollectionRef = collection(db, 'lists')
  const auth = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentAllowlist, setCurrentAllowlist] = useState<string | undefined>()

  useEffect(() => {
    getAllowlists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllowlists = async () => {
    const data = await getDocs(listsCollectionRef)

    setAllowlists(
      // Get user allowlists
      data.docs
        .map((doc) => ({
          uid: doc.data().uid.id,
          title: doc.data().title,
          description: doc.data().description,
          allowlist_id: doc.id,
          allowlist: doc.data().allowlist
        }))
        .filter((doc) => doc.uid === auth.uid)
    )
  }

  const deleteAllowlist = async (id: string | undefined) => {
    if (id) {
      await deleteDoc(doc(db, 'lists', id))
      await getAllowlists()
    }
  }

  return (
    <>
      <div className="mx-5 flex w-full flex-col items-center space-y-[20px] md:mx-[110px]">
        <div className="mx-auto flex w-full  flex-row items-end justify-between border-b border-disabled">
          <p className="text-[25px] font-bold md:text-[32px]">Allowlists</p>
          <Image
            onClick={() => setShowModal(true)}
            alt="add"
            src="/assets/add.svg"
            height="40"
            width="80"
          />
        </div>
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 ">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700  ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Allowlist
                </th>
                <th scope="col" className="py-3 px-6">
                  # addresses
                </th>
                <th scope="col" className="py-3 px-6 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allowlists.map((e, i) => (
                <tr key={i} className="border-b bg-white hover:bg-gray-50 ">
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
                  >
                    {e.title}
                  </th>
                  <td className="py-4 px-6">{e.allowlist.length}</td>
                  <td className="flex flex-row justify-end py-4 px-6">
                    <div className="flex w-[50px] flex-row justify-between">
                      <Image
                        onClick={() => router.push(`l/${e.allowlist_id}`)}
                        alt="details"
                        src="/assets/eye.svg"
                        height="20"
                        width="20"
                      />
                      <Image
                        onClick={() => {
                          setCurrentAllowlist(e?.allowlist_id)
                          setShowDeleteModal(true)
                        }}
                        alt="delete"
                        src="/assets/trash.svg"
                        height="20"
                        width="20"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        width="w-3/4"
        height=""
      >
        <CreateAllowlistForm
          onSuccess={() => {
            getAllowlists()
            setShowModal(false)
          }}
        />
      </Modal>
      <Modal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        width=""
        height=""
      >
        <div className="relative h-full w-full max-w-md p-4 md:h-auto">
          <button
            type="button"
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setShowDeleteModal(false)}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 h-14 w-14 text-gray-400 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
              Are you sure you want to delete this Allowlist?
            </h3>
            <button
              onClick={() => {
                deleteAllowlist(currentAllowlist)
                setShowDeleteModal(false)
              }}
              type="button"
              className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 "
            >
              Yes, I&apos;m sure
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 "
            >
              No, cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
