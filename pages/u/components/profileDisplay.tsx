import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../../../components/buttons/button'
import { Modal } from '../../../components/utils/modal'
import DisplayQRCode from './displayQRCode'

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
  edit = false,
}: {
  name: string
  bio: string
  address: string
  twitterName: string
  img: string
  edit?: boolean
}) {
  const [showModal, setShowModal] = useState(false)

  const onCloseModal = () => {
    setShowModal(false)
  }
  return (
    <>
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
            <div className="flex flex-row space-x-[10px]">
              <div>
                <Link href="/u/edit">
                  <Button
                    text={'Edit Profile'}
                    onClick={() => {
                      return
                    }}
                    active={true}
                  />
                </Link>
              </div>
              <div>
                <Button
                  text={'Show QR code'}
                  onClick={() => {
                    setShowModal(true)
                  }}
                  active={true}
                />
              </div>
            </div>
          )}
        </div>
    </div>
        <Modal
          visible={showModal}
          onClose={onCloseModal}
          width={'w-[500px]'}
          height={'h-[500px]'}
        >
          <DisplayQRCode />
        </Modal>
    </>
  )
}
