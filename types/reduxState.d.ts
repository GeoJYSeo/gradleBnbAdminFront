import { BedType, RoomType } from "./room"
import { UserType } from "./user"

// 유저 redux state
export type SignInState = UserType & {
  isLogged: boolean
  access_token: string | null
}

// 공통 redux state
export type CommonState = {
  validateMode: boolean
}

export type FirstStepInfo = {
  largeBuildingType: string | null
  buildingType: string | null
  roomType: string | null
  isSetUpForGuest: boolean | null
}

export type SecondStepInfo = {
  bedroomCount: number
  bedList: { id: number; beds: { type: BedType; count: number }[] }[]
  publicBedList: { type: BedType; count: number }[]
}

// 숙소 등록하기
export type RegisterRoomState = {
  id: number | null
  large_building_type: string | null
  building_type: string | null
  room_type: string | null
  is_set_up_for_guest: boolean | null
  maximum_guest_count: number
  bedroom_count: number
  // bedCount: number
  bed_list: { id: number; beds: { type: BedType; count: number }[] }[]
  public_bed_list: { type: BedType; count: number }[]
  bathroom_count: number
  bathroom_type: 'private' | 'public' | null
  country: string
  state: string
  city: string
  street_address: string
  detail_address: string
  postcode: string
  latitude: number
  longitude: number
  amenities: string[]
  conveniences: string[]
  photos: { id: number; url: string }[]
  description: string
  title: string
  price: number
  start_date: string | null
  end_date: string | null
}

// 숙소 검색
// seardch accommodation
export type SearchRoomState = {
  location: string
  latitude: number
  longitude: number
  checkInDate: string | null
  checkOutDate: string | null
  adultsCount: number
  childrenCount: number
  infantsCount: number
}

// 숙소 redux state
export type RoomState = {
  roomList: allRoomType[] | null
}
