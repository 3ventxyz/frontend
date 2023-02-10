import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LocationInput } from '../../components/inputs/locationInput'

export default {
  title: 'Inputs/LocationInput',
  component: LocationInput
} as ComponentMeta<typeof LocationInput>

const Template: ComponentStory<typeof LocationInput> = (args) => {
  const [location, setLocation] = useState<any>(null)

  return <LocationInput {...args} setLocation={setLocation} />
}

export const Primary = Template.bind({})

Primary.args = {
  labelText: 'location title',
  id: 'event-location',
  placeholder: '123 street'
}
