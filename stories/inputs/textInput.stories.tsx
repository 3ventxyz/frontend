import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextInput } from '../../components/inputs/textInput'

const childrenTest = () => {
  return <div className="bg-red-300">hello world</div>
}

export default {
  title: 'Inputs/TextInput',
  component: TextInput
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  children: childrenTest,
  visible: true,
  width: 'w-[200px]',
  height: 'h-[200px]'
}
