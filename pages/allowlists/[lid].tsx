import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { AllowlistInterface } from '../../shared/interface/common'
import Image from 'next/image'
import { HiChevronLeft } from 'react-icons/hi'
import Modal from '../../components/modal'
import AllowlistService from '../../services/allowlists'
import EditAllowlistForm from '../../components/editAllowlistForm'
import { useAuth } from '../../contexts/auth'
import DeleteConfirmation from '../../components/deleteConfirmation'
import { doc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebase_config'
import { AllowlistUser } from '../../shared/interface/common'

export default function Allowlist() {
  const [allowlist, setAllowlist] = useState<AllowlistInterface | null>(null)
  const router = useRouter()
  const { lid } = router.query
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteAddressModal, setShowDeleteAddressModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const allowlistService = new AllowlistService()
  const [addresses, setAddresses] = useState<Map<string, boolean>>()
  const [selected, setSelected] = useState<Array<string>>(Array())
  const auth = useAuth()
  const [userDocs, setUserDocs] = useState(Array<AllowlistUser>)
  const [gotInfo, setGotInfo] = useState(false)
  /*Information from each user in allowlist*/
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let arr: Array<AllowlistUser> = []
        setGotInfo(true)
        const docRef = doc(db, 'lists', `${lid}`)
        /*loop through every user*/
        const userRef = await getDocs(collection(docRef, 'registered_users'))
        userRef.forEach((doc) => {
          /*Make object of each user in the array docs / Define an object ui wise*/
         arr.push({
          uid: doc.data().uid,
          email: doc.data().email,
          wallet: doc.data().wallet,
          twitter_id: doc.data().twitter_id,
          discord_username: doc.data().discord_username,
          discord_guild: doc.data().discord_guild,
          status: doc.data().status
        })
        })
        setUserDocs(arr)
        return true
      } catch (e) {
        console.error('Error adding data: ', e)
      }
    }
    console.log('gotinfo', gotInfo)
    if (!gotInfo) {
      getUserInfo()
    }
  }, [])
  console.log('arr', userDocs)
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    var tmp: Array<string> = []
    addresses?.forEach((value, key) => {
      if (value) {
        tmp.push(key)
      }
    })
    setSelected(tmp)
  }, [addresses])

  const fetchData = async () => {
    const response = await allowlistService.getAllowlist(lid?.toString() ?? '')
    if (response?.success && response.data) {
      setAllowlist({
        uid: response.data.uid,
        title: response.data.title,
        description: response.data.description,
        allowlist_id: response.data.id,
        allowlist: response.data.allowlist
      })
    } else {
      console.log(response.message)
      router.push('/allowlists')
    }
  }

  const deleteAllowlist = async (id: string | undefined) => {
    var response = await allowlistService.delete(
      id,
      auth.currentUser?.uid ?? ''
    )
    console.log(response.message)
    router.push('/allowlists')
  }

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    const tmp = new Map(addresses)
    tmp.set(name, checked)
    setAddresses(tmp)
    console.log(tmp)
  }

  const handleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    const tmp = new Map(addresses)
    allowlist?.allowlist.map((e, i) => {
      tmp.set(e, checked)
    })

    setAddresses(tmp)
    console.log(tmp)
  }

  const handleDeleteSelectedAddresses = async () => {
    var response = await allowlistService.update(
      lid?.toString() ?? '',
      {
        allowlist: (allowlist?.allowlist ?? []).filter(
          (address) => selected.indexOf(address) < 0
        ),
        uid: allowlist?.uid ?? '',
        title: allowlist?.title ?? '',
        description: allowlist?.description ?? '',
        allowlist_id: lid?.toString()
      },
      auth.currentUser?.uid ?? ''
    )
    await fetchData()
    setAddresses(new Map())
  }

  return (
    <>
      <div className="mx-5 flex w-full flex-col items-center space-y-[20px] md:mx-[110px]">
        <div className="mx-auto flex w-full flex-row items-end justify-between border-b border-disabled">
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
          <table className="w-full text-left text-sm text-gray-500">
            <caption className=" bg-white p-5 text-left text-lg font-semibold text-gray-900">
              <div className="flex flex-row justify-between">
                <div className="my-auto flex flex-col">
                  {allowlist?.title}
                  <p className="mt-1 text-sm font-normal text-gray-500 ">
                    {allowlist?.description}
                  </p>
                </div>
                <div className="my-auto flex w-[50px] flex-row justify-between">
                  <Image
                    className="hover:cursor-pointer"
                    onClick={() => setShowEditModal(true)}
                    alt="add"
                    src="/assets/edit.svg"
                    height="20"
                    width="20"
                  />
                  <Image
                    className="hover:cursor-pointer"
                    onClick={() => setShowDeleteModal(true)}
                    alt="add"
                    src="/assets/trash.svg"
                    height="20"
                    width="20"
                  />
                </div>
              </div>
            </caption>
            <thead className="bg-gray-50 text-xs uppercase text-gray-700  ">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      onChange={handleCheckAll}
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th
                  scope="col"
                  className=" flex flex-row justify-between py-4 px-6"
                >
                  <p>Users</p>
                  {selected.length > 0 && (
                    <p
                      className="hover:cursor-pointer hover:underline"
                      onClick={() => setShowDeleteAddressModal(true)}
                    >
                      Delete {selected.length} selected
                    </p>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              <>
                {gotInfo ? (
                  <>
                    {userDocs.map((doc, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-b bg-white hover:bg-gray-50"
                        >
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-search-1"
                                type="checkbox"
                                name={index.toString()}
                                checked={false}
                                onChange={handleCheck}
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                              />
                              <label
                                htmlFor="checkbox-table-search-1"
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
              
                            <td className="py-4 px-6 font-medium text-gray-900">
                              {<p>Uid: <span className="float-right">{doc.uid}</span></p>}
                              <br />
                              {<p>Email: <span className="float-right">{doc.email}</span></p>}
                              <br />
                              {<p>Wallet: <span className="float-right">{doc.wallet}</span></p>}
                              <br />
                              {<p>Twitter Account: <span className="float-right"><a href={`https://twitter.com/intent/user?user_id=${doc.twitter_id}`}>Twitter Profile</a></span></p>}
                              <br />
                              {<p>Discord ID: <span className="float-right">{doc.discord_username}</span></p>}
                              <br />
                              {<p>Member of Guild: <span className="float-right">{`${doc.discord_guild}`}</span></p>}
                              <br />
                              {<p>Status: <span className="float-right">{doc.status}</span></p>}
                            </td>
                        </tr>
                      )
                    })}
                  </>
                ) : (
                  <></>
                )}
              </>
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        width=""
        height=""
      >
        <DeleteConfirmation
          onConfirm={() => deleteAllowlist(lid?.toString())}
          onClose={() => setShowDeleteModal(false)}
          text="Are you sure you want to delete the Allowlist?"
        />
      </Modal>
      <Modal
        visible={showDeleteAddressModal}
        onClose={() => setShowDeleteAddressModal(false)}
        width=""
        height=""
      >
        <DeleteConfirmation
          onConfirm={() => handleDeleteSelectedAddresses()}
          onClose={() => setShowDeleteAddressModal(false)}
          text={`Are you sure you want to delete ${
            selected.length === 1
              ? 'this address?'
              : `theses ${selected.length} addresses`
          }`}
        />
      </Modal>
      <Modal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        width="w-3/4"
        height=""
      >
        <EditAllowlistForm
          onSuccess={() => {
            fetchData()
            setShowEditModal(false)
          }}
          allowlist={allowlist}
          id={lid?.toString() ?? ''}
        />
      </Modal>
    </>
  )
}

Allowlist.requireAuth = true
