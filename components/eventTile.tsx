// author: marthel
import Link from 'next/link'
import { TbPhotoOff, TbPhoto } from 'react-icons/tb'
import { EventInterface } from '../shared/interface/common'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '../services/firebase_config'


/**EventTile
 * TODO add description
 * move this to events directory.
 */
export default function EventTile({
  eventData
}: {
  eventData: EventInterface | null
}) {
  const [profileUrlImg, setProfileUrlImg] = useState('')
  const [hostName, setHostName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', eventData?.uid || '')
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setProfileUrlImg(`${docSnap.data().avatar}`)
        setHostName(docSnap.data().username)
      }
    }
    if (eventData?.uid) {
      fetchData()
    }
  }, [eventData])

  useEffect
  return !eventData ? (
    <div className=" mx-auto h-[460px] w-full max-w-[320px] animate-pulse cursor-pointer rounded-3xl bg-white sm:h-[524px] sm:w-[380px] sm:max-w-[380px]">
      <div className="relative h-[384px] max-h-[320px] w-full max-w-[380px] rounded-3xl bg-gray-300 sm:max-h-full">
        <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
          <TbPhoto className="h-[150px] w-[150px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-[7px] p-[20px]  ">
        <div className="mt-[5px] mb-[5px] h-[25px] w-auto rounded-md bg-gray-300"></div>
        <div className="h-[13px] w-full rounded-md bg-gray-300"></div>
        <div className="h-[13px] w-full rounded-md bg-gray-300"></div>
        <div className="h-[13px] w-full rounded-md bg-gray-300"></div>
      </div>
    </div>
  ) : (
    <Link href={`/e/${eventData.event_id}`}>
      <div className=" mx-auto h-[460px] w-full max-w-[320px] cursor-pointer rounded-3xl bg-white transition-all hover:scale-105 sm:h-[524px] sm:w-[380px] sm:max-w-[380px]">
        <div className="relative h-[384px] max-h-[320px] w-full max-w-[380px] rounded-3xl bg-gray-200 shadow-md sm:max-h-full">
          {eventData.img_url === '' ? (
            <div className="flex h-full w-full flex-col items-center justify-center text-gray-500">
              <TbPhotoOff className="h-[150px] w-[150px] " />
              <p>No image available</p>
            </div>
          ) : (
            <Image
              src={eventData.img_url}
              layout="fill"
              loading="lazy"
              objectFit="cover"
              className="rounded-3xl"
            />
          )}
          <Link href={`/u/${eventData.uid}`}>
            <div className="absolute bottom-4 right-4 flex h-fit w-fit cursor-pointer flex-row items-center space-x-2 rounded-[14px] bg-white px-2 py-2">
              {profileUrlImg ? (
                <Image
                  src={profileUrlImg}
                  layout="fixed"
                  width="35px"
                  height="35px"
                  loading="lazy"
                  className="rounded-full bg-gray-200"
                />
              ) : (
                <div className="h-[35px] w-[35px] rounded-full bg-gray-200" />
              )}
              <p className="">{hostName}</p>
            </div>
          </Link>
        </div>
        <ul className="p-[20px]">
          <li className="... truncate text-[24px] font-bold">
            {eventData.title}
          </li>
          <li className="... truncate text-[14px]">{eventData.description}</li>
          <li className="... truncate text-[14px]">
            {/* {eventData?.start_date?.toLocaleDateString()} */}
            {eventData?.start_date?.toDateString()}
          </li>
          <li className="... truncate text-[14px]">
            {eventData.location?.address}
          </li>
        </ul>
      </div>
    </Link>
  )
}
