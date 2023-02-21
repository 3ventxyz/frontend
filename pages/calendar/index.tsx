import { startOfToday } from 'date-fns'
import { TextInput } from '../../components/inputs/textInput'
import MainCalendar from './components/mainCalendar'
import SubCalendar from './components/subCalendar'

export default function Calendar() {
  return (
    <div className="flex  h-auto w-screen justify-center space-x-2 bg-secondaryBg">
      <div id="sub-column" className="flex w-auto flex-col space-y-1 ">
        <h4>Community Calendar</h4>
        <SubCalendar
          selectedDate={startOfToday()}
          setDate={() => {}}
          name={'selected_date'}
        />
        <TextInput id={'tag-search'} labelText={'search'} setValue={() => {}} />
      </div>
      <MainCalendar />
    </div>
  )
}
