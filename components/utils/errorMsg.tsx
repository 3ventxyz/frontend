import { BsFillExclamationTriangleFill } from 'react-icons/bs'
export default function ErrorFormMsg({
  errorField,
  errorMsg
}: {
  errorField: string
  errorMsg: string
}) {
  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="">
        <BsFillExclamationTriangleFill className="h-[15px] w-[15px]" />
      </div>
      <div>
        <div className=" text-[12px]">
          <p>
            <b className="text-red-500">{errorField}</b>: {errorMsg}{' '}
          </p>
        </div>
      </div>
    </div>
  )
}
