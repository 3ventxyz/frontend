import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LocationInput } from '../../components/inputs/locationInput'

const childrenTest = () => {
  return <div className="bg-red-300">hello world</div>
}

export default {
  title: 'Inputs/LocationInput',
  component: LocationInput
} as ComponentMeta<typeof LocationInput>

const Template: ComponentStory<typeof LocationInput> = (args) => <LocationInput {...args} />

export const Primary = Template.bind({})

Primary.args = {
  children: childrenTest,
  visible: true,
  width: 'w-[200px]',
  height: 'h-[200px]'
}
