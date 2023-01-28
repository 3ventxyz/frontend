import Link from 'next/link'
import { Router } from 'next/router'
import { useEffect } from 'react'
// import ReactTooltip from 'react-tooltip'
import { Button } from '../components/buttons/button'
import FeatureCard from '../components/featureCard'
import PricingCard from '../components/pricingCard'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/auth'

export default function Landing() {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.isLoggedIn()) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <div className="flex flex-grow flex-col">
      <HeroSection />
      <FeatureSection />
      <PricingSection />
      <FAQ />
    </div>
  )
}

// author: marthel
function HeroSection() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center px-[20px] py-[80px] text-center">
      <h1 className="w-full md:max-w-[600px]">Your web3 events solution</h1>
      <p className="p1 mt-[16px] w-full sm:max-w-[450px]">
        Supercharge your token-gated community with events, smart allowlists,
        and ticketing.
      </p>
      <div className="mt-[48px] flex flex-row items-center space-x-[36px]">
        <Button
          active={true}
          text={'Launch App'}
          onClick={() => {
            router.push('/login')
          }}
        />
        <a
          href="#features"
          className="font-semibold text-primary hover:underline"
        >
          Features
        </a>
      </div>
    </div>
  )
}

// author: constanza
function FeatureSection() {
  return (
    <div
      id="features"
      className="flex flex-col items-center bg-secondaryBg px-[20px] py-[80px] text-center"
    >
      <h3 className="w-full max-w-[480px]">
        The coordination platform you&apos;ve been looking for
      </h3>
      <p className="p1 mt-[16px] w-full max-w-[330px]">
        From mint to satellite event, we handle the hard work for you.
      </p>
      <div className="my-[80px] flex flex-col items-center justify-center space-y-[50px] lg:flex-row lg:space-y-0 lg:space-x-[50px]">
        <div className="max-w-[580px]">
          <img src={'assets/party-image.svg'} className="w-full rounded-lg" />
        </div>
        <div className="flex flex-col">
          <FeatureCard
            title="Events and Ticketing"
            text="Create an event, sell or distribute tickets, and unite your token-gated community."
            iconAlt="Ticket"
            icon={'assets/featureIcons/ticket.svg'}
            border={true}
          />
          <FeatureCard
            title="Smart Allowlists"
            text="Manage community with addresses, Twitter, Discord, and token balances for mint and events."
            iconAlt="List check"
            icon={'assets/featureIcons/list-check.svg'}
            border={true}
          />
          <FeatureCard
            title="NFT Ticket Airdrops"
            text="We airdrop NFT Tickets to prove event attendance."
            iconAlt="NFT Tickets"
            icon={'assets/featureIcons/poap.svg'}
            border={true}
          />
          <FeatureCard
            title="Easy Payments"
            text="Pay with credit card or ETH."
            iconAlt="Credit card"
            icon={'assets/featureIcons/credit-card.svg'}
            border={false}
          />
        </div>
      </div>
      <Link href="details#details-features" className="">
        <Button
          active={true}
          text={'See Details'}
          onClick={() => {
            return
          }}
        />
      </Link>
    </div>
  )
}

// author: aline
function PricingSection() {
  return (
    <div className="flex flex-col items-center py-[80px] px-[20px] sm:px-[56px] md:px-[112px]">
      <h3 className="mb-4">Pricing</h3>
      <p className="p1 max-w-[380px] text-center">
        Mint a membership pass to gain access to our feature rich platform.
      </p>
      <div className="my-[80px] flex w-full max-w-[1216px] flex-col items-center gap-y-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {pricingInfos.map((e, i) => (
          <PricingCard
            key={i}
            title={e.title}
            description={e.description}
            price={e.price}
            icon={e.icon}
            iconAlt={e.iconAlt}
            bgColor="bg-secondaryBg"
          />
        ))}
      </div>
      <Link href="details#details-pricing" className="">
        <Button
          active={true}
          text={'See Details'}
          onClick={() => {
            return
          }}
        />
      </Link>
    </div>
  )
}

const pricingInfos = [
  {
    title: 'Base',
    description: [
      '1 organization',
      '1 collaborator',
      '1 smart allowlist',
      '3 events',
      '1000 total tickets',
      'easy payments'
    ],
    price: '0.25 ETH',
    icon: 'assets/pricing/checkBoxBase.svg',
    iconAlt: 'checkBoxBase',
    // buttonText: 'Mint Base',
    buttonText: 'Coming Soon',
    onClickButton: () => null
  },
  {
    title: 'Pro',
    description: [
      'unlimited organizations',
      '5 collaborators',
      '3 smart allowlists',
      '10 events',
      '5000 total tickets + airdrops',
      'easy payments'
    ],
    price: '1 ETH',
    icon: 'assets/pricing/checkBoxPro.svg',
    iconAlt: 'checkBoxPro',
    // buttonText: 'Mint Pro',
    buttonText: 'Coming Soon',
    onClickButton: () => null
  },
  {
    title: 'Enterprise',
    description: [
      'unlimited organizations',
      'unlimited collaborators',
      'unlimited allowlists',
      'unlimited events',
      'unlimited tickets + airdrops',
      'easy payments'
    ],
    price: '5 ETH',
    icon: 'assets/pricing/checkBoxEnterprise.svg',
    iconAlt: 'checkBoxEnterprize',
    // buttonText: 'Mint Enterprise',
    buttonText: 'Coming Soon',
    onClickButton: () => null
  }
]

