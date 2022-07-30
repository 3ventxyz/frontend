// author: constanza
import FeatureCard from '../../../components/featureCard'

export default function FeatureSection() {
  return (
    <div
      id="details-features"
      className="flex flex-col items-center justify-center py-[80px] px-[20px] text-center"
    >
      <h2 className="w-full max-w-[600px]">We make community easy</h2>
      <p className="p1 mt-[16px] max-w-[330px]">
        Save time, money, and energy with an all-in-one platform.
      </p>
      <div className="mt-[80px] flex flex-wrap items-center justify-center lg:flex-nowrap lg:space-x-12">
        <div>
          <FeatureCard
            title="Platform"
            text="Easily create events, coordinate community, and deliver token utility."
            iconAlt="Layers"
            icon={'/assets/featureIcons/layers.svg'}
            border={true}
          />
          <FeatureCard
            title="Smart Allowlists"
            text="Manage member collections with a CRM tool that filters, searches, and categorizes."
            iconAlt="List check"
            icon={'/assets/featureIcons/list-check.svg'}
            border={true}
          />
          <FeatureCard
            title="NFT Ticket Airdrops"
            text="We airdrop NFT Tickets to prove event attendance."
            iconAlt="NFT Tickets"
            icon={'/assets/featureIcons/poap.svg'}
            border={true}
          />
          <FeatureCard
            title="Easy Payments"
            text="Event attendees may pay with credit card or ETH."
            iconAlt="Credit card"
            icon={'/assets/featureIcons/credit-card.svg'}
            border={true}
          />
        </div>
        <div>
          <FeatureCard
            title="Ticketing"
            text="Tickets can be sold or claimed. Attendees can add a QR code to their mobile wallet or access it from their email or our mobile app."
            iconAlt="Ticket"
            icon={'/assets/featureIcons/ticket.svg'}
            border={true}
          />
          <FeatureCard
            title="Mobile Application"
            text="Administrators scan QR codes to verify attendees while attendees access their tickets, NFT Tickets, and event details on the app."
            iconAlt="Tablet"
            icon={'/assets/featureIcons/tablet.svg'}
            border={true}
          />
          <FeatureCard
            title="Organizations"
            text="Connect a contract address from your owner wallet to verify your organization and begin inviting your community."
            iconAlt="User"
            icon={'/assets/featureIcons/user.svg'}
            border={true}
          />
          <FeatureCard
            title="Communities"
            text="Manage your community members through verification methods: NFTs, token balances, Discord, and Twitter."
            iconAlt="Users"
            icon={'/assets/featureIcons/users-alt.svg'}
            border={true}
          />
        </div>
      </div>
    </div>
  )
}
