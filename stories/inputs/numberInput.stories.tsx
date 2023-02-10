import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NumberInput } from '../../components/inputs/numberInput'



export default {
  title: 'Inputs/NumberInput',
  component: NumberInput
} as ComponentMeta<typeof NumberInput>

const Template: ComponentStory<typeof NumberInput> = (args) => (
  <NumberInput {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  labelText: 'Number Input',
  disabled: false
}
