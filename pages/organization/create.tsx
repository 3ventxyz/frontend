import { TextInput } from '../../components/inputs/textInput'
import { LocationInput } from '../../components/inputs/locationInput'
import { useState } from 'react'
import { FileInput } from '../../components/inputs/fileInput'
import { Button } from '../../components/buttons/button'

interface LocationData {
  lat: number
  long: number
  address: string
}

export default function CreateOrganization() {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [location, setLocation] = useState<LocationData>()

  return (
    <div className="flex w-full flex-col items-center space-y-4 px-4 text-center sm:px-0">
      <h3>Create an Organization</h3>
      <TextInput
        labelText="Name"
        id="org_name"
        placeholder="3vent"
        textArea={false}
        setValue={setName}
      />
      <TextInput
        labelText="Description"
        id="org_desc"
        placeholder="What is your collective about?"
        textArea={true}
        setValue={setDesc}
      />
      <LocationInput
        labelText="Location"
        id="org_location"
        placeholder="Where is your collective based?"
        setLocation={setLocation}
      />
      <FileInput />
      <Button text="Submit" onClick={() => {}} active={true} />
    </div>
  )
}
