import { useState, useEffect, useRef } from 'react'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../../services/firebase_config'
import { useAuth } from '../../../contexts/auth'
import { useRouter } from 'next/router'
import Button from '../../../components/button'
import ErrorAlert from '../../../components/alerts/errorAlert'
import TextInputDisplay from '../../../components/textInputDisplay'
import Verify from '../../../components/verify'
import EmailVerification from '../../u/components/emailVerification'
import VerifyFollowing from '../../verifyTwFollowing'
import VerifyGuild from '../../verifyGuild'
import Link from 'next/link'
import Modal from '../../../components/modal'
import { ContractResultDecodeError } from 'wagmi'

export default function AllowlistApplication() {
  /*Needed variables */
  const auth = useAuth()
  const uid = auth?.uid

  const router = useRouter()
  //const { lid } = router.query

  const { asPath } = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [wallet, setWallet] = useState('')
  const [twitter, setTwitter] = useState([])
  const [twitterName, setTwitterName] = useState([])
  const [discord, setDiscord] = useState('')
  const [email, setEmail] = useState(false)

  const [title, setTitle] = useState('')
  const [walletVerification, setWalletVerification] = useState(false)
  const [twitterVerification, setTwitterVerification] = useState(false)
  const [twitterFollowing, setTwitterFollowing] = useState(false)
  const [twitterAccount, setTwitterAccount] = useState('')
  const [discordVerification, setDiscordVerification] = useState(false)
  const [discordGuild, setDiscordGuild] = useState(false)
  const [guild, setGuild] = useState('')
  const [emailVerification, setEmailVerification] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [lid, setLid] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => {
      const pathParts = asPath.split('id=')
      if (pathParts.length >= 2) {
        if (asPath.includes('code')) {
          const pathParts = asPath.split('id=')
          const idCode = pathParts[1].split('&code=')
          setLid(idCode[0])
          console.log(lid)
          setCode(idCode[1])
          console.log(code)
        }
        else {
            setLid(pathParts[1])
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
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }
    getListInfo()
  }, [
    title,
    walletVerification,
    twitterVerification,
    twitterFollowing,
    twitterAccount,
    discordVerification,
    discordGuild,
    guild,
    emailVerification
  ])

  /*User Info*/
  useEffect(() => {
    const getUserInfo = async () => {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setWallet(docSnap.data().wallet)
        setTwitter(docSnap.data().tw_verifs)
        setDiscord(docSnap.data().discord_id)
        setEmail(docSnap.data().email_verified)
        setTwitterName(docSnap.data().twitter_name)
        setShowModal(
          wallet != '' || twitter.length != 0 || discord != '' || email
            ? false
            : true
        )
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }
    getUserInfo()
  }, [wallet, twitter, discord, email])
  /*Use conditionals to only show the values that the user chose as true*/
  /*Check for previous verifications*/

  return (
    <div className="flex w-screen bg-secondaryBg pb-[100px] pt-[35px]">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-start justify-start space-y-4">
        <Modal
          visible={showModal}
          onClose={() => setShowModal(false)}
          width="w-1/2"
          height=""
        >
          <div className="flex flex-col space-y-4 p-4">
            <h3>Please finish setting up your profile</h3>
            <p>
              This list requires for your profile to be complete before applying
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
            <VerifyFollowing twitterID={twitterAccount} />
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
            /*When clicked iit saves info on db */
          <>
            <p className="border-b-2 border-primary font-medium">
              VERIFY YOU&apos;RE A PART OF THE CREATOR&apos;S GUILD
            </p>
            <VerifyGuild discordGuildID={guild} />
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
          <Button
            type="submit"
            text="Apply"
            active={!loading}
            onClick={() => null}
          ></Button>
          {error && (
            <ErrorAlert
              title="Oops!"
              description={error}
              onClose={() => setError('')}
            />
          )}
        </form>
      </div>
    </div>
  )
}
