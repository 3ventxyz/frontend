import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TicketButton } from '../../components/buttons/ticketButton'

export default {
  title: 'Buttons/TicketButton',
  component: TicketButton
} as ComponentMeta<typeof TicketButton>

const Template: ComponentStory<typeof TicketButton> = (args) => (
  <TicketButton {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  ticket: {
    ticketTitle: 'string',
    registeredUsers: 0,
    capLimit: 0,
    tokenId: '0x123',
    price: 0.0
  },
  selected: false,
  isDisabled: false
}
