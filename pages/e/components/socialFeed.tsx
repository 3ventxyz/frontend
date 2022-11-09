import { DocumentData, QuerySnapshot } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import TextInput from '../../../components/textInput'
import FetchSocialFeedPosts from '../../../services/fetch_social_feed_posts'
import { PostInterface } from '../../../shared/interface/common'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../../../components/button'
import uploadComment from '../../../services/upload_comment'
export default function SocialFeed({
  isMobile,
  eid = '',
  uid = '',
  avatar = ''
}: {
  isMobile: boolean
  eid?: string
  uid?: string
  avatar?: string
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
          date_posted: postDoc.data().date_posted,
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
  return isMobile ? (
    <div id="social-feed-mobile" className="w-full ">
      <h4>Activity</h4>
      <div className="flex">
        <div className="h-[50px] w-[50px] rounded-full bg-red-200 ">avatar</div>
        <TextInput
          id={''}
          labelText={''}
          setValue={function (value: string): void {
            throw new Error('Function not implemented.')
          }}
        />
      </div>

      <div className="h-fit overflow-y-scroll">
        {/* use the max-height parameter so it can be resized based from the number of comments. */}
        <div className="h-[200px] overflow-y-scroll">
          <div className="space-y-2">
            {posts &&
              posts.map((post, index) => {
                return <SocialFeedPost key={index} isMobile={isMobile} post={post} />
              })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div id="social-feed-web" className="w-full">
      <h4>Activity</h4>
      <div id="comment-input" className="flex space-x-2 pb-[20px]">
        <div className="mt-[15px] h-[50px] w-[50px] rounded-full bg-red-200 ">
          avatar
        </div>
        <div className="flex w-full flex-col space-y-2">
          <TextInput
            id={''}
            placeholder="comment..."
            textArea={true}
            labelText={''}
            setValue={setComment}
          />
          <Button
            text={'comment'}
            active={comment !== '' ? true : false}
            onClick={async () => {
              await uploadComment({
                uid: uid,
                eid: eid,
                username: 'faker',
                content: comment,
                avatar: avatar
              })
              setComment('')
              const newPost: PostInterface = {
                avatar: avatar,
                date_posted: new Date(),
                post_content: comment,
                uid: uid,
                username: 'faker'
              }
              let localPosts = posts
              localPosts?.splice(0, 0, newPost)
              setPosts(localPosts)

              /**append  */
            }}
          />
        </div>
      </div>
      <br />
      {/* use the max-height parameter so it can be resized based from the number of comments. */}
      <div id="social-feed-mobile" className="h-[500px] overflow-y-auto">
        <div className="space-y-[25px]">
          {posts &&
            posts.map((post, index) => {
              console.log(post.avatar)
              return <SocialFeedPost key={index} isMobile={isMobile} post={post} />
            })}
        </div>
      </div>
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
  return isMobile ? (
    <div className="flex items-center space-x-2 bg-yellow-200 px-[5px]">
      <div className="relative h-[70px] w-[70px] rounded-full bg-green-100"></div>
      <div>
        <div>{post.username} commented:</div>
        <div>{post.post_content}</div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col">
      <div className="flex items-end space-x-2">
        <Link href={`/u/${post.uid}`}>
          <div className="relative h-[50px] w-[50px] rounded-full ">
            <Image
              src={post.avatar ?? ''}
              loading="lazy"
              layout="fill"
              objectFit="cover"
              className="rounded-full bg-gray-200"
            />
          </div>
        </Link>
        {/* </button> */}
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
          <div className="my-0 py-0 text-[15px]">3 months ago</div>
        </div>
      </div>
      <div className="ml-[60px]">{post.post_content}</div>
    </div>
  )
}
