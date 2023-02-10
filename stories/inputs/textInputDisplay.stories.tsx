import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextInputDisplay } from '../../components/inputs/textInputDisplay'


export default {
  title: 'Inputs/TextInputDisplay',
  component: TextInputDisplay
} as ComponentMeta<typeof TextInputDisplay>

const Template: ComponentStory<typeof TextInputDisplay> = (args) => <TextInputDisplay {...args} />

export const Primary = Template.bind({})

Primary.args = {
  labelText:"text Input Display",
  bodyText:"hi this is a unmodifiable body."
}