// author: ben
function FAQ() {
  // closes all other faq items when a new one is opened
  // useEffect(() => {
  //   const details = document.querySelectorAll('details')
  //   details.forEach((targetDetail) => {
  //     targetDetail.addEventListener('click', () => {
  //       details.forEach((detail) => {
  //         if (detail !== targetDetail) {
  //           detail.removeAttribute('open')
  //         }
  //       })
  //     })
  //   })
  // }, [])

  return (
    <div className="flex flex-col items-center bg-secondaryBg py-[80px] text-center">
      <h3>Questions?</h3>
      <p className="p1 mt-[20px]">
        Read through our FAQ or talk
        <br />
        to our team at{' '}
        <div
          // data-tip="click to copy"
          onClick={() => {
            navigator.clipboard.writeText('contact@3vent.xyz')
          }}
          className="cursor-pointer text-linkText"
        >
          contact@3vent.xyz
        </div>
        {/* <ReactTooltip clickable /> */}
      </p>
      <div className="mt-[80px] w-full px-[10px] md:w-[800px]">
        {faqItems.map((element, index) => {
          return faqItem(
            element.question,
            element.answer,
            index,
            index === 0,
            index === faqItems.length - 1
          )
        })}
      </div>
    </div>
  )
}

const accordionStyle = 'border border-[#E5E7EB] py-[18px] px-[20px] text-left'

const faqItem = (
  question: string,
  answer: any,
  index: number,
  first: boolean,
  last: boolean
) => {
  return (
    <details key={index} className="w-full cursor-pointer">
      <summary
        className={`${first && 'rounded-t-[6px]'}
          ${accordionStyle} flex flex-row items-center justify-between bg-white text-[18px] font-semibold leading-[27px] text-secondary`}
      >
        {question}
        {faqButton}
      </summary>
      <div
        className={`${
          last && 'rounded-b-[6px]'
        } ${accordionStyle} bg-white text-[16px] leading-[24px] text-secondary`}
      >
        {answer}
      </div>
    </details>
  )
}

const faqButton = (
  <button className="ml-auto">
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10.9624L12 15.9624L17 10.9624"
        stroke="#6D7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
)

const faqItems = [
  {
    question: 'When does 3vent launch?',
    answer: (
      <p>
        Closed beta testing goes live in August.{' '}
        <a
          href="https://forms.gle/LzvnhgUnw8TabykB8"
          className="text-linkText"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign up
        </a>{' '}
        for our closed beta to have early access or follow us on{' '}
        <a
          className="text-linkText"
          href="https://twitter.com/intent/follow?screen_name=3ventxyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter.
        </a>
      </p>
    )
  },
  {
    question: 'How long does our membership last?',
    answer: 'Membership passes expire one year after the time of purchase.'
  },
  {
    question: 'How can I stay updated?',
    answer: (
      <p>
        Follow us on{' '}
        <a
          className="text-linkText"
          href="https://twitter.com/intent/follow?screen_name=3ventxyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        .
      </p>
    )
  },
  {
    question: 'What chain are you using?',
    answer:
      'We use Ethereum for payments and Polygon for airdrops. An Ethereum wallet is all you need to get started.'
  },
  {
    question: 'How are smart contracts used in 3vent?',
    answer:
      'We launch an ERC-1155 upon organization creation and issue a new token in the contract for each event’s ticket type.'
  },
  {
    question: 'How do events work?',
    answer:
      'You may create events as allowed in your subscription tier. You may create up to three ticket tiers per event with a specified price and allowlist verification. Multiple ticket tiers, event attendee verification, and allowlist verification are optional.'
  },
  {
    question: 'How do tickets work?',
    answer:
      'Tickets are purchased with ether or credit card (Stripe). A QR code is emailed to the attendee and updated in their mobile application. Attendees can add the ticket to their mobile wallet as a digital pass. Organizers upload an image as their NFT for each event/ticket.'
  },
  {
    question: 'How do allowlists work?',
    answer:
      'Organizers may create allowlists in order to manage access to events and mints. We offer Twitter, Discord, and NFT/token balance verification and a CRM tool for community management.'
  },
  {
    question: 'How do I check people in?',
    answer:
      'Organizers can use our mobile application to verify attendees. Attendees use our application to enter events, access their ticket airdrops, and see event details. Event verification is optional.'
  }
]
