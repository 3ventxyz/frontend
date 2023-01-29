import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from './firebase_config'

export async function uploadImageToStorage(
  fileImg: File | null,
  path: string,
  onSuccess: (url: string) => void
) {
  var fetchedUrl = ''
  if (!fileImg) {
    alert('Please upload an image first!')
    throw 'Please upload an image first!'
  }
  if (storage === null) {
    throw 'firebase storage is not properly initialized.'
  }
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
        return ''
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          await onSuccess(url)
          // fetchedUrl = String(url)
          return url
        })
      }
    )
  }
  return ''
}
