
/**error for create event form */
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
