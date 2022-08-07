import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { useState } from 'react'

interface LocationData {
  lat: number
  long: number
  address: string
}

interface LocationInputProps {
  labelText: string
  id: string
  placeholder: string
  setLocation: (location: LocationData) => void
}

export default function LocationInput({
  labelText,
  id,
  placeholder,
  setLocation
}: LocationInputProps) {
  const [searchText, setSearchText] = useState('')
  const [address, setAddress] = useState('')

  const handleChange = (search: string) => {
    setSearchText(search)
    console.log('setSearchText', search)
  }

  const handleSelect = (address: string) => {
    console.log('handleSelect', address)
    geocodeByAddress(address)
      .then((results) => {
        setAddress(results[0].formatted_address)
        return getLatLng(results[0])
      })
      .then((latLng) => {
        return console.log('Success', latLng)
      })
      .catch((error) => console.error('Error', error))
  }

  return (
    <PlacesAutocomplete
      value={searchText}
      onChange={handleChange}
      onSelect={() => handleSelect('a')}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <label htmlFor={id}>{labelText}</label>
          <input
            {...getInputProps({
              placeholder: placeholder,
              id: id,
              className:
                'leading-0 h-[56px] w-full max-w-[400px] rounded-[16px] border-[1.5px] border-black px-2'
            })}
          />
          <div className="z-20 divide-y-2 rounded-[15px] bg-secondaryBg">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              return (
                <div
                  key={suggestion.description || index.toString()}
                  className="... w-full max-w-[350px] truncate p-2 text-left"
                >
                  {suggestion.description}
                </div>
              )
            })}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  )
}
