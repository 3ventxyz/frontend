import { BsFillExclamationTriangleFill } from 'react-icons/bs'
export default function ErrorFormMsg({
  errorField,
  errorMsg
}: {
  errorField: string
  errorMsg: string
}) {
  return (
    <div className="flex items-end justify-end space-x-2">
      <div className="">
        <BsFillExclamationTriangleFill className="h-[35px] w-[30px]" />
      </div>
      <div>
        <div>Entered info not valid, please check the following field.</div>
        <div className="text-red-500">
          <p>
            <b>{errorField}</b>: {errorMsg}{' '}
          </p>
        </div>
      </div>
    </div>
  )
}
