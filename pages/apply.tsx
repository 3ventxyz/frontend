import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc, collection, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase_config'
import { useAuth } from '../contexts/auth'
import { useRouter } from 'next/router'
import { Button } from '../components/buttons/button'
import ErrorAlert from '../components/alerts/errorAlert'
import VerifyGuild from '../components/auth/verifyGuild'
import Link from 'next/link'
import { Modal } from '../components/utils/modal'
import TokenOwnership from '../components/token_ownership'
export default function AllowlistApplication() {
  const auth = useAuth()
  const { asPath } = useRouter()
  const [error, setError] = useState('')
  const [submit, setSubmit] = useState(false)
  let status = 'not submitted'
  const [showModal, setShowModal] = useState(true)
  const [userMetaData, setUserMetaData] = useState({
    uid: auth?.uid,
    numberOfUserTokens: 0,
    userTokens: false,
    guildMember: undefined,
    twitterValue: 0,
    email: '',
    emailVerif: false,
    discord: '',
    twitterName: '',
    twitter: [],
    wallet: ''
  })
  const [listMetaData, setListMetaData] = useState({
    lid: '',
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
    if (asPath.includes('state')) {
      const pathParts = asPath.split('state')
      const middle = pathParts[1].slice(
        pathParts[1].indexOf('=') + 1,
        pathParts[1].lastIndexOf('%')
      )
      const decoded = atob(`${middle}=`)
      setListMetaData({
        ...listMetaData,
        lid: decoded
      })
    }
    if (asPath.includes('id')) {
      const pathParts = asPath.split('id=')
      if (pathParts.length >= 2) {
        setListMetaData({
          ...listMetaData,
          lid: pathParts[1]
        })
      }
    }
  }, [listMetaData, asPath])

  /*Allowlist Info */
  useEffect(() => {
    const getListInfo = async () => {
      const docRef = doc(db, 'lists', listMetaData.lid?.toString() ?? '')
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
          permalink: docSnap.data().permalink
        })
      } else {
        console.log('No such document!')
      }
    }
    if (listMetaData.lid !== '') {
      getListInfo()
    }
  }, [listMetaData])

  /*User Info*/
  useEffect(() => {
    const getUserInfo = async () => {
      const docRef = doc(db, 'users', userMetaData.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setUserMetaData({
          ...userMetaData,
          email: docSnap.data().email,
          emailVerif: docSnap.data().email_verified,
          discord: docSnap.data().discord_id,
          twitterName: docSnap.data().twitter_name,
          twitter: docSnap.data().tw_verifs,
          wallet: docSnap.data().wallet
        })
      } else {
        console.log('No such document!')
      }
    }
    getUserInfo()
  }, [userMetaData])

  /*Get user info on list only after you come back from the oauth and submit button activation*/
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const docRef = doc(db, 'lists', listMetaData.lid)
        const userRef = await getDoc(
          doc(collection(docRef, 'registered_users'), userMetaData.uid)
        )
        if (userRef.exists()) {
          setUserMetaData({
            ...userMetaData,
            numberOfUserTokens: userRef.data().userTokenBalance,
            userTokens: userRef.data().userTokens,
            guildMember: userRef.data().discord_guild
          })
        }
        return true
      } catch (e) {
        console.error('Error adding data: ', e)
      }
    }
    const canUserSubmit = () => {
      const discordGuildRequired = listMetaData.discordGuild
        ? userMetaData.guildMember
          ? userMetaData.guildMember === undefined
            ? false
            : true
          : false
        : true
      const tokenOwnershipRequired = listMetaData.checkTokens
        ? listMetaData.checkNumOfTokens
          ? listMetaData.numberOfTokens > 0
            ? listMetaData.numberOfTokens >= userMetaData.numberOfUserTokens
              ? true
              : false
            : false
          : true
        : true

      setSubmit(discordGuildRequired && tokenOwnershipRequired)
    }

    getUserInfo()

    canUserSubmit()
  }, [listMetaData, userMetaData])

  /*Modal Visibility*/
  useEffect(() => {
    const ModalVisibility = () => {
      const walletVar = !listMetaData.walletVerification
        ? true
        : userMetaData.wallet
        ? true
        : false
      const discordVar = !listMetaData.discordVerification
        ? true
        : userMetaData.discord !== ''
        ? true
        : false
      const twitterVar = !listMetaData.twitterVerification
        ? true
        : userMetaData.twitter.length > 0
        ? true
        : false
      const emailVar = !listMetaData.emailVerification
        ? true
        : userMetaData.emailVerif
        ? true
        : false
      setShowModal(
        walletVar && discordVar && twitterVar && emailVar ? false : true
      )
    }
    ModalVisibility()
  }, [listMetaData, userMetaData])

  /*Save info */
  const saveProfile = async (
    uid: string,
    twitter_id: string,
    twitter_name: string,
    discord_id: string,
    wallet: string,
    email: string,
    userTokens: boolean,
    status: string
  ) => {
    try {
      const docRef = doc(db, 'lists', listMetaData.lid)
      const userRef = await getDoc(
        doc(collection(docRef, 'registered_users'), uid)
      )
      if (userRef.exists()) {
        await updateDoc(doc(collection(docRef, 'registered_users'), `${uid}`), {
          uid: uid,
          twitter_id: twitter_id,
          twitter_name: twitter_name,
          discord_id: discord_id,
          wallet: wallet,
          email: email,
          userTokens: userTokens,
          status: status
        })
      } else {
        await setDoc(doc(collection(docRef, 'registered_users'), uid), {
          uid: uid,
          twitter_id: twitter_id,
          twitter_name: twitter_name,
          discord_id: discord_id,
          wallet: wallet,
          email: email,
          userTokens: userTokens,
          status: status
        })
      }
      console.log('Data written into doc ID: ', docRef.id)
      return true
    } catch (e) {
      console.error('Error adding data: ', e)
    }
  }

  const handleChange = (e: any) => {
    setUserMetaData({
      ...userMetaData,
      twitterValue: e.target.value
    })
  }

  return (
    <div className="flex w-screen bg-secondaryBg pb-[100px] pt-[35px]">
      {listMetaData.lid !== '' ? (
        <div className="mx-auto flex w-full max-w-[600px] flex-col items-start justify-start space-y-4">
          <Modal visible={showModal} onClose={() => {}} width="w-1/2" height="">
            <div className="flex flex-col space-y-4 p-4">
              <h3>Please finish setting up your profile</h3>
              <p>
                This list requires for your profile to be complete before
                applying
              </p>
              <Link href="/settings">
                <span className="flex h-[40px] w-1/2 cursor-pointer items-center justify-center rounded-[6px] bg-primary px-[20px] py-[10px] text-[14px] font-semibold leading-[] text-primaryBg">
                  Complete your profile
                </span>
              </Link>
            </div>
          </Modal>
          <h3 className="w-full max-w-[600px] border-b border-disabled">
            {listMetaData.title}
          </h3>
          {listMetaData.walletVerification ? (
            <>
              <p className="border-b-2 border-primary font-medium">
                {' '}
                VERIFY WALLET
              </p>
              <span className="inline-flex h-[40px] w-1/2 items-center justify-center rounded-[10px] bg-secondary text-[14px] font-semibold text-white">
                Wallet Verified
              </span>
            </>
          ) : (
            <></>
          )}

          {listMetaData.twitterVerification ? (
            <>
              <p className="border-b-2 border-primary font-medium">
                VERIFY TWITTER
              </p>
              <select onChange={handleChange}>
                {userMetaData.twitter.map((account, index) => {
                  return (
                    <>
                      <option value={index}>
                        {userMetaData.twitterName[index]}
                      </option>
                    </>
                  )
                })}
              </select>
              <Link href="/settings">
                <span className="inline-flex h-[40px] w-1/2 cursor-pointer items-center justify-center rounded-[10px] bg-[#1d9bf0] text-[14px] font-semibold text-white hover:bg-[#1a8cd8]">
                  Or verify a different account
                </span>
              </Link>
            </>
          ) : (
            <></>
          )}
          {listMetaData.twitterFollowing ? (
            <>
              <p className="border-b-2 border-primary font-medium">
                FOLLOW CREATOR&apos;S TWITTER
              </p>
              <p>
                If you are not following the creator&apos;s twitter account yet,
                you can follow it before applying to the list
              </p>
              <a
                href={`https://twitter.com/intent/user?user_id=${listMetaData.twitterAccount}`}
                className="inline-flex h-[40px] w-1/2 items-center justify-center rounded-[10px] bg-[#1d9bf0] text-[14px] font-semibold text-white hover:bg-[#1a8cd8]"
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  saveProfile(
                    userMetaData.uid,
                    userMetaData.twitter[userMetaData.twitterValue],
                    userMetaData.twitterName[userMetaData.twitterValue],
                    userMetaData.discord,
                    userMetaData.wallet,
                    userMetaData.email,
                    userMetaData.userTokens,
                    status
                  )
                }}
              >
                Follow Account
              </a>
            </>
          ) : (
            <></>
          )}

          {listMetaData.discordVerification ? (
            <>
              <p className="border-b-2 border-primary font-medium">
                VERIIFY DISCORD
              </p>
              <p className="inline-flex h-[40px] w-1/2 items-center justify-center rounded-[10px] border border-[#5865f2] bg-white text-[14px] font-semibold text-[#5865f2]">
                Discord Verified
              </p>
            </>
          ) : (
            <></>
          )}

          {listMetaData.discordGuild ? (
            <>
              <p className="border-b-2 border-primary font-medium">
                VERIFY YOU&apos;RE A PART OF THE CREATOR&apos;S GUILD
              </p>
              {userMetaData.guildMember ? (
                <div className="flex w-full flex-row items-center justify-start space-x-2 text-center">
                  <p className="inline-flex h-[40px] w-1/2 items-center justify-center rounded-[10px] border border-[#5865f2] bg-white text-[14px] font-semibold text-[#5865f2]">
                    Guild Membership Verified
                  </p>
                </div>
              ) : (
                <div
                  onClick={() => {
                    saveProfile(
                      userMetaData.uid,
                      userMetaData.twitter[userMetaData.twitterValue],
                      userMetaData.twitterName[userMetaData.twitterValue],
                      userMetaData.discord,
                      userMetaData.wallet,
                      userMetaData.email,
                      userMetaData.userTokens,
                      status
                    )
                  }}
                >
                  <VerifyGuild
                    discordGuildID={listMetaData.guild}
                    lid={listMetaData.lid}
                  />
                </div>
              )}
              <div className="w-1/2">
                {!userMetaData.guildMember &&
                userMetaData.guildMember !== undefined ? (
                  <>
                    <p>
                      You are not a part of the creator&apos;s guild yet, you
                      can join it before applying to the list
                    </p>
                    <a
                      href={listMetaData.permalink}
                      className="mt-2 inline-flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#5865f2] text-[14px] font-semibold text-white hover:bg-[#4752c4]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join Guild
                    </a>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <></>
          )}

          {listMetaData.emailVerification ? (
            <>
              <p className="border-b-2 border-primary font-medium">
                VERIFY YOUR EMAIL
              </p>
              <Link href="/settings">
                <span className="inline-flex h-[40px] w-1/2 items-center justify-center rounded-[10px] bg-secondary text-[14px] font-semibold text-white">
                  Email Verified
                </span>
              </Link>
            </>
          ) : (
            <></>
          )}

          {listMetaData.checkTokens ? (
            <>
              <p className="border-b-2 border-primary font-medium">
                VERIFY TOKENS
              </p>
              <div
                className="w-1/2"
                onClick={() => {
                  saveProfile(
                    userMetaData.uid,
                    userMetaData.twitter[userMetaData.twitterValue],
                    userMetaData.twitterName[userMetaData.twitterValue],
                    userMetaData.discord,
                    userMetaData.wallet,
                    userMetaData.email,
                    userMetaData.userTokens,
                    status
                  )
                }}
              >
                <TokenOwnership
                  numberOfTokens={listMetaData.numberOfTokens}
                  contractAddress={listMetaData.contractAddress}
                  lid={listMetaData.lid}
                  setNumberOfUserTokens={(num: number) => {
                    setUserMetaData({
                      ...userMetaData,
                      numberOfUserTokens: num
                    })
                  }}
                  numberOfUserTokens={userMetaData.numberOfUserTokens}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <form className="m-4 w-full" onSubmit={() => {}}>
            <Link href="/allowlists/success">
              <Button
                type="submit"
                text="Apply"
                active={submit}
                onClick={() => {
                  saveProfile(
                    userMetaData.uid,
                    userMetaData.twitter[userMetaData.twitterValue],
                    userMetaData.twitterName[userMetaData.twitterValue],
                    userMetaData.discord,
                    userMetaData.wallet,
                    userMetaData.email,
                    userMetaData.userTokens,
                    'submitted'
                  )
                }}
              ></Button>
            </Link>
            {error && (
              <ErrorAlert
                title="Oops!"
                description={error}
                onClose={() => setError('')}
              />
            )}
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
