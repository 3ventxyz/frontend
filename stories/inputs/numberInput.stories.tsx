import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NumberInput } from '../../components/inputs/numberInput'

const childrenTest = () => {
  return <div className="bg-red-300">hello world</div>
}

export default {
  title: 'Inputs/NumberInput',
  component: NumberInput
} as ComponentMeta<typeof NumberInput>

const Template: ComponentStory<typeof NumberInput> = (args) => <NumberInput {...args} />

export const Primary = Template.bind({})

Primary.args = {
  children: childrenTest,
  visible: true,
  width: 'w-[200px]',
  height: 'h-[200px]'
}
