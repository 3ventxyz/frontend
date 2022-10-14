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
  uid: string
  title: string
  description?: string
  location: LocationData
  start_date: Date
  end_date: Date
  img_url: string
  ticket_max: number
  event_id: string
}

export interface UserProfileEvents {
  upcomingEvents: EventInterface[]
  pastEvents: EventInterface[]
}

export interface UserModel {
  phone_number: string
  discord_id: string
  discord_verified: boolean
  twitter_name?: string
  wallet: string
  siwe_expiration_time: string
  twitter_verifications: Array<boolean>
}

export interface AllowlistInterface {
  uid: string
  title: string
  description?: string
  allowlist_id?: string
  allowlist: Array<string>
}

export interface AllowlistsInterface extends Array<AllowlistInterface> {}
