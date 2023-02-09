import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FileImageInput } from '../../components/inputs/fileImageInput'

const childrenTest = () => {
  return <div className="bg-red-300">hello world</div>
}

export default {
  title: 'Inputs/FileImageInput',
  component: FileImageInput
} as ComponentMeta<typeof FileImageInput>

const Template: ComponentStory<typeof FileImageInput> = (args) => <FileImageInput {...args} />

export const Primary = Template.bind({})

Primary.args = {
  children: childrenTest,
  visible: true,
  width: 'w-[200px]',
  height: 'h-[200px]'
}
