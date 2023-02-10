import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FileImageInput } from '../../components/inputs/fileImageInput'

export default {
  title: 'Inputs/FileImageInput',
  component: FileImageInput
} as ComponentMeta<typeof FileImageInput>

const Template: ComponentStory<typeof FileImageInput> = (args) => {
  const [fileImg, setFileImg] = useState<File | null>(null)
  const onChangeFileImg = (name: string, value: File) => {
    setFileImg(value)
  }
  return (
    <FileImageInput {...args} setFileImg={onChangeFileImg} fileImg={fileImg} />
  )
}

export const Primary = Template.bind({})

Primary.args = {
  mode: 'event'
}
