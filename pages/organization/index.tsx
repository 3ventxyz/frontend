import TextInput from '../../components/textInput'
import LocationInput from '../../components/locationInput'
import { useState } from 'react'

interface LocationData {
  lat: number
  long: number
  address: string
}

export default function Organization() {
  const [location, setLocation] = useState<LocationData>()

  return (
    <div className="flex w-full flex-col items-center space-y-4 px-4 text-center sm:px-0">
      <h3>Create a Collective</h3>
      <TextInput
        labelText="Name"
        id="org_name"
        placeholder="3vent"
        maxWidth={500}
        textArea={false}
      />
      <TextInput
        labelText="Description"
        id="org_desc"
        placeholder="What is your collective about?"
        textArea={true}
      />
      <LocationInput
        labelText="Location"
        id="org_location"
        placeholder="Where is your collective based?"
        setLocation={setLocation}
      />
    </div>
  )
}
