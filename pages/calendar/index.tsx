import { startOfToday } from 'date-fns'
import LocalDatePicker from '../../components/utils/datepicker'
import SubCalendar from './components/subCalendar'

export default function Calendar() {
  return (
    <div className="flex  h-auto w-screen justify-center space-x-2 bg-secondaryBg">
      <div
        id="sub-column"
        className="flex w-auto flex-col space-y-1 bg-sky-300"
      >
        {/*TODO:
		  *first column*
		  -- bring the calendar picker that you have created before
		  --set the title 'community calendar in bold'
	*/}
        <h4>Community Calendar</h4>
        <SubCalendar
          selectedDate={startOfToday()}
          setDate={() => {}}
          name={'selected_date'}
        />
      </div>
      <div id="main-column" className="h-[750px] w-[750px] bg-sky-400">
        {/*
  TODO
		*second column*
		--the whole big calendar, this should be a separate component called mainCalendar.
		*/}
        hi this is a main calendar page
      </div>
    </div>
  )
}
