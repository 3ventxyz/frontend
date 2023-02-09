import { ReactElement, useEffect, useState } from 'react'
import { Button } from '../../../components/buttons/button'
import { TextInput } from '../../../components/inputs/textInput'

export default function CreateTicketTier({
  creatingNewEvent
}: {
  creatingNewEvent: boolean
}) {
  const [numberOfTicketTiers, setNumberOfTicketTiers] = useState(1)
  const [ticketTierList, setTicketTierList] = useState<ReactElement[]>()
  const ticketTierLimit = 3
  useEffect(() => {
    ticketTiers()
  }, [numberOfTicketTiers])
  const ticketTiers = () => {
    var tmpTicketTierList = []
    for (var i = 0; i < numberOfTicketTiers; i++) {
      const newTicketTier = (
        <div key={`tier ${i}`} className="flex flex-row space-x-[10px]">
          <TextInput
            id={''}
            labelText={'ticket tier name'}
            placeholder={textInputPlaceholderList[i].tier_name}
            setValue={(e: any) => {
              console.log('event name: ' + e)
            }}
            isDisabled={creatingNewEvent}
          />
          <TextInput
            id={''}
            labelText={'price'}
            placeholder={textInputPlaceholderList[i].price}
            setValue={(e: any) => {
              console.log('event name: ' + e)
            }}
            isDisabled={creatingNewEvent}
          />
          <TextInput
            id={''}
            labelText={'limit capacity'}
            placeholder={textInputPlaceholderList[i].limit_cap}
            setValue={(e: any) => {
              console.log('event name: ' + e)
            }}
            isDisabled={creatingNewEvent}
          />
        </div>
      )
      tmpTicketTierList.push(newTicketTier)
    }
    setTicketTierList(tmpTicketTierList)
  }
  return (
    <div className="flex flex-col space-y-[10px]">
      {ticketTierList}
      <div className="flex space-x-[10px]">
        <Button
          text={'add new ticket tier'}
          onClick={() => {
            if (numberOfTicketTiers < ticketTierLimit) {
              setNumberOfTicketTiers(numberOfTicketTiers + 1)
            }
          }}
          active={numberOfTicketTiers < ticketTierLimit && !creatingNewEvent}
        />
        <Button
          text={'delete a ticket tier'}
          onClick={() => {
            if (numberOfTicketTiers > 1) {
              setNumberOfTicketTiers(numberOfTicketTiers - 1)
            }
          }}
          active={numberOfTicketTiers > 1 && !creatingNewEvent}
        />
      </div>
    </div>
  )
}

const textInputPlaceholderList = [
  {
    tier_name: 'tier 1',
    price: '$20.00',
    limit_cap: '5000000',
    token_id: '0x000'
  },
  {
    tier_name: 'tier 2',
    price: '$100.00',
    limit_cap: '250000',
    token_id: '0x123'
  },
  {
    tier_name: 'tier 3',
    price: '$500.00',
    limit_cap: '10000',
    token_id: '0x12f'
  },
  {
    tier_name: 'tier 4',
    price: '$2000.00',
    limit_cap: '1000',
    token_id: '0xfff'
  }
]
