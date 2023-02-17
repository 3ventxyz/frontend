/**errors for create event form */
export enum CreateEventErrors {
  noError,
  emptyTitle,
  invalidFileType,
  emptyImage,
  emptyEventLocation,
  startDateBehind,
  sameDatePeriod,
  endDateBehind,
  invalidNumber,
  lowCapNumber,
  eventIdTaken
}

/**enum for create event form inputs */
export enum CreateEventInputs {
  eventTitle,
  eventId,
  location,
  EventDate,
  eventDescription,
  eventTags,
  ticketMax,
  images
}
