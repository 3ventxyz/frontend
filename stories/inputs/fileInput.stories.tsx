import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FileInput } from '../../components/inputs/fileInput'

export default {
  title: 'Inputs/FileInput',
  component: FileInput
} as ComponentMeta<typeof FileInput>

const Template: ComponentStory<typeof FileInput> = (args) => <FileInput />

export const Primary = Template.bind({})

Primary.args = {}
