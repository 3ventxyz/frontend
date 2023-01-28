import { DocumentData, QuerySnapshot } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import TextInput from '../../../components/inputs/textInput'
import FetchSocialFeedPosts from '../../../services/fetch_social_feed_posts'
import { PostInterface } from '../../../shared/interface/common'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../../components/buttons/button'
import uploadComment from '../../../services/upload_comment'
export default function SocialFeed({
  isMobile,
  eid = '',
  uid = '',
  avatar = '',
  username = ''
}: {
  isMobile: boolean
  eid?: string
  uid?: string
  avatar: string
  username: string
}) {
  const [posts, setPosts] = useState<Array<PostInterface>>()
  const [isFetching, setIsFetching] = useState(true)
  const [comment, setComment] = useState<string>('')
  /**
   * --pass the posts collection reference of the event and fetch it here the docs. There must be a query for the most
   * recent posts to the oldest posts, and it should be the 10 recent posts.
   * Also, create a function that creates a new post doc in the collection that
   * is inside the eid doc. Where the user is at the current event page, each post will be created with
   * the click of 'new post' button.
   */

  useEffect(() => {
    const fetchData = async () => {
      const arrayOfPosts: Array<PostInterface> = []
      var postsDocs: QuerySnapshot<DocumentData> = await FetchSocialFeedPosts(
        eid,
        uid
      )

      //IMPORTANT move this to the event context for organizing.
      for (const postDoc of postsDocs.docs) {
        const newPost: PostInterface = {
          avatar: postDoc.data().avatar,
          date_posted: new Date(postDoc.data().date_posted.toDate()),
          post_content: postDoc.data().post_content,
          uid: postDoc.data().uid,
          username: postDoc.data().username
        }
        arrayOfPosts.push(newPost)
      }
      setPosts(arrayOfPosts)
      setIsFetching(false)
    }
    if (isFetching) {
      fetchData()
    }
  }, [])
  return (
    <div id="social-feed-web" className="w-full">
      <h4>Activity</h4>
      <div id="comment-input" className="flex space-x-2 pb-[20px]">
        <div className="mt-[15px] hidden h-[50px] w-[50px] rounded-full bg-red-200 lg:block ">
          <Link href={`/u/${uid}`}>
            <div className="relative h-[50px] w-[50px] rounded-full hover:cursor-pointer ">
              <Image
                src={avatar}
                loading="lazy"
                layout="fill"
                objectFit="cover"
                className="rounded-full bg-gray-200"
              />
            </div>
          </Link>
        </div>
        <div className="flex w-full flex-col space-y-2 ">
          <TextInput
            id={''}
            placeholder="comment..."
            textArea={true}
            labelText={''}
            setValue={setComment}
            maxWidth={600}
            maxWidthForm={600}
          />
          <Button
            text={'comment'}
            active={comment !== '' ? true : false}
            onClick={async () => {
              await uploadComment({
                uid: uid,
                eid: eid,
                username: username,
                content: comment,
                avatar: avatar
              })
              const newPost: PostInterface = {
                avatar: avatar,
                date_posted: new Date(),
                post_content: comment,
                uid: uid,
                username: username
              }
              setComment('')
              let localPosts = posts
              localPosts?.splice(0, 0, newPost)
              setPosts(localPosts)
            }}
          />
        </div>
      </div>
      <br />
      <hr />
      {/* use the max-height parameter so it can be resized based from the number of comments. */}
      <div id="social-feed-mobile" className="h-[500px] overflow-y-auto">
        <div className="space-y-[25px]">
          {posts &&
            posts.map((post, index) => {
              console.log(post.avatar)
              return (
                <SocialFeedPost key={index} isMobile={isMobile} post={post} />
              )
            })}
        </div>
      </div>
      <hr />
    </div>
  )
}

/**
 * --it uses the avatar, username, uid for accessing their profile page,
 *   the content of the post. (currently use only text, later check
 * how to add images and gifs in each post and in the text area)
 */

function SocialFeedPost({
  isMobile,
  post
}: {
  isMobile: boolean
  post: PostInterface
}) {
  const calculateAgeOfPost = (dateTime: Date) => {
    const currentDate = new Date()
    const differenceInTime = currentDate.getTime() - dateTime.getTime()
    var differenceInDays: number = differenceInTime / (1000 * 3600 * 24)
    if (differenceInDays >= 365) {
      if (differenceInDays >= 365 && differenceInDays <= 730) {
        return 'posted a year ago'
      }
      return 'posted ' + (differenceInDays / 30).toFixed(0) + ' years ago'
    }
    if (differenceInDays >= 30) {
      if (differenceInDays >= 30 && differenceInDays <= 60) {
        return 'posted a month ago'
      }
      return 'posted ' + (differenceInDays / 30).toFixed(0) + ' months ago'
    }
    if (differenceInDays < 30 && differenceInDays > 2) {
      return 'posted ' + differenceInDays.toFixed(0) + ' days ago'
    }
    if (differenceInDays < 2 && differenceInDays > 1) {
      return 'posted yesterday'
    }
    return 'posted today'
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
            </Link>{' '}
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
    <div className="flex flex-col">
      <div className="flex items-end space-x-2 ">
        <Link href={`/u/${post.uid}`}>
          <div className="relative h-[50px] w-[50px] rounded-full hover:cursor-pointer ">
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
          <p className="my-0 py-0 text-[21px]">
            <Link href={`/u/${post.uid}`}>
              <span className="font-bold hover:cursor-pointer hover:underline">
                {post.username}
              </span>
            </Link>{' '}
            commented
          </p>
          <div className="my-0 py-0 text-[15px]">
            {/* {String(post.date_posted)} */}
            {/* 3 months ago */}
            {calculateAgeOfPost(post.date_posted)}
          </div>
        </div>
      </div>
      <div className="ml-[60px]">{post.post_content}</div>
    </div>
  )
}
