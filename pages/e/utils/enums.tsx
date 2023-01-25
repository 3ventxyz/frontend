
/**error for create event form */
export enum CreateEventErrors {
  noError,
  emptyTitle,
  invalidFileType,
  emptyImage,
  emptyEventLocation,
  startDateError,
  sameDatePeriod,
  endDateBehind,
  invalidNumber,
  lowCapNumber
}
