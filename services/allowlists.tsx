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
  auth = useAuth()

  constructor() {
    this.listsCollectionRef = collection(db, 'lists')
  }

  create = async (addresses: string, title: string, description: string) => {
    try {
      // Gets the input string with all address and removes extra spaces,
      // apostrophes, repeated and invalid addresses
      const allowlist = addresses
        .split(',')
        .map((e, i) => {
          return e.trim().replaceAll("'", '')
        })
        .filter((val, id, array) => {
          return array.indexOf(val) === id && this.isValidAddress(val)
        })

      if (allowlist && allowlist.length > 0) {
        await addDoc(this.listsCollectionRef, {
          title: title,
          description: description,
          allowlist: allowlist,
          uid: doc(db, 'users', this.auth.uid)
        })
        return { success: true, message: 'List created successfully' }
      } else {
        return { success: false, message: 'Any of the addresses are valid' }
      }
    } catch (error) {
      console.log(error)
      return { success: false, message: 'Could not create the allowlist' }
    }
  }

  private isValidAddress = (adr: string) => {
    try {
      return ethers.utils.isAddress(adr)
    } catch (e) {
      return false
    }
  }

  delete = async (id: string | undefined) => {
    try {
      if (id) {
        await deleteDoc(doc(db, 'lists', id))
        return { success: true, message: 'Allowlist deleted successfully' }
      }
      return { success: false, message: 'Undefined list id' }
    } catch (e) {
      console.log(e)
      return { success: false, message: 'Error on deleting Allowlist' }
    }
  }

  update = async (id: string, allowlist: AllowlistInterface) => {
    try {
      if (id) {
        await updateDoc(doc(db, 'lists', id), {
          title: allowlist.title,
          description: allowlist.description,
          allowlist: allowlist.allowlist,
          uid: doc(db, 'users', this.auth.uid)
        })
        return { success: true, message: 'Allowlist updated successfully' }
      }
      return { success: false, message: 'Undefined list id' }
    } catch (e) {
      console.log(e)
      return { success: false, message: 'Error on updating Allowlist' }
    }
  }

  getUserAllowlists = async () => {
    var allowlists = []
    try {
      const data = await getDocs(this.listsCollectionRef)
      allowlists = data.docs
        .map((doc) => ({
          uid: doc.data().uid.id,
          title: doc.data().title,
          description: doc.data().description,
          allowlist_id: doc.id,
          allowlist: doc.data().allowlist,
          merkle_root: doc.data().merkle_root
        }))
        .filter((doc) => doc.uid === this.auth.uid)
      return allowlists
    } catch (e) {
      console.log(e)
      return []
    }
  }

  getAllowlist = async (id: string | undefined) => {
    try {
      const allowlistDoc = await getDoc(doc(db, 'lists', id?.toString() ?? ''))
      if (!allowlistDoc.data()) {
        return { success: false, message: 'Allowlist not found' }
      }
      return { success: true, data: allowlistDoc.data() }
    } catch (error) {
      console.log(error)
      return { success: true, message: 'Error loading allowlist data' }
    }
  }
}
