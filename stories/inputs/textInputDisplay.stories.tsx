import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextInputDisplay } from '../../components/inputs/textInputDisplay'

const childrenTest = () => {
  return <div className="bg-red-300">hello world</div>
}

export default {
  title: 'Inputs/TextInputDisplay',
  component: TextInputDisplay
} as ComponentMeta<typeof TextInputDisplay>

const Template: ComponentStory<typeof TextInputDisplay> = (args) => <TextInputDisplay {...args} />

export const Primary = Template.bind({})

Primary.args = {
  children: childrenTest,
  visible: true,
  width: 'w-[200px]',
  height: 'h-[200px]'
}
