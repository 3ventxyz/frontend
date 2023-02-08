import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState, useRef } from 'react'
import {
  AllowlistInterface,
  AllowlistTableHeader,
  AllowlistUser
} from '../../shared/interface/common'
import Image from 'next/image'
import { HiChevronLeft } from 'react-icons/hi'
import { Modal } from '../../components/utils/modal'
import AllowlistService from '../../services/allowlists'
import EditAllowlistForm from '../../components/allowlist/editAllowlistForm'
import { useAuth } from '../../contexts/auth'
import DeleteConfirmation from '../../components/allowlist/deleteConfirmation'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebase_config'
import AllowlistUsersTable from '../../components/listusertable'
import { TableBody, TableRow, TableCell } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { CSVLink } from 'react-csv'

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
  const [listMetaData, setListMetaData] = useState({
    listUid: '',
    checkTokens: false,
    contractAddress: '',
    checkNumOfTokens: false,
    numberOfTokens: 0,
    title: '',
    walletVerification: false,
    twitterVerification: false,
    twitterFollowing: false,
    twitterAccount: '',
    discordVerification: false,
    discordGuild: false,
    guild: '',
    emailVerification: false,
    permalink: ''
  })

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let arr: Array<AllowlistUser> = []
        setGotInfo(true)
        const docRef = doc(db, 'lists', `${lid}`)
        /*loop through every user*/
        const userRef = await getDocs(collection(docRef, 'registered_users'))
        userRef.forEach((doc) => {
          arr.push({
            uid: doc.data().uid,
            email: doc.data().email,
            wallet: doc.data().wallet,
            twitter_id: doc.data().twitter_id,
            twitter_name: doc.data().twitter_name,
            discord_username: doc.data().discord_username,
            discord_guild: doc.data().discord_guild,
            userTokens: doc.data().userTokens,
            status: doc.data().status
          })
        })
        setUserDocs(arr)
      } catch (e) {
        console.error('Error adding data: ', e)
      }
    }
    if (!gotInfo) {
      getUserInfo()
    }
  }, [])

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
  /*Allowlist Info */
  useEffect(() => {
    const getListInfo = async () => {
      const docRef = doc(db, 'lists', lid?.toString() ?? '')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListMetaData({
          ...listMetaData,
          title: docSnap.data().title,
          checkTokens: docSnap.data().checkTokens,
          contractAddress: docSnap.data().contractAddress,
          checkNumOfTokens: docSnap.data().checkNumOfTokens,
          numberOfTokens: docSnap.data().numberOfTokens,
          walletVerification: docSnap.data().walletVerif,
          twitterVerification: docSnap.data().twitterVerif,
          twitterFollowing: docSnap.data().twitterFollowing,
          twitterAccount: docSnap.data().twitterAccountId,
          discordVerification: docSnap.data().discordVerif,
          discordGuild: docSnap.data().discordGuild,
          guild: docSnap.data().discordGuildId,
          emailVerification: docSnap.data().emailVerif,
          permalink: docSnap.data().permalink,
          listUid: docSnap.data().uid.path.split('/')[1]
        })
      } else {
        console.log('No such document!')
      }
    }
    if (lid !== '') {
      getListInfo()
    }
  }, [listMetaData, lid])

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
      auth.currentUser?.uid ?? '',
      listMetaData.walletVerification,
      listMetaData.twitterVerification,
      listMetaData.twitterFollowing,
      listMetaData.twitterAccount,
      listMetaData.discordVerification,
      listMetaData.discordGuild,
      listMetaData.guild,
      listMetaData.emailVerification,
      listMetaData.permalink,
      listMetaData.checkTokens,
      listMetaData.contractAddress,
      listMetaData.checkNumOfTokens,
      listMetaData.numberOfTokens
    )
    await fetchData()
    setAddresses(new Map())
  }

  const allowlistUserHeader: Array<AllowlistTableHeader> = [
    { id: 'uid', label: 'User ID', disableSorting: true, display: true },
    {
      id: 'email',
      label: 'Email',
      disableSorting: true,
      display: listMetaData.emailVerification
    },
    {
      id: 'wallet',
      label: 'Wallet',
      disableSorting: true,
      display: listMetaData.walletVerification
    },
    {
      id: 'twitter_id',
      label: 'Twitter',
      disableSorting: true,
      display: listMetaData.twitterVerification
    },
    {
      id: 'discord_user',
      label: 'Discord',
      disableSorting: true,
      display: listMetaData.discordVerification
    },
    {
      id: 'discord_guild',
      label: 'Guild Membership',
      disableSorting: true,
      display: listMetaData.discordGuild
    },
    {
      id: 'token_ownership',
      label: 'Tokens Owned',
      disableSorting: false,
      display: listMetaData.checkTokens
    },
    { id: 'status', label: 'Status', disableSorting: false, display: true }
  ]
  const { TblContainer, TblHead, TblPagination, listAfterPagingAndSorting } =
    AllowlistUsersTable(userDocs, allowlistUserHeader)

  return (
    <>
      {listMetaData.listUid !== auth.uid ? (
        <>
          <div className="mx-5 flex w-full flex-col items-center space-y-[20px] md:mx-[110px]">
            <h4>You do not have the permissions to see this information</h4>
          </div>
        </>
      ) : (
        <>
          {' '}
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
            <div className="relative w-full max-w-fit overflow-x-auto shadow-md sm:rounded-lg">
              <div className=" bg-white p-5 text-left text-lg font-semibold text-gray-900">
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
                    <CSVLink
                      data={listAfterPagingAndSorting()}
                      filename={`${listMetaData.title}.csv`}
                    >
                      <Image
                        className="hover:cursor-pointer"
                        alt="download"
                        src="/assets/csv-download.svg"
                        height="20"
                        width="20"
                      />
                    </CSVLink>
                  </div>
                </div>
              </div>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {listAfterPagingAndSorting().map((list: AllowlistUser, i) => (
                    <TableRow key={i} className="bg-white">
                      <TableCell>
                        <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">
                          {list.uid}
                        </span>
                      </TableCell>
                      <>
                        {listMetaData.emailVerification ? (
                          <TableCell>
                            <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">
                              {list.email}
                            </span>
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </>
                      <>
                        {listMetaData.walletVerification ? (
                          <TableCell>
                            <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">
                              {list.wallet}
                            </span>
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </>
                      <>
                        {listMetaData.twitterVerification ? (
                          <TableCell>
                            <a
                              href={`https://twitter.com/i/user/${list.twitter_id}`}
                            >
                              <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">
                                {list.twitter_name}
                              </span>
                            </a>
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </>
                      <>
                        {listMetaData.discordVerification ? (
                          <TableCell>
                            <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">
                              {list.discord_username}
                            </span>
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </>
                      <>
                        {listMetaData.discordGuild ? (
                          <TableCell>
                            <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">{`${list.discord_guild}`}</span>
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </>
                      <>
                        {listMetaData.checkTokens ? (
                          <TableCell>
                            <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">{`${list.userTokens}`}</span>
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </>
                      <TableCell>
                        <span className="text-gray-500">{list.status}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TblPagination />
              </TblContainer>
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
      )}
    </>
  )
}

Allowlist.requireAuth = true
