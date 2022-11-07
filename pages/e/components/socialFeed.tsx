import TextInput from '../../../components/textInput'

export default function SocialFeed({ isMobile }: { isMobile: boolean }) {
  /**
   * --pass the posts collection reference of the event and fetch it here the docs. There must be a query for the most
   * recent posts to the oldest posts, and it should be the 10 recent posts.
   * Also, create a function that creates a new post doc in the collection that
   * is inside the eid doc. Where the user is at the current event page, each post will be created with
   * the click of 'new post' button.
   */
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
            <SocialFeedPost isMobile={isMobile} />
            <SocialFeedPost isMobile={isMobile} />
            <SocialFeedPost isMobile={isMobile} />
            <SocialFeedPost isMobile={isMobile} />
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
        <div className="w-full ">
          <TextInput
            id={''}
            placeholder="comment..."
            textArea={true}
            labelText={''}
            setValue={(e) => {
              console.log(e)
            }}
          />
        </div>
      </div>
      {/* use the max-height parameter so it can be resized based from the number of comments. */}
      <div id="social-feed-mobile" className="h-[500px] overflow-y-auto">
        <div className="space-y-[25px]">
          <SocialFeedPost isMobile={isMobile} />
          <SocialFeedPost isMobile={isMobile} />
          <SocialFeedPost isMobile={isMobile} />
          <SocialFeedPost isMobile={isMobile} />
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

function SocialFeedPost({ isMobile }: { isMobile: boolean }) {
  return isMobile ? (
    <div className="flex items-center space-x-2 bg-yellow-200 px-[5px]">
      <div className="h-[70px] w-[70px] rounded-full bg-green-100"></div>
      <div>
        <div>username commented:</div>
        <div>comments from the user</div>
      </div>
    </div>
  ) : (
    <div className=" flex  flex-col ">
      <div className="flex items-end space-x-2 ">
        <div className="h-[50px] w-[50px] rounded-full bg-red-200 ">avatar</div>
        <div className="flex flex-col items-start space-y-0">
          <div className="my-0 text-[21px]"></div>
          <p className="my-0 py-0 text-[21px]">
            <a href="" className="font-bold hover:underline">
              username
            </a>{' '}
            commented
          </p>
          <div className="my-0 py-0 text-[15px]"> 3 months ago</div>
        </div>
      </div>
      <div className="ml-[60px]">where is the event held?</div>
    </div>
  )
}
