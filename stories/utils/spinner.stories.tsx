import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Spinner } from '../../components/utils/spinner'

export default {
  title: 'utils/Spinner',
  component: Spinner
} as ComponentMeta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />

export const Primary = Template.bind({})

Primary.args = {
  width: 50,
  height: 50
}
