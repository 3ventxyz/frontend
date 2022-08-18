export interface TicketInterface {
  ticketTitle: string
  registeredUsers: number,
  capLimit: number,
  tokenId: string
  price: number
  disabled?: boolean
  isSelected?: boolean
}

export interface EventInterface {
  id: string
  eventTitle: string
  orgTitle: string
  date: string
  timestamp?: Date
  address: string
  imgURL: string
  tickets?: TicketInterface[]
}

export interface UserProfileEvents {
  upcomingEvents: EventInterface[]
  pastEvents: EventInterface[]
}
