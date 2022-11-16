import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from './firebase_config'

export async function uploadImage(
  fileImg: File | null,
  path: string,
  onSuccess: (url: string) => Promise<void>
) {
  if (!fileImg) {
    alert('Please upload an image first!')
    return
  }
  if(storage !== null) return
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
          onSuccess(url)
          return url
        })
      }
    )
  }
  return ''
}
