import TextInput from '../../components/textInput'

export default function CreateEvent() {
  return (
    <div className="flex w-screen flex-col items-center bg-secondaryBg pt-[35px] pb-[35px]">
      TODO: create Event
      <div>
        <h4>Event Name:</h4>
        <TextInput
          id={''}
          labelText={''}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
        />
      </div>
      <div>
        <h4>Organization:</h4>
        <TextInput
          id={''}
          labelText={''}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
        />
      </div>
      <div>
        <h4>Event Tile Picture:</h4>
		<TextInput
          id={''}
          labelText={''}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
        />
      </div>
      <div>
        <h4>Address and date of event</h4>
		<TextInput
          id={''}
          labelText={''}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
        />
      </div>
      <div>
        <h4>Ticket tiles</h4>
		<TextInput
          id={''}
          labelText={''}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
        />
      </div>
    </div>
  )
}
