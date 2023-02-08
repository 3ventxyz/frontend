import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from '../../components/buttons/button'

export default {
  title: 'Buttons/Button',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})

Primary.args = {
  text: 'text',
  active: true,
  activeStyling: false,
  onClick: () => {
    console.log('test this')
  }
}
