import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/auth'
import { db } from '../../services/firebase_config'
import { AllowlistsInterface } from '../../shared/interface/common'
import Image from 'next/image'
import Modal from '../../components/modal'
import CreateAllowlistForm from './components/createAllowlistForm'

export default function Allowlists() {
  const [allowlists, setAllowlists] = useState<AllowlistsInterface>([])
  const listsCollectionRef = collection(db, 'lists')
  const auth = useAuth()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getAllowlists = async () => {
      const data = await getDocs(listsCollectionRef)

      setAllowlists(
        // Get user allowlists
        data.docs
          .map((doc) => ({
            uid: doc.data().user_id.id,
            title: doc.data().title,
            description: doc.data().description,
            allowlist_id: doc.id,
            allowlist: doc.data().allowlist
          }))
          .filter((doc) => doc.uid === auth.uid)
      )
    }
    getAllowlists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteAllowlist = async (id: string | undefined) => {
    if (id) {
      await deleteDoc(doc(db, 'lists', id))
      window.location.reload()
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
                        alt="details"
                        src="/assets/eye.svg"
                        height="20"
                        width="20"
                      />
                      <Image
                        onClick={() => deleteAllowlist(e.allowlist_id)}
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
            window.location.reload()
            setShowModal(false)
          }}
        />
      </Modal>
    </>
  )
}
