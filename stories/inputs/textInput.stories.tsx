import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextInput } from '../../components/inputs/textInput'

export default {
  title: 'Inputs/TextInput',
  component: TextInput
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  // name: 'variableName',
  labelText: 'Text Input',
  disabled: false,
  textArea: false
}
