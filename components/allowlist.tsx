import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/auth'
import { AllowlistsInterface } from '../shared/interface/common'
import Modal from '../components/modal'
import CreateAllowlistForm from './createAllowlistForm'
import DeleteConfirmation from './deleteConfirmation'
import Button from './button'
import AllowlistService from '../services/allowlists'
import Link from 'next/link'
import Image from 'next/image'
import absoluteUrl from 'next-absolute-url'

export default function Allowlists() {
  const auth = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [allowlists, setAllowlists] = useState<AllowlistsInterface>([])
  const [currentAllowlist, setCurrentAllowlist] = useState<string | undefined>()
  const allowlistService = new AllowlistService()
  const { origin } = absoluteUrl()

  useEffect(() => {
    getAllowlists()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllowlists = async () => {
    const allowlists = await allowlistService.getUserAllowlists(
      auth.currentUser?.uid ?? ''
    )
    setAllowlists(allowlists)
  }

  const deleteAllowlist = async (id: string | undefined) => {
    var response = await allowlistService.delete(
      id,
      auth.currentUser?.uid ?? ''
    )
    console.log(response.message)
    router.push('/allowlists')
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center space-y-[20px] bg-secondaryBg">
        <div className="mx-auto flex w-full  flex-row items-center justify-between border-b border-disabled pb-2">
          <p className="text-[25px] font-bold md:text-[32px]">
            your allowlists
          </p>
          <Button
            text={'Create Allowlist'}
            active={true}
            onClick={() => router.push('allowlists/create')}
          />
        </div>
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 ">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700  ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  NAME
                </th>
                <th scope="col" className="py-3 px-6">
                  # ENTRIES
                </th>
                <th scope="col" className="py-3 px-6">
                  APPLICATION LINK
                </th>
              </tr>
            </thead>
            <tbody>
              {allowlists.map((e, i) => (
                <tr
                  key={i}
                  className="cursor-pointer border-b bg-white hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
                    onClick={() => router.push(`allowlists/${e.allowlist_id}`)}
                  >
                    {e.title}
                  </th>
                  <td className="py-4 px-6">{e.allowlist.length}</td>
                  <td className="flex py-4 px-6">
                    <p className="hover:cursor-default">{`${origin}/apply?id=${e.allowlist_id}`}</p>
                    <Image
                      className="hover:cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${origin}/apply?id=${e.allowlist_id}`
                        )
                        alert('Text copied')
                      }}
                      alt="copy"
                      src="/assets/copy.svg"
                      height="20"
                      width="20"
                    />
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
        <DeleteConfirmation
          onConfirm={() =>
            allowlistService.delete(
              currentAllowlist,
              auth.currentUser?.uid ?? ''
            )
          }
          onClose={() => {
            getAllowlists()
            setShowDeleteModal(false)
          }}
          text="Are you sure you want to delete?"
        />
      </Modal>
    </>
  )
}
