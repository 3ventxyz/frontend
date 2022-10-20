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

export default function AllowlistApplication() {
  /*Needed variables */
  const auth = useAuth()
  const uid = auth?.uid

  const router = useRouter()
  const { lid } = router.query

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
  }, [])

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
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }
    getUserInfo()
  }, [])
  /*Use conditionals to only show the values that the user chose as true*/
  /*Check for previous verifications*/
  return (
    <div className="flex w-screen bg-secondaryBg pb-[100px] pt-[35px]">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-start justify-start space-y-4">
        <h3 className="w-full max-w-[600px] border-b border-disabled">
          {title}
        </h3>
        {walletVerification ? <p>Check wallet</p> : <></>}

        {twitterVerification ? (
          twitter.length != 0 ? (
            <>
              <p>Select of verified accounts</p>
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
            </>
          ) : (
            <Verify twitter={true} discord={false} />
          )
        ) : (
          <></>
        )}

        {twitterFollowing ? (
          <VerifyFollowing twitterID={twitterAccount} />
        ) : (
          <></>
        )}

        {discordVerification ? (
          <Verify twitter={false} discord={true} />
        ) : (
          <></>
        )}

        {discordGuild ? <VerifyGuild discordGuildID={guild} /> : <></>}

        {emailVerification ? (
          <EmailVerification />
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
