export interface TicketInterface {
  ticketTitle: string
  registeredUsers: number
  capLimit: number
  tokenId: string
  price: number
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
  title: string | null
  description?: string | null
  organization: string | null
  start_date?: Date | null
  end_date?: Date | null
  location: LocationData | null
  // ==============================
  event_id?: string | null //this is passed in the firebase content
  img_url?: string | null
  tickets?: TicketInterface[] //later
}

export interface UserProfileEvents {
  upcomingEvents: EventInterface[]
  pastEvents: EventInterface[]
}
