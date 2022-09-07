import { useEffect } from "react"

export default function ImageCropper({
  fileImg,
  handleOnClose,
  setFileImg
}: {
  fileImg?: any
  handleOnClose: () => void,
  setFileImg: (value:File)=> void
}) {

	useEffect(()=>{
		console.log(fileImg)
	},[])
  // this one can be a modal function
  return <>Hi, this is an image cropper</>
}
