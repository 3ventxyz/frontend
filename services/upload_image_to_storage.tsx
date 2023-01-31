import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from './firebase_config'

export async function uploadImageToStorage(
  fileImgData: File | File[] | null,
  path: string[],
  onSuccess: (url: string[]) => void
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
    await onHandleMultipleImagesUpload(fileImgData, path, onSuccess)
  } else {
    await onHandleSingleImageUpload(fileImgData, path[0], onSuccess)
  }
}

const onHandleSingleImageUpload = async (
  fileImg: File | null,
  path: string,
  onSuccess: (url: string[]) => void
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
          onSuccess([url])
          return url
        })
      }
    )
  }
  return ''
}
const onHandleMultipleImagesUpload = async (
  fileImgs: File[] | null,
  paths: string[],
  onSuccess: (url: string[]) => void
) => {
  const promises: Promise<string>[] = []
  fileImgs?.forEach(async (fileImg: File, index: number) => {
    const storageRef = ref(storage, `/files/${paths[index]}`)
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
          const downloadURL = getDownloadURL(uploadTask.snapshot.ref)
          promises.push(downloadURL)
        }
      )
    }
  })

  const [eventImgUrl, landingPortraitUrl]: string[] = await Promise.all(
    promises
  ) //this will await for all promises to be finished
  //before entering return.
  onSuccess([eventImgUrl, landingPortraitUrl])
  return ''
}
