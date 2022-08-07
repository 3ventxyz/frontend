import PricingCard from '../../components/pricingCard'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import { abi } from '../../public/abi/abi'

export default function Mint() {
  // set up callback function to actually mint the nft
  const { config: configTier1, error } = usePrepareContractWrite({
    addressOrName: '0xd1De1a424B821b58023CB134900C053e3d5C567b',
    contractInterface: abi,
    functionName: 'mintTier1',
    overrides: {
      value: ethers.utils.parseEther('0.003')
    }
  })
  const { write: mintTier1 } = useContractWrite(configTier1)

  // set up callback function to actually mint the nft
  const { config: configTier2 } = usePrepareContractWrite({
    addressOrName: '0xd1De1a424B821b58023CB134900C053e3d5C567b',
    contractInterface: abi,
    functionName: 'mintTier2',
    overrides: {
      value: ethers.utils.parseEther('0.01')
    }
  })
  const { write: mintTier2 } = useContractWrite(configTier2)

  // set up callback function to actually mint the nft
  const { config: configTier3 } = usePrepareContractWrite({
    addressOrName: '0xd1De1a424B821b58023CB134900C053e3d5C567b',
    contractInterface: abi,
    functionName: 'mintTier3',
    overrides: {
      value: ethers.utils.parseEther('0.05')
    }
  })
  const { write: mintTier3 } = useContractWrite(configTier3)

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
      buttonText: 'Mint Base',
      onClickButton: () => {
        if (mintTier1) mintTier1()
      }
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
      buttonText: 'Mint Pro',
      onClickButton: () => {
        if (mintTier2) mintTier2()
      }
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
      buttonText: 'Mint Enterprise',
      onClickButton: () => {
        if (mintTier3) mintTier3()
      }
    }
  ]

  return (
    <div className="flex flex-grow flex-col">
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
          3vent cherishes inclusive and diverse communities. Pricing should
          never cut out impact.
        </p>
        <p className="p2 mb-4 max-w-[332px] text-center">
          Send a tweet and show how your org positively contributes to the
          future of web3. Tag @3ventxyz and #3ventapplication.
        </p>
      </div>
    </div>
  )
}
