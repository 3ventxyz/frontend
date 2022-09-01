export interface TicketInterface {
  ticketTitle: string
  registeredUsers: number
  capLimit: number
  tokenId: string
  price: number
  disabled?: boolean
  isSelected?: boolean
}

export interface EventInterface {
  id: string
  uid?: string
  eventTitle: string
  eventDescription?: string
  coordinates?: {}
  organization: string
  date: string
  timestamp?: Date
  address: string
  imgURL: string
  tickets?: TicketInterface[]
}

//dummy interface for testing and uploading data to firestore
export interface NewEventInterface {
  eventId: string
  uid: string
  eventTitle: string
  eventDescription?: string
  organization: string
  date: string
  address: string
  // ==============================
  timestamp?: Date
  // talk about this with ben.
  coordinates?: {}
  imgURL?: string
  tickets?: TicketInterface[]
}

export interface UserProfileEvents {
  upcomingEvents: EventInterface[]
  pastEvents: EventInterface[]
}
