import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc
} from '@firebase/firestore'
import { ethers } from 'ethers'
import { useAuth } from '../contexts/auth'
import { AllowlistInterface } from '../shared/interface/common'
import { db } from './firebase_config'

export default class AllowlistService {
  getAllowlistFromString(arg0: string) {
    throw new Error('Method not implemented.')
  }
  listsCollectionRef: CollectionReference

  constructor() {
    this.listsCollectionRef = collection(db, 'lists')
  }

  checkAuth = async (id: string | null, uid: string) => {
    if (id) {
      var allowlist = await getDoc(doc(db, 'lists', id))
      if (!allowlist.data()) {
        return { success: false, message: 'Allowlist not found' }
      }
      if (uid !== allowlist.data()?.uid) {
        return { success: false, message: 'User not allowed' }
      }
    }
  }

  create = async (
    title: string,
    description: string,
    uid: string,
    wallet: boolean,
    twitter: boolean,
    twitterFollowing: boolean,
    twitterAccountId: string,
    discord: boolean,
    discordGuild: boolean,
    discordGuildId: string,
    email: boolean,
    permalink: string,
    checkTokens: boolean,
    contractAddress: string,
    checkNumOfTokens: boolean,
    numberOfTokens: number
  ) => {
    try {
      var authVerification = await this.checkAuth(null, uid)
      if (
        authVerification !== undefined &&
        authVerification?.success === false
      ) {
        return authVerification
      } else {
        const listRef = await addDoc(this.listsCollectionRef, {
          title: title,
          description: description,
          uid: doc(db, 'users', uid),
          walletVerif: wallet,
          twitterVerif: twitter,
          twitterFollowing: twitterFollowing,
          twitterAccountId: twitterAccountId,
          discordVerif: discord,
          discordGuild: discordGuild,
          discordGuildId: discordGuildId,
          emailVerif: email,
          permalink: permalink,
          checkTokens: checkTokens,
          contractAddress: contractAddress,
          checkNumOfTokens: checkNumOfTokens,
          numberOfTokens: numberOfTokens,
          length: 0
        })
        try {
          await setDoc(doc(collection(listRef, 'registered_users'), '0'), {
            uid: '',
            email: '',
            phone: '',
            wallet: '',
            twitter_id: '',
            twitter_name: '',
            discord_username: '',
            discord_guild: '',
            userTokens: '',
            status: ''
          })
        } catch (e) {
          console.error('Error adding data: ', e)
        }
        return { success: true, message: 'List created successfully' }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
        return {
          success: false,
          message: `Could not create the allowlist: ${error.message}`
        }
      } else {
        return {
          success: false,
          message: `Could not create the allowlist`
        }
      }
    }
  }

  delete = async (id: string | null | undefined, uid: string) => {
    try {
      if (id) {
        await this.checkAuth(id, uid)
        await deleteDoc(doc(db, 'lists', id))
        return { success: true, message: 'Allowlist deleted successfully' }
      }
      return { success: false, message: 'Undefined list id' }
    } catch (error: unknown) {
      console.log(error)
      if (error instanceof Error) {
        return {
          success: false,
          message: `Could not delete allowlist: ${error.message}`
        }
      } else {
        return { success: false, message: `Error deleting Allowlist` }
      }
    }
  }

  update = async (
    id: string,
    title: string,   
    description: string, 
    uid: string,
    wallet: boolean,
    twitter: boolean,
    twitterFollowing: boolean,
    twitterAccountId: string,
    discord: boolean,
    discordGuild: boolean,
    discordGuildId: string,
    email: boolean,
    permalink: string,
    checkTokens: boolean,
    contractAddress: string,
    checkNumOfTokens: boolean,
    numberOfTokens: number
  ) => {
    try {
      if (id) {
        const authVerification = await this.checkAuth(id, uid)
        await updateDoc(doc(db, 'lists', id), {
          title: title,
          description: description,
          uid: doc(db, 'users', uid),
          walletVerif: wallet,
          twitterVerif: twitter,
          twitterFollowing: twitterFollowing,
          twitterAccountId: twitterAccountId,
          discordVerif: discord,
          discordGuild: discordGuild,
          discordGuildId: discordGuildId,
          emailVerif: email,
          permalink: permalink,
          checkTokens: checkTokens,
          contractAddress: contractAddress,
          checkNumOfTokens: checkNumOfTokens,
          numberOfTokens: numberOfTokens
        })
        return { success: true, message: 'Allowlist updated successfully' }
      }
      return { success: false, message: 'Undefined list id' }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
        return {
          success: false,
          message: `Could not update allowlist: ${error.message}`
        }
      } else {
        return { success: false, message: `Error updating Allowlist` }
      }
    }
  }

  getUserAllowlists = async (uid: string) => {
    var allowlists = []
    try {
      const authVerification = await this.checkAuth(null, uid)
      const data = await getDocs(this.listsCollectionRef)
      allowlists = data.docs
        .map((doc) => ({
          uid: doc.data().uid.id,
          title: doc.data().title,
          description: doc.data().description,
          allowlist_id: doc.id,
          length: doc.data().length,
          wallet: doc.data().walletVerif,
          twitter: doc.data().twitterVerif,
          twitterFollowing: doc.data().twitterFollowing,
          twitterAccountId: doc.data().twitterAccountId,
          discord: doc.data().discordVerif,
          discordGuild: doc.data().discordGuild,
          discordGuildId: doc.data().discordGuildId,
          email: doc.data().emailVerif,
          permalink: doc.data().permalink,
          checkTokens: doc.data().checkTokens,
          contractAddress: doc.data().contractAddress,
          checkNumOfTokens: doc.data().checkNumOfTokens,
          numberOfTokens: doc.data().numberOfTokens
        }))
        .filter((doc) => doc.uid === uid)
      return allowlists
    } catch (e) {
      console.log(e)
      return []
    }
  }

  getAllowlist = async (id: string | null) => {
    try {
      const allowlistDoc = await getDoc(doc(db, 'lists', id?.toString() ?? ''))
      if (!allowlistDoc.data()) {
        return { success: false, message: 'Allowlist not found' }
      }
      return { success: true, data: allowlistDoc.data() }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
        return {
          success: false,
          message: `Could not load allowlist: ${error.message}`
        }
      } else {
        return { success: false, message: `Error load Allowlist` }
      }
    }
  }
}
