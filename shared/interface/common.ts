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

export interface TimeStamp {
  nanoseconds: number
  seconds: number
}

export interface EventInterface {
  id: string
  uid?: string
  title: string
  description?: string
  location: LocationData,
  organization: string
  start_date?: TimeStamp,
  end_date?: TimeStamp,
  timestamp?: Date
  img_url: string
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

export interface UserModel {
  phone_number: string
  discord_id: string
  discord_verified: boolean
  twitter_id: string
  twitter_verified: boolean
  twitter_name?: string
  wallet: string
  siwe_expiration_time: string
}