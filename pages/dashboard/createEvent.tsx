import { TbPhoto } from 'react-icons/tb'
import TextInput from '../../components/textInput'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import Button from '../../components/button'
export default function CreateEvent() {
  return (
    <div className="flex w-screen flex-col items-start space-y-[15px] bg-secondaryBg pb-[100px] pt-[35px] pl-[150px]">
      <h1>Create new event</h1>
      <div className="">
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
        <div className="relative h-[384px] max-h-[320px] w-[380px] rounded-3xl bg-gray-300 sm:max-h-full">
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
            <MdOutlineAddPhotoAlternate className="h-[150px] w-[150px]" />
          </div>
        </div>
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
      <Button type='submit' text={'Create new event'} onClick={()=>{console.log('new event added')}} active={true}/>
    </div>
  )
}
