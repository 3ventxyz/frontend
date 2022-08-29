import TextInput from '../../components/textInput'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import Button from '../../components/button'
import CreateTicketTier from './components/createTicketTier'
import FileImageInput from '../../components/fileImageInput'
export default function CreateEvent() {
  return (
    <div className="flex w-screen flex-col items-start space-y-[15px] bg-secondaryBg pb-[100px] pt-[35px] pl-[150px]">
      <h1>Create new event</h1>
      <div className="">
        <h4>Event Name:</h4>
        <TextInput
          id={''}
          labelText={''}
          placeholder={'e.g. crypto event 2023'}
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
          placeholder={'e.g. organization inc.'}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
        />
      </div>
      <div>
        <h4>Event Tile Picture:</h4>
        <FileImageInput />
      </div>
      <div>
        <h4>Details of the event</h4>

        <TextInput
          id={'location'}
          labelText={'Address or location of the event'}
          placeholder={'123 name st, city, CA, 00000'}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
        />
        <TextInput
          id={'date'}
          labelText={'date of the event'}
          placeholder={'mm/dd/yyyy'}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
        />
      </div>
      <div>
        <div className="flex  items-baseline space-x-[10px]">
          <h4>Tickets</h4>
          <p>(You can create up to 4 ticket tiers)</p>
        </div>
        <CreateTicketTier />
      </div>
      <Button
        type="submit"
        text={'Create new event'}
        onClick={() => {
          console.log('new event added')
        }}
        active={true}
      />
    </div>
  )
}
