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

/**create event error field consts */
export const ERROR_FIELD = {
  eventTitle: 'TITLE',
  eventImage: 'EVENT/LANDING IMAGE',
  eventLocation: 'LOCATION',
  date: 'START/END DATE',
  ticket: 'TICKET SUPPLY',
  eventID: 'event ID'
}
