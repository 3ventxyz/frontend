import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from './firebase_config'

export async function uploadQRImage(
  canvas: any | null,
  path: string,
  onSuccess: (url: string) => Promise<void>
) {
  if (!canvas) {
    alert('Please generate a qr code first!')
  }
  var downloadurl = ''
  if(storage !== null) return
  const storageRef = ref(storage, `/files/${path}`)
  canvas.toBlob((blobtmp: any) => {
    const uploadTask = uploadBytesResumable(storageRef, blobtmp)
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
          downloadurl = url
        })
      }
    )
  })
  return downloadurl
}
