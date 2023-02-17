// Create event error messages.

export const ERROR_MESSAGE = {
  emptyField: 'input field is empty',
  invalidFileType: 'invalid file; please select a jpg or png file type.',
  emptyImage: 'empty image; please select a file or a predefined image.',
  emptyEventLocation: 'event location is not selected',
  startDateBehind: 'start date cannot be a previous date from today',
  sameDatePeriod: 'start date and end date cannot have the same time period',
  endDateBehind: 'end date cannot be behind the start date schedule',
  invalidNumber: 'Please enter a valid number of tickets',
  lowCapNumber: 'event capacity cannot be lower than the previous capacity',
  eventIdTaken: 'this id has been taken, please enter a different id'
}

/**rename to event inputs */
export const INPUT_FIELD = {
  eventTitle: 'Event Title',
  eventID: 'Event ID',
  eventImage: 'Event and Landing Image',
  eventLocation: 'Event Location',
  date: 'Start and End Date',
  ticket: 'Ticket Supply'
}

export const CREATE_EVENT_INSTRUCTIONS = {
  eventTitleInstr: 'Enter the main title of your event.',
  eventIDInstr: 'Enter the id of your event for easy localization',
  eventImageInstr: 'Add a ticket image and a landing portrait',
  eventLocationInstr: 'Select the place where your event will take place at',
  dateInstr: 'Set a start date and end date of your event',
  ticketInstr: 'Set a max cap of attendees'
}
