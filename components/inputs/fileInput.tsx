import { storage } from '../../services/firebase_config'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { useState } from 'react'

export function FileInput() {
  const [file, setFile] = useState<File>()

  function handleChange(event: any) {
    setFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      alert('Please upload an image first!')
    }
    if (storage !== null) return
    const storageRef = ref(storage, `/files/${file?.name}`)

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    // const uploadTask = uploadString(storageRef, file)
    const fileBuffer = await file?.arrayBuffer()
    if (fileBuffer) {
      const uploadTask = uploadBytesResumable(storageRef, fileBuffer)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url)
          })
        }
      )
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 py-4 text-[16px] font-normal">
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}
