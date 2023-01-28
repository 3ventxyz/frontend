// author: marthel
import { TicketButton } from '../../../components/buttons/ticketButton'
import { TicketInterface } from '../../../shared/interface/common'
import Image from 'next/image'

export default function PurchasedTicketConfirmation({
  selectedTicket,
  QRImgUrl
}: {
  selectedTicket: TicketInterface | null
  QRImgUrl: string
}) {
  return (
    <div className="flex flex-col space-y-[26px]">
      <TicketButton
        selected={true}
        ticket={selectedTicket}
        isDisabled={false}
      />
      <div className="space-y-[13px]">
        <div className="text-[14px] font-bold">
          add your ticket to your apple wallet
        </div>
      </div>
      <div className="space-y-[13px]">
        <div className="text-[14px] font-bold">
          Present this QR code to enter your event
        </div>
        <div className="relative h-[242px] w-[242px]">
          <Image src={QRImgUrl} layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  )
}