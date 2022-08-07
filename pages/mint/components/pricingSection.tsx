import PricingCard from '../../../components/pricingCard'

// author: aline
export default function PricingSection() {
  return (
    <div
      id="details-pricing"
      className="flex flex-col items-center bg-secondaryBg py-[80px] px-[20px] sm:px-[56px] md:px-[112px]"
    >
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
            bgColor="bg-primaryBg"
            buttonText={e.buttonText}
            onClickButton={e.onClickButton}
          />
        ))}
      </div>
      <h4 className="text-center">Can&apos;t afford membership?</h4>
      <p className="p2 my-4 max-w-[332px] text-center">
        3vent cherishes inclusive and diverse communities. Pricing should never
        cut out impact.
      </p>
      <p className="p2 mb-4 max-w-[332px] text-center">
        Send a tweet and show how your org positively contributes to the future
        of web3. Tag @3ventxyz and #3ventapplication.
      </p>
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
