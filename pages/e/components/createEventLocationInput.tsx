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
	name: string
	setLocation: (name: string, location: LocationData) => void
  }
  
  export default function CreateEventLocationInput({
	labelText,
	id,
	placeholder,
	name,
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
			setLocation(name, {
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
			<label
			  htmlFor={id}
			  className="mb-2 block text-sm font-medium text-gray-900 "
			>
			  {labelText.toUpperCase()}
			</label>
			<input
			  {...getInputProps({
				placeholder: placeholder,
				id: id,
				className:
				  'focus:shadow-outline leading-0 block h-full max-w-[500px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
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
  