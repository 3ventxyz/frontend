import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from  'react-places-autocomplete'
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
  name:string,
}

export default function LocationInput({
  labelText,
  id,
  name,
  placeholder,
  setLocation
}: LocationInputProps) {
  const [searchText, setSearchText] = useState('')
  const [address, setAddress] = useState('')

  const handleChange = (search: string) => {
    setSearchText(search)
  }

  const handleSelect = (address: string, placeID: string) => {
    console.log('handleSelect', address)
    geocodeByAddress(address)
      .then((results) => {
        setSearchText(address)
        setAddress(results[0].formatted_address)
        return getLatLng(results[0])
      })
      .then((latLng) => {
        setLocation({
          lat: latLng['lat'],
          long: latLng['lng'],
          address: address
        })
        return console.log('Success', latLng)
      })
      .catch((error) => console.error('Error', error))
  }

  return (
    <PlacesAutocomplete
      value={searchText}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-stretch">
          <label className="text-left" htmlFor={id}>
            {labelText}
          </label>
          <input
          name={name}
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
                  {...getSuggestionItemProps(suggestion, {
                    className: '... w-full max-w-[350px] truncate p-2 text-left'
                  })}
                  key={suggestion.description || index.toString()}
                >
                  {suggestion.description}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}