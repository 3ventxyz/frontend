import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc
} from '@firebase/firestore'
import { ethers } from 'ethers'
import { useAuth } from '../contexts/auth'
import { AllowlistInterface } from '../shared/interface/common'
import { db } from './firebase_config'

export default class AllowlistService {
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

  getAllowlistFromString = (allowlist: string) => {
    // Gets the input string with all address and removes extra spaces,
    // apostrophes, repeated and invalid addresses
    const _allowlist = allowlist
      .split(',')
      .map((e, i) => {
        return e.trim().replaceAll("'", '')
      })
      .filter((val, id, array) => {
        return array.indexOf(val) === id && this.isValidAddress(val)
      })
    return _allowlist
  }

  create = async (
    addresses: string,
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
        const allowlist = this.getAllowlistFromString(addresses)

        if (allowlist && allowlist.length > 0) {
          await addDoc(this.listsCollectionRef, {
            title: title,
            description: description,
            allowlist: allowlist,
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
          return { success: true, message: 'List created successfully' }
        } else {
          return { success: false, message: 'Any of the addresses are valid' }
        }
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

  private isValidAddress = (adr: string) => {
    try {
      return ethers.utils.isAddress(adr)
    } catch (e) {
      return false
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
    allowlist: AllowlistInterface,
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
          title: allowlist.title,
          description: allowlist.description,
          allowlist: allowlist.allowlist,
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
          allowlist: doc.data().allowlist
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
