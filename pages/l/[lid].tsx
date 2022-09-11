import { deleteDoc, doc, getDoc } from '@firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { db } from '../../services/firebase_config'
import { AllowlistInterface } from '../../shared/interface/common'
import Image from 'next/image'
import { HiChevronLeft } from 'react-icons/hi'

export default function Allowlist() {
  const [allowlist, setAllowlist] = useState<AllowlistInterface | null>(null)
  const router = useRouter()
  const { lid } = router.query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allowlistDoc = await getDoc(
          doc(db, 'lists', lid?.toString() ?? '')
        )
        if (!allowlistDoc.data()) {
          router.push('/l')
          return
        }
        setAllowlist({
          uid: allowlistDoc.data()?.uid,
          title: allowlistDoc.data()?.title,
          description: allowlistDoc.data()?.description,
          allowlist_id: allowlistDoc.id,
          allowlist: allowlistDoc.data()?.allowlist,
          merkle_root: allowlistDoc.data()?.merkle_root
        })
      } catch (error) {
        console.log(error)
        router.push('/l')
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteAllowlist = async (id: string | undefined) => {
    if (id) {
      await deleteDoc(doc(db, 'lists', id))
      router.push('/l')
    }
  }

  return (
    <div className="mx-5 flex w-full flex-col items-center space-y-[20px] md:mx-[110px]">
      <div className="mx-auto flex w-full  flex-row items-end justify-between border-b border-disabled">
        <button
          className="h-[40px] w-[40px]"
          onClick={() => {
            router.back()
          }}
        >
          <HiChevronLeft className="h-full w-full" />
        </button>
      </div>
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 ">
          <caption className=" bg-white p-5 text-left text-lg font-semibold text-gray-900">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                {allowlist?.title}
                <p className="mt-1 text-sm font-normal text-gray-500 ">
                  {allowlist?.description}
                </p>
                <p className="mt-6 text-sm font-normal ">
                  Merkle Root: {allowlist?.merkle_root}
                </p>
              </div>
              <Image
                onClick={() => deleteAllowlist(lid?.toString())}
                alt="add"
                src="/assets/trash.svg"
                height="20"
                width="20"
              />
            </div>
          </caption>
          <thead className="bg-gray-50 text-xs uppercase text-gray-700  ">
            <tr>
              <th scope="col" className="py-3 px-6">
                Addresses
              </th>
            </tr>
          </thead>
          <tbody>
            {allowlist?.allowlist.map((e, i) => (
              <tr key={i} className="border-b bg-white hover:bg-gray-50 ">
                <th
                  scope="row"
                  className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
                >
                  {e.toUpperCase()}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
