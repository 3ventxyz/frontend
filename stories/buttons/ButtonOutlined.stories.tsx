import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ButtonOutlined } from '../../components/buttons/buttonOutlined'

export default {
  title: 'Buttons/ButtonOutlined',
  component: ButtonOutlined
} as ComponentMeta<typeof ButtonOutlined>

const Template: ComponentStory<typeof ButtonOutlined> = (args) => (
  <ButtonOutlined {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  text: 'string',
  onClick: () => {},
  active: true
}
