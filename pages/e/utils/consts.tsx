// Create event error messages.

export const ERROR_MESSAGE = {
  emptyTitle: 'title is empty',
  invalidFileType:
    'Selected Image is invalid type. Please upload jpg or png image.',
  emptyImage: 'Image is invalid, please select an image for your event.',
  emptyEventLocation: 'event location is not selected',
  startDateBehind: 'start date cannot be a previous date from today',
  sameDatePeriod: 'start date and end date cannot have the same time period',
  endDateBehind: 'end date cannot be behind the start date schedule',
  invalidNumber: 'Please enter a valid number of tickets',
  lowCapNumber: 'event capacity cannot be lower than the previous capacity',
  eventIdTaken: 'Event ID: event id has been taken, please enter a different id'
}

/**create event error field consts */
export const ERROR_FIELD = {
  eventTitle: 'Event Title',
  eventImage: 'Event Image',
  eventLocation: 'Location',
  date: 'Start Date/,End Date',
  ticket: 'Tickets',
  eventID: 'event ID'
}
