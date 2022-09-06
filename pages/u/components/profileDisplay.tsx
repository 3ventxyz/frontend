import Image from 'next/image'
import Link from 'next/link'
import Button from '../../../components/button'

function TextDisplay({ label, value }: { label: string; value: string }) {
  return (
    <>
      <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
        {label}
      </p>
      <p className="p-1 text-secondary">{value}</p>
    </>
  )
}

export default function ProfileDisplay({
  name,
  bio,
  address,
  twitterName,
  img,
  edit = false
}: {
  name: string
  bio: string
  address: string
  twitterName: string
  img: string
  edit?: boolean
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8 xl:justify-start">
      <div className="relative h-[384px] max-h-[320px] w-full max-w-[380px] rounded-3xl bg-gray-200 sm:max-h-full">
        <Image
          src={img}
          layout="fill"
          loading="lazy"
          objectFit="cover"
          className="rounded-3xl"
        />
      </div>
      <div className="flex w-full max-w-[380px] flex-col items-stretch justify-start text-left">
        <TextDisplay label="Username" value={name} />
        <TextDisplay label="Bio" value={bio} />
        <TextDisplay label="Location" value={address || 'NA'} />
        {twitterName && (
          <>
            <p className="mb-2 border-b border-primary pt-2 text-left text-[16px] font-semibold">
              Twitter
            </p>
            <a
              className="p-1 text-linkText"
              href={`https://twitter.com/${twitterName}`}
              rel="noreferrer"
              target="_blank"
            >
              Twitter
            </a>
          </>
        )}
        <div className="h-4" />
        {edit && (
          <Link href="/u/edit">
            <Button
              text={'Edit Profile'}
              onClick={() => {
                return
              }}
              active={true}
            />
          </Link>
        )}
      </div>
    </div>
  )
}