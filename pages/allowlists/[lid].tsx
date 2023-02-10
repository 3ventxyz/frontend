import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState, useRef } from 'react'
import {
  AllowlistInterface,
  AllowlistUser,
  AllowlistTableHeader
} from '../../shared/interface/common'
import Image from 'next/image'
import { HiChevronLeft } from 'react-icons/hi'
import Modal from '../../components/utils/modal'
import AllowlistService from '../../services/allowlists'
import EditAllowlistForm from '../../components/allowlist/editAllowlistForm'
import { useAuth } from '../../contexts/auth'
import DeleteConfirmation from '../../components/allowlist/deleteConfirmation'
import { doc, getDoc, collection, getDocs, updateDoc, setDoc, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase_config'
import AllowlistUsersTable from '../../components/listusertable'
import { TableBody, TableRow, TableCell, FormControlLabel, Checkbox } from '@mui/material'
import { CSVLink } from 'react-csv'
import TextInput from '../../components/inputs/textInput'
import Button from '../../components/buttons/button'
import { TramOutlined } from '@material-ui/icons'
import { ContractResultDecodeError } from 'wagmi'

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
  const [editting, setEditting] = useState(false)
  const [index, setIndex] = useState(0)
  const [editable, setEditable] = useState<AllowlistUser>()
  const [listMetaData, setListMetaData] = useState({
    id: '',
    listUid: '',
    description: '',
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
    permalink: '',
    length: 0
  })
  const [userMetaData, setUserMetaData] = useState({
    id: 0,
    email: '',
    phone: '',
    twitterId: '',
    twitterName: '',
    discordId: '',
    discordGuild: false,
    wallet: ''
  })
  const [newUserMetaData, setNewUserMetaData] = useState<AllowlistUser>({
    uid: '',
    email: '',
    phone: '',
    wallet: '',
    twitter_id: '',
    twitter_name: '',
    discord_id: '',
    discord_username: '',
    discord_guild: false,
    userTokens: false,
    status: 'Added by creator',
    id: 0
  })
  const [csvFile, setCsvFile] = useState<File>()
const [csvArray, setCsvArray] = useState(Array<AllowlistUser>)
const [submitCsv, setSubmitCsv] = useState(false)
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
            phone: doc.data().phone,
            wallet: doc.data().wallet,
            twitter_id: doc.data().twitter_id,
            twitter_name: doc.data().twitter_name,
            discord_username: doc.data().discord_username,
            discord_id: doc.data().discord_id,
            discord_guild: doc.data().discord_guild,
            userTokens: doc.data().userTokens,
            status: doc.data().status,
            id: doc.data().id
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
    const getListInfo = async () => {
      const docRef = doc(db, 'lists', lid?.toString() ?? '')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListMetaData({
          ...listMetaData,
          id: docSnap.data().id,
          description: docSnap.data().description,
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
          listUid: docSnap.data().uid.path.split('/')[1],
          length: docSnap.data().length
        })
      } else {
        console.log('No such document!')
      }
    }
    if (lid !== '') {
      getListInfo()
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
    userDocs.map((e: AllowlistUser, i) => {
      tmp.set(e.phone, checked)
    })
    setAddresses(tmp)
    console.log(tmp)
  }

  const handleDeleteSelectedAddresses = async () => {
    var response = await allowlistService.update(
      listMetaData.id,
      listMetaData.title,
      listMetaData.description,
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

  /*Populate data based on data provided (right now only email) */
  const populateUser = async (data: AllowlistUser) => {
    setIndex(data.id)
    if (data.phone !== '') {
      try {
        const users = query(collection(db, 'users'), where("phone_number", "==", data.phone))
        const usersSnapshot = await getDocs(users)
        if (usersSnapshot) {
          await usersSnapshot.forEach((doc) => {
            setNewUserMetaData({
              ...newUserMetaData,
              uid: doc.data().uid,
              email: doc.data().email,
              phone: doc.data().phone_number,
              twitter_id: doc.data().twitter_id,
              twitter_name: doc.data().twitter_name,
              discord_id: doc.data().discord_id,
              wallet: doc.data().wallet
            })
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    else if (data.email !== '') {
      try {
        const users = query(collection(db, 'users'), where("email", "==", data.email))
        const usersSnapshot = await getDocs(users)
        if (usersSnapshot) {
          await usersSnapshot.forEach((doc) => {
            setNewUserMetaData({
              ...newUserMetaData,
              uid: doc.data().uid,
              email: doc.data().email,
              phone: doc.data().phone_number,
              twitter_id: doc.data().twitter_id,
              twitter_name: doc.data().twitter_name,
              discord_id: doc.data().discord_id,
              wallet: doc.data().wallet
            })
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    else if (data.wallet !== '') {
      try {
        const users = query(collection(db, 'users'), where("wallet", "==", data.wallet))
        const usersSnapshot = await getDocs(users)
        if (usersSnapshot) {
          await usersSnapshot.forEach((doc) => {
            setNewUserMetaData({
              ...newUserMetaData,
              uid: doc.data().uid,
              email: doc.data().email,
              phone: doc.data().phone_number,
              twitter_id: doc.data().twitter_id,
              twitter_name: doc.data().twitter_name,
              discord_id: doc.data().discord_id,
              wallet: doc.data().wallet
            })
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    else if (data.twitter_id !== '') {
      try {
        const users = query(collection(db, 'users'), where("tw_verifs", "==", [data.twitter_id]))
        const usersSnapshot = await getDocs(users)
        if (usersSnapshot) {
          await usersSnapshot.forEach((doc) => {
            setNewUserMetaData({
              ...newUserMetaData,
              uid: doc.data().uid,
              email: doc.data().email,
              phone: doc.data().phone_number,
              twitter_id: doc.data().twitter_id,
              twitter_name: doc.data().twitter_name,
              discord_id: doc.data().discord_id,
              wallet: doc.data().wallet
            })
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    else if (data.discord_id !== '') {
      try {
        const users = query(collection(db, 'users'), where("discord_id", "==", [data.discord_id]))
        const usersSnapshot = await getDocs(users)
        if (usersSnapshot) {
          await usersSnapshot.forEach((doc) => {
            setNewUserMetaData({
              ...newUserMetaData,
              uid: doc.data().uid,
              email: doc.data().email,
              phone: doc.data().phone_number,
              twitter_id: doc.data().twitter_id,
              twitter_name: doc.data().twitter_name,
              discord_id: doc.data().discord_id,
              wallet: doc.data().wallet
            })
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    else {
      console.log('user not found')
    }
  }
  /*Make new empty user */
  const createNewUser = async (id: number) => {
    try {
      const docRef = doc(db, 'lists', `${lid}`)
      await updateDoc(docRef, { length: id + 1 })
      await setDoc(doc(collection(docRef, 'registered_users'), `${id}`), {
        uid: '',
        email: '',
        phone: '',
        wallet: '',
        twitter_id: '',
        twitter_name: '',
        discord_username: '',
        discord_guild: '',
        userTokens: '',
        status: '',
        id: id
      })
      console.log('Data written into doc ID: ', docRef.id)
      return true
    } catch (e) {
      console.error('Error adding data: ', e)
    }
    fetchData()
  }
  /*Save the user with the information provided by db*/
  const saveNewUser = async (i: number) => {
    console.log(i, index)
    setEditting(false)
    try {
      const docRef = doc(db, 'lists', `${lid}`)
      await setDoc(doc(collection(docRef, 'registered_users'), `${index}`), {
        email: newUserMetaData.email,
        phone: newUserMetaData.phone,
        twitterId: newUserMetaData.twitter_id,
        twitterName: newUserMetaData.twitter_name,
        discordId: newUserMetaData.discord_id,
        wallet: newUserMetaData.wallet
      })
    } catch (e) {
      console.log(e)
    }
    fetchData()
  }

  const allowlistUserHeader = [
    { id: 'email', label: 'Email', disableSorting: false, display: listMetaData.emailVerification },
    { id: 'phone', label: 'Phone', disableSorting: true, display: true },
    { id: 'wallet', label: 'Wallet', disableSorting: true, display: listMetaData.walletVerification },
    { id: 'twitter_id', label: 'Twitter', disableSorting: true, display: listMetaData.twitterVerification },
    { id: 'discord_user', label: 'Discord', disableSorting: true, display: listMetaData.discordVerification },
    { id: 'discord_guild', label: 'Guild Membership', disableSorting: true, display: listMetaData.discordGuild },
    { id: 'status', label: 'Status', disableSorting: false, display: true },
    { id: 'actions', label: 'Actions', disableSorting: true, display: true }
  ]

  const { TblContainer, TblHead, TblPagination, listAfterPagingAndSorting } =
    AllowlistUsersTable(userDocs, allowlistUserHeader)

  const makeEditable = (i: number) => {
    setEditting(true)
    setNewUserMetaData({...newUserMetaData, id: listAfterPagingAndSorting()[i].id})
    setIndex(newUserMetaData.id)
    setEditable(listAfterPagingAndSorting()[i])
  }

  const processCSV = (str: string, delim=',') => {
    const columns = str.slice(0, str.indexOf('\n')).split(delim)
    const headers = columns.map((header) => {
      return header.replace('"', '').replace('"', '')
    })
    const rows = str.slice(str.indexOf('\n') + 1).split('\n')

    const newArray = rows.map(row => {
      const values = row.split(delim)
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i]
        return obj
      }, {})
      return eachObject
    })
    setCsvArray(newArray)
    setSubmitCsv(true)
  }

  const submit = () => {
    const file = csvFile
    const reader = new FileReader()
    reader.onload = function(e) {
      const text = e.target?.result
      console.log('text',text)
      processCSV(text)
    }
    reader.readAsText(file)
  }

  const uploadCsvToDb = () => {{
    let i = listAfterPagingAndSorting().length
    console.log(i)
    csvArray.map(async (user) => {
      setNewUserMetaData({...newUserMetaData, id: i})
      await createNewUser(i)
      await populateUser(user)
      console.log(i,newUserMetaData)
      i++
    })
  }}

  return (
    <>
      {auth.uid !== auth.uid ?
        (
          <>
            <div className="mx-5 flex w-full flex-col items-center space-y-[20px] md:mx-[110px]">
              <h4>You do not have the permissions to see this information</h4>
            </div>
          </>
        ) : (
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
              <div className="relative w-full max-w-fit overflow-x-auto shadow-md sm:rounded-lg">
                <div className=" bg-white p-5 text-left text-lg font-semibold text-gray-900">
                  <div className="flex flex-row justify-between">
                    <div className="my-auto flex flex-col">
                      {listMetaData.title}
                      <p className="mt-1 text-sm font-normal text-gray-500 ">
                        {listMetaData.description}
                      </p>
                      <p className="mt-1 text-sm font-normal text-gray-500 ">
                        Add your list by uploading a CSV file with the data
                      </p>
                      <form id="csv-form">
                        <input
                        type="file"
                        accept=".csv"
                        id="csv-file"
                        onChange={(e) => setCsvFile(e.target?.files[0])}
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-accent file:text-white
                        hover:file:accent file:my-4 file:hover:cursor-pointer"
                        ></input>
                       <Button onClick={(e) => {
                        e.preventDefault()
                        if(csvFile)submit()
                       }} text='Check file' active={true} />
                        <Button onClick={() => {uploadCsvToDb()}} text='Submit' active={submitCsv} />
                      </form>
                    </div>
                    <div className="my-auto flex w-[150px] flex-row justify-between">
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
                        {listMetaData.emailVerification ? (<TableCell>
                          <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">
                            {list.email}
                          </span>
                        </TableCell>) : (<></>)}
                        <TableCell>
                          <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">
                            {list.phone}
                          </span>
                        </TableCell>
                        {listMetaData.walletVerification ? (<TableCell>
                          <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">
                            {list.wallet}
                          </span>
                        </TableCell>) : (<></>)}
                        {listMetaData.twitterVerification ? (<TableCell>
                          <a href={`https://twitter.com/i/user/${list.twitter_id}`}>
                            <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">
                              {list.twitter_name}
                            </span>
                          </a>
                        </TableCell>) : (<></>)}
                        {listMetaData.discordVerification ? (
                          <TableCell>
                            <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">
                              {list.discord_username}
                            </span>
                          </TableCell>
                        ) : (<></>)}
                        {listMetaData.discordGuild ? (
                          <TableCell>
                            <span className="... inline-block w-[100px] truncate text-gray-900 hover:w-auto">{`${list.discord_guild}`}</span>
                          </TableCell>
                        ) : (<></>)}
                        <TableCell>
                          <span className="text-gray-500">{list.status}</span>
                        </TableCell>
                        <TableCell>
                          <Image
                            className="hover:cursor-pointer"
                            onClick={() => makeEditable(list.id)}
                            alt="add"
                            src="/assets/edit.svg"
                            height="20"
                            width="20"
                          />
                          {i + 1 === listAfterPagingAndSorting().length ? (
                            <Image
                              className="hover:cursor-pointer"
                              onClick={() => createNewUser(listAfterPagingAndSorting().length)}
                              alt="add"
                              src="/assets/add.svg"
                              height="80"
                              width="80"
                            />
                          ) : (<></>)}
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
                text={`Are you sure you want to delete ${selected.length === 1
                  ? 'this address?'
                  : `theses ${selected.length} addresses`
                  }`}
              />
            </Modal>
            <Modal
              visible={showEditModal}
              onClose={() => setShowEditModal(false)}
              width="w-3/4"
              height="h-3/4"
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
            <Modal
              visible={editting}
              onClose={() => setEditting(false)}
              width="w-3/4"
              height="h-3/4"
            >
              <div className="bg-white p-2">
                <p className="font-medium text-gray-900">Edit User&apos;s Information</p>
                <div className="p-4">
                  {listMetaData.emailVerification ? (
                    <>
                      <label
                        className="mb-2 block text-m font-medium text-gray-900"
                        htmlFor='email'
                      >User email</label>
                      <input
                        onChange={(e) => setNewUserMetaData({ ...newUserMetaData, email: e.target.value })}
                        className={'w-full focus:shadow-outline leading-0 block h-full max-w-[500px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'}
                        id='email'
                        type="text"
                        placeholder={editable?.email}
                        disabled={false}
                      /></>
                  ) : (<></>)}
                  <>
                    <label
                      className="mb-2 block text-m font-medium text-gray-900"
                      htmlFor='phone'
                    >User phone</label>
                    <input
                      onChange={(e) => setNewUserMetaData({ ...newUserMetaData, phone: e.target.value })}
                      className={'w-full focus:shadow-outline leading-0 block h-full max-w-[500px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'}
                      id='phone'
                      type="text"
                      placeholder={editable?.phone}
                      disabled={false}
                    />
                  </>
                  {listMetaData.walletVerification ? (
                    <>
                      <label
                        className="mb-2 block text-m font-medium text-gray-900"
                        htmlFor='wallet'
                      >User wallet</label>
                      <input
                        onChange={(e) => setNewUserMetaData({ ...newUserMetaData, wallet: e.target.value })}
                        className={'w-full focus:shadow-outline leading-0 block h-full max-w-[500px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'}
                        id='wallet'
                        type="text"
                        placeholder={editable?.wallet}
                        disabled={false}
                      />
                    </>
                  ) : (<></>)}
                  {listMetaData.twitterVerification ? (
                    <>
                      <label
                        className="mb-2 block text-m font-medium text-gray-900"
                        htmlFor='twitterid'
                      >User Twitter ID</label>
                      <input
                        onChange={(e) => setNewUserMetaData({ ...newUserMetaData, twitter_id: e.target.value })}
                        className={'w-full focus:shadow-outline leading-0 block h-full max-w-[500px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'}
                        id='twitterid'
                        type="text"
                        placeholder={editable?.twitter_id}
                        disabled={false}
                      />
                      <label
                        className="mb-2 block text-m font-medium text-gray-900"
                        htmlFor='twittername'
                      >User Twitter name</label>
                      <input
                        onChange={(e) => setNewUserMetaData({ ...newUserMetaData, twitter_name: e.target.value })}
                        className={'w-full focus:shadow-outline leading-0 block h-full max-w-[500px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'}
                        id='twittername'
                        type="text"
                        placeholder={editable?.twitter_name}
                        disabled={false}
                      />
                    </>
                  ) : (<></>)}
                  {listMetaData.discordVerification ? (
                    <>
                      <label
                        className="mb-2 block text-m font-medium text-gray-900"
                        htmlFor='discordid'
                      >User Discord ID</label>
                      <input
                        onChange={(e) => setNewUserMetaData({ ...newUserMetaData, discord_id: e.target.value })}
                        className={'w-full focus:shadow-outline leading-0 block h-full max-w-[500px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'}
                        id='discordid'
                        type="text"
                        placeholder={'discord Id'}
                        disabled={false}
                      />
                      <label
                        className="mb-2 block text-m font-medium text-gray-900"
                        htmlFor='discordusername'
                      >User Discord Username</label>
                      <input
                        onChange={(e) => setNewUserMetaData({ ...newUserMetaData, discord_username: e.target.value })}
                        className={'w-full focus:shadow-outline leading-0 block h-full max-w-[500px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'}
                        id='discordusername'
                        type="text"
                        placeholder={editable?.discord_username}
                        disabled={false}
                      />
                    </>
                  ) : (<></>)}
                </div>
                <div className="text-right p-4">
                  <Image
                    className="hover:cursor-pointer"
                    onClick={() => { populateUser(newUserMetaData) }}
                    alt="add"
                    src="/assets/search.svg"
                    height="50"
                    width="50"
                  />
                  <Image
                    className="hover:cursor-pointer"
                    onClick={() => saveNewUser(index)}
                    alt="save"
                    src="/assets/save.svg"
                    height="50"
                    width="50"
                  />
                </div>
              </div>
            </Modal>
          </>
        )}
    </>
  )
}

Allowlist.requireAuth = true