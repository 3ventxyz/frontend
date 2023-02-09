import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FileInput } from '../../components/inputs/fileInput'

const childrenTest = () => {
  return <div className="bg-red-300">hello world</div>
}

export default {
  title: 'Inputs/FileInput',
  component: FileInput
} as ComponentMeta<typeof FileInput>

const Template: ComponentStory<typeof FileInput> = (args) => <FileInput  />

export const Primary = Template.bind({})

Primary.args = {
  children: childrenTest,
  visible: true,
  width: 'w-[200px]',
  height: 'h-[200px]'
}
