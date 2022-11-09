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
  registered_attendees: number
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

export interface AllowlistInterface {
  uid: string
  title: string
  description?: string
  allowlist_id?: string
  allowlist: Array<string>
}

export interface PostInterface{
  avatar: string,
  date_posted: Date,
  post_content: string,
  uid: string,
  username: string,
}
export interface RegisteredAttendeeInterface{
  uid:string,
  username: string,
  avatar: string,
}

export interface AllowlistsInterface extends Array<AllowlistInterface> {}
