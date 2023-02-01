import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from './firebase_config'

export async function uploadImageToStorage(fileImg: File | null, path: string) {
  if (!fileImg) {
    alert('Please upload an image first!')
    throw 'Please upload an image first!'
  }
  if (storage === null) {
    throw 'firebase storage is not properly initialized.'
  }
  // await onHandleSingleImageUpload(fileImg, path[0])
  return new Promise<string>(async (resolve, reject) => {
    const storageRef = ref(storage, `/files/${path}`)
    const fileBuffer = await fileImg?.arrayBuffer()

    if (fileBuffer) {
      const uploadTask = uploadBytesResumable(storageRef, fileBuffer, {
        contentType: 'image/jpeg'
      })
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
        },
        (err) => {
          console.log(err)
          reject('')
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url: string) => {
            resolve(url)
          })
        }
      )
    }
    return ''
  })
}
