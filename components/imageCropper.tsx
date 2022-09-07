import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Cropper } from 'react-cropper'
export default function ImageCropper({
  fileImg,
  handleOnClose,
  setFileImg
}: {
  fileImg?: any
  handleOnClose: () => void
  setFileImg: (value: string) => void
}) {
  const [cropData, setCropData] = useState('#')
  const [cropper, setCropper] = useState<any>()

  useEffect(() => {
    console.log('imageCropper imgUrl passed:')
    console.log(fileImg)
    console.log('============================')
  }, [])
  // this one can be a modal function
  return (
    <div>
      <div className="h-[400px] w-[400px] bg-red-500" style={{overflow: 'hidden'}}>
        <Cropper
          src={fileImg}
          zoomTo={0.5}
          initialAspectRatio={1}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
          onInitialized={(instance)=>{
            setCropper(instance)
          }}
          style={{ height: 300, width: '80%' }}
        />

      </div>
        <br />
        <div>Crop</div>
    </div>
  )
}
