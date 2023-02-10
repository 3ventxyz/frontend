import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TicketRegTextInput } from '../../components/inputs/ticketRegTextInput'

export default {
  title: 'Inputs/TicketRegTextInput',
  component: TicketRegTextInput
} as ComponentMeta<typeof TicketRegTextInput>

const Template: ComponentStory<typeof TicketRegTextInput> = (args) => (
  <TicketRegTextInput {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  id: 'attendee-data',
  placeholder: 'Joe Roe',
  inputName: 'firstName',
  htmlFor: 'firstName',
  labelTitle: 'First Name'
}
