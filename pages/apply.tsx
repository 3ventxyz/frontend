import { useState, useEffect, useRef } from 'react'
import { doc, getDoc, setDoc, collection, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase_config'
import { useAuth } from '../contexts/auth'
import { useRouter } from 'next/router'
import Button from '../components/button'
import ErrorAlert from '../components/alerts/errorAlert'
import VerifyFollowing from '../components/verifyTwFollowing'
import VerifyGuild from '../components/verifyGuild'
import Link from 'next/link'
import Modal from '../components/modal'

export default function AllowlistApplication() {
  const auth = useAuth()
  const uid = auth?.uid

  const { asPath } = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [wallet, setWallet] = useState('')
  const [twitter, setTwitter] = useState([])
  const [twitterName, setTwitterName] = useState([])
  const [discord, setDiscord] = useState('')
  const [emailVerif, setEmailVerif] = useState(false)
  const [email, setEmail] = useState('')
  let status = 'not submitted'
  const [title, setTitle] = useState('')
  const [walletVerification, setWalletVerification] = useState(false)
  const [twitterVerification, setTwitterVerification] = useState(false)
  const [twitterFollowing, setTwitterFollowing] = useState(false)
  const [twitterAccount, setTwitterAccount] = useState('')
  const [discordVerification, setDiscordVerification] = useState(false)
  const [discordGuild, setDiscordGuild] = useState(false)
  const [guild, setGuild] = useState('')
  const [emailVerification, setEmailVerification] = useState(false)
  const [permalink, setPermalink] = useState('')
  const [showModal, setShowModal] = useState(true)

  const [lid, setLid] = useState('')

  useEffect(() => {
    if (asPath.includes('state')) {
      const pathParts = asPath.split('state')
      const middle = pathParts[1].slice(
        pathParts[1].indexOf('=') + 1,
        pathParts[1].lastIndexOf('%')
      )
      const decoded = atob(`${middle}=`)
      setLid(decoded)
    }
    if (asPath.includes('id')) {
      const pathParts = asPath.split('id=')
      if (pathParts.length >= 2) {
        console.log(pathParts[1])
        setLid(pathParts[1])
        console.log(lid)
      }
    }
  }, [lid])

  /*Allowlist Info */
  useEffect(() => {
    const getListInfo = async () => {
      const docRef = doc(db, 'lists', lid?.toString() ?? '')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setTitle(docSnap.data().title)
        setWalletVerification(docSnap.data().walletVerif)
        setTwitterVerification(docSnap.data().twitterVerif)
        setTwitterFollowing(docSnap.data().twitterFollowing)
        setTwitterAccount(docSnap.data().twitterAccountId)
        setDiscordVerification(docSnap.data().discordVerif)
        setDiscordGuild(docSnap.data().discordGuild)
        setGuild(docSnap.data().discordGuildId)
        setEmailVerification(docSnap.data().emailVerif)
        setPermalink(docSnap.data().permalink)
      } else {
        console.log('No such document!')
      }
    }
    if (lid !== '') {
      getListInfo()
    }
  }, [
    title,
    walletVerification,
    twitterVerification,
    twitterFollowing,
    twitterAccount,
    discordVerification,
    discordGuild,
    guild,
    emailVerification,
    lid,
    permalink
  ])

  /*User Info*/
  useEffect(() => {
    const modal = () => {
      setShowModal(
        wallet != '' && twitter.length != 0 && discord != '' && emailVerif
          ? false
          : true
      )
    }
    const getUserInfo = async () => {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setWallet(docSnap.data().wallet)
        setTwitter(docSnap.data().tw_verifs)
        setDiscord(docSnap.data().discord_id)
        setEmailVerif(docSnap.data().email_verified)
        setTwitterName(docSnap.data().twitter_name)
        setEmail(docSnap.data().email)
        modal()
      } else {
        console.log('No such document!')
      }
    }
    getUserInfo()
  }, [email])

  /*Save info */
  const saveProfile = async (
    uid: string,
    twitter_id: string[],
    discord_id: string,
    wallet: string,
    email: string,
    status: string
  ) => {
    try {
      const docRef = doc(db, 'lists', lid)
      const userRef = await getDoc(
        doc(collection(docRef, 'registered_users'), uid)
      )
      if (userRef.exists()) {
          await updateDoc(
            doc(collection(docRef, 'registered_users'), `${uid}`),
            {
              uid: uid,
              twitter_id: twitter_id,
              discord_id: discord_id,
              wallet: wallet,
              email: email,
              status: status
            }
          )
      } else {
        console.log('test')
        await setDoc(doc(collection(docRef, 'registered_users'), uid), {
          uid: uid,
          twitter_id: twitter_id,
          discord_id: discord_id,
          wallet: wallet,
          email: email,
          status: status
        })
      }
      console.log('Data written into doc ID: ', docRef.id)
      return true
    } catch (e) {
      console.error('Error adding data: ', e)
    }
  }

  return (
    <div className="flex w-screen bg-secondaryBg pb-[100px] pt-[35px]">
      {lid !== '' ? (
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
            {title}
          </h3>
          {walletVerification ? (
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

          {twitterVerification ? (
            <>
              <p className="border-b-2 border-primary font-medium">
                VERIFY TWITTER
              </p>
              <select>
                {twitter.map((account, index) => {
                  return (
                    <>
                      <option value={twitter[index]}>
                        {twitterName[index]}
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
          {twitterFollowing ? (
            /*When clicked it saves info on db */
            <>
              <p className="border-b-2 border-primary font-medium">
                VERIFY YOU&apos;RE FOLLOWING THE CREATOR&apos;S ACCOUNT
              </p>
              <div
                onClick={() => {
                  saveProfile(uid, twitter, discord, wallet, email, status)
                }}
              >
                <VerifyFollowing twitterAccount={twitterAccount} lid={lid} />
              </div>
            </>
          ) : (
            <></>
          )}

          {discordVerification ? (
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

          {discordGuild ? (
            <>
              <p className="border-b-2 border-primary font-medium">
                VERIFY YOU&apos;RE A PART OF THE CREATOR&apos;S GUILD
              </p>
              <div
                onClick={() => {
                  saveProfile(uid, twitter, discord, wallet, email, status)
                }}
              >
                <VerifyGuild discordGuildID={guild} lid={lid} />
              </div>
              <div className="w-1/2">
              <p>If you are not a part of the creator&apos;s guild yet, you can join it before applying to the list</p>
                <a
                  href={permalink}
                  className="inline-flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#5865f2] text-[14px] font-semibold text-white hover:bg-[#4752c4] mt-2"
                >
                  Join Guild
                </a>
              </div>
            </>
          ) : (
            <></>
          )}

          {emailVerification ? (
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

          <form className="m-4 w-full" onSubmit={() => {}}>
            <Link href="/creator">
              <Button
                type="submit"
                text="Apply"
                active={!loading}
                onClick={() => {
                  saveProfile(
                    uid,
                    twitter[0],
                    discord,
                    wallet,
                    email,
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
