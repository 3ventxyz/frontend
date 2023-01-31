import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from './firebase_config'

export async function uploadImageToStorage(
  fileImgData: File | File[] | null,
  path: string,
  onSuccess: (url: string) => void
) {
  var fetchedUrl = ''
  if (!fileImgData) {
    alert('Please upload an image first!')
    throw 'Please upload an image first!'
  }
  if (storage === null) {
    throw 'firebase storage is not properly initialized.'
  }

  if (Array.isArray(fileImgData)) {
    onHandleMultipleImagesUpload(fileImgData, path, onSuccess)
  } else {
    await onHandleSingleImageUpload(fileImgData, path, onSuccess)
  }
}

const onHandleSingleImageUpload = async (
  fileImg: File | null,
  path: string,
  onSuccess: (url: string) => void
) => {
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
const onHandleMultipleImagesUpload = (
  fileImg: File[] | null,
  path: string,
  onSuccess: (url: string) => void
) => {
  // TODO (1/31/2023) define the logic for handling multiple files to be uploaded.
}
