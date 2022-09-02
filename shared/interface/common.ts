export interface TicketInterface {
  ticketTitle: string
  registeredUsers: number
  capLimit: number
  tokenId: string
  price: number
  disabled?: boolean
  isSelected?: boolean
}

export interface LocationData {
  lat: number
  long: number
  address: string
}

export interface EventInterface {
  id: string
  uid?: string
  eventTitle: string
  eventDescription?: string
  EventLocation?: {}
  organization: string
  date: string
  timestamp?: Date
  address: string
  imgURL: string
  tickets?: TicketInterface[]
}

//dummy interface for testing and uploading data to firestore
export interface NewEventInterface {
  uid: string | null
  eventTitle: string | null
  eventDescription?: string | null
  organization: string | null
  date: string | null
  // ==============================
  eventId?: string | null //this is passed in the firebase content
  timestamp?: Date //later
  eventLocation: LocationData | null
  imgURL?: string | null //
  tickets?: TicketInterface[] //later
}

export interface UserProfileEvents {
  upcomingEvents: EventInterface[]
  pastEvents: EventInterface[]
}
