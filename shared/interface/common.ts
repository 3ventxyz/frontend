import { EmailAuthCredential } from '@firebase/auth'
import { CreateEventInputs } from '../enums/enums'

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
  description: string
  location: LocationData
  start_date: Date
  end_date: Date
  img_url: string
  landing_portrait_url: string
  ticket_max: number
  event_id: string
  registered_attendees: number
  tags: string[]
}

export interface EventHostInterface {
  title: string
  uid: string
  event_id: string
  start_date: Date
  end_date: Date
}

export interface AllowlistUser {
  uid: string
  email: string
  wallet: string
  twitter_id: string
  twitter_name: string
  discord_username: string
  discord_guild: boolean
  userTokens: boolean
  status: string
}

export interface AllowlistTableHeader {
  id: string
  label: string
  disableSorting: boolean
  display: boolean
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

export interface PostInterface {
  avatar: string
  date_posted: Date
  post_content: string
  uid: string
  username: string
}
export interface RegisteredAttendeeInterface {
  uid: string
  username: string
  avatar: string
}

export interface UserInterface {
  uid: string
  username: string
  avatar: string
  address: string
  qr_code?: string
}

export interface PostInterface {
  avatar: string
  date_posted: Date
  post_content: string
  uid: string
  username: string
}

export interface createEventFormInterface {
  title: string
  start_date: Date
  end_date: Date
  event_location: LocationData
  event_id: string
  event_description: string
  ticket_max: number
  event_file_img: File | null
  event_img_url: string
  landing_file_img: File | null
  landing_img_url: string
  tags: string[]
}

export interface createEventStatusInterface {
  currentStep: number
  isCreatingNewEvent: boolean
  errorMsg: string
  focusedInputField: CreateEventInputs
  inputFieldName: string
  inputFieldInstruction: string
}

export interface createEventFormInterface {
  title: string
  start_date: Date
  end_date: Date
  event_location: LocationData
  event_id: string
  event_description: string
  ticket_max: number
  event_file_img: File | null
  event_img_url: string
  landing_file_img: File | null
  landing_img_url: string
}

export interface createEventStatusInterface {
  currentStep: number
  isCreatingNewEvent: boolean
  errorMsg: string
  errorField: string
}

export interface AllowlistsInterface extends Array<AllowlistInterface> {}
