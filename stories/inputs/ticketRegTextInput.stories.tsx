import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TicketRegTextInput } from '../../components/inputs/ticketRegTextInput'

const childrenTest = () => {
  return <div className="bg-red-300">hello world</div>
}

export default {
  title: 'Inputs/TicketRegTextInput',
  component: TicketRegTextInput
} as ComponentMeta<typeof TicketRegTextInput>

const Template: ComponentStory<typeof TicketRegTextInput> = (args) => <TicketRegTextInput {...args} />

export const Primary = Template.bind({})

Primary.args = {
  children: childrenTest,
  visible: true,
  width: 'w-[200px]',
  height: 'h-[200px]'
}
