import { PostInterface } from '../../../shared/interface/common'
import Image from 'next/image'
import Link from 'next/link'
import {
  startOfToday,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInYears
} from 'date-fns'

export default function SocialFeedPost({
  isMobile,
  post
}: {
  isMobile: boolean
  post: PostInterface
}) {
  const calculateAgeOfPost = (dateTime: Date) => {
    const differenceDays = differenceInCalendarDays(startOfToday(), dateTime)
    const differenceMonths = differenceInCalendarMonths(
      startOfToday(),
      dateTime
    )
    const differenceYears = differenceInYears(startOfToday(), dateTime)
    if (differenceYears >= 1) {
      if (differenceYears > 1) {
        return `${differenceYears}` + ' years ago'
      }
      return 'a year ago'
    } else if (differenceMonths >= 1) {
      if (differenceMonths > 1) {
        return `${differenceMonths}` + ' months ago'
      }
      return 'a month ago'
    }
    if (differenceDays >= 30) {
      if (differenceDays <= 30 && differenceDays >= 2) {
        return `${differenceDays}` + ' days ago'
      }
      if (differenceDays == 1) {
        return 'yesterday'
      }
    }
    return 'today'
  }

  return isMobile ? (
    <div className="flex flex-col items-start space-x-2  px-[3px]">
      <div className="flex space-x-2">
        <Link href={`/u/${post.uid}`}>
          <div className="relative h-[25px] w-[25px] rounded-full hover:cursor-pointer ">
            <Image
              src={post.avatar ?? ''}
              loading="lazy"
              layout="fill"
              objectFit="cover"
              className="rounded-full bg-gray-200"
            />
          </div>
        </Link>
        <div className="flex flex-col items-start space-y-0">
          <div className="my-0 text-[21px]"></div>
          <p className="my-0 py-0 text-[15px]">
            <Link href={`/u/${post.uid}`}>
              <span className="font-bold hover:cursor-pointer hover:underline">
                {post.username}
              </span>
            </Link>
            commented
          </p>
          <div className="my-0 py-0 text-[12px]">
            {calculateAgeOfPost(post.date_posted)}
          </div>
        </div>
      </div>
      <div className="">{post.post_content}</div>
    </div>
  ) : (
    <div className="border-1 mr-[5px] flex flex-col rounded-2xl bg-white py-[8px] px-[8px] shadow-sm">
      <div className="flex items-start space-x-2 ">
        <div className="relative h-[45px] w-[45px] rounded-full hover:cursor-pointer ">
          <Link href={`/u/${post.uid}`}>
            <Image
              src={post.avatar ?? ''}
              loading="lazy"
              layout="fill"
              objectFit="cover"
              className="rounded-full bg-gray-200"
            />
          </Link>
        </div>
        <div className="flex w-fit flex-col items-start space-y-0">
          <div className="my-0 text-[21px]"></div>
          <p className="my-0 py-0 text-[15px]">
            <Link href={`/u/${post.uid}`}>
              <span className="font-bold hover:cursor-pointer hover:underline">
                {post.username}
              </span>
            </Link>{' '}
            commented
          </p>
          <div className="my-0 py-0 text-[15px]">
            {calculateAgeOfPost(post.date_posted)}
          </div>
          <div className="">{post.post_content}</div>
        </div>
      </div>
    </div>
  )
}
