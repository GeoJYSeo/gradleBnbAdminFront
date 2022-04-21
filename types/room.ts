import { type } from "os"
import { UserType } from "./user"

export type BedType =
  | 'Add a bed'
  | 'Sofa'
  | 'Air Mettress'
  | 'Blanket'
  | 'Single'
  | 'Double'
  | 'Queen-size'
  | 'Bunk'
  | 'Crib'
  | 'Hammock'
  | 'Waterbed'

export type StoredRoomType = {
  id: number
  largeBuildingType: string | null
  buildingType: string | null
  roomType: string | null
  isSetUpForGuest: boolean | null
  maximumGuestCount: number
  bedList: { id: number; beds: { type: BedType; count: number }[] }[]
  publicBedList: { type: BedType; count: number }[]
  bathroomCount: number
  bathroomType: 'private' | 'public' | null
  latitude: number
  longitude: number
  country: string
  state: string
  city: string
  streetAddress: string
  detailAddress: string
  postcode: string
  amenities: string[]
  conveniences: string[]
  photos: { id: number; url: string }[]
  description: string
  title: string
  price: number
  startDate: string | null
  endDate: string | null
  createdAt: Date
  updatedAt: Date
  hostId: number
}

export type RoomType = {
  id: number
  large_building_type: string | null
  building_type: string | null
  room_type: string | null;
  is_set_up_for_guest: boolean | null;
  maximum_guest_count: number
  amenities: string[]
  bathroom_count: number
  bathroom_type: 'private' | 'public'
  bed_list: { id: number; type: BedType; count: number }[];
  public_bed_list: { type: BedType; count: number }[];
  latitude: number
  longitude: number
  country: string
  state: string
  city: string
  street_address: string
  detail_address: string
  postcode: string
  conveniences: string[]
  photos: { id: number; url: string }[]
  description: string
  title: string
  vacancy_list: {
    price: string;
    start_date: string;
    end_date: string;
  }[]
  created_at: string
  updated_at: string
}

export type allRoomType = {
  id: number
  large_building_type: string | null
  building_type: string | null
  room_type: string | null;
  is_set_up_for_guest: boolean | null;
  maximum_guest_count: number
  amenities: string[]
  bathroom_count: number
  bathroom_type: 'private' | 'public'
  bed_list: { id: number; type: BedType; count: number }[];
  public_bed_list: { type: BedType; count: number }[];
  latitude: number
  longitude: number
  country: string
  state: string
  city: string
  street_address: string
  detail_address: string
  postcode: string
  conveniences: string[]
  photos: { id: number; url: string }[]
  description: string
  title: string
  vacancy_list: {
    price: string;
    start_date: string;
    end_date: string;
  }[]
  created_at: string
  updated_at: string
  user: UserType
  pagination: {
    total_pages: number
    total_elements: number
    current_page: number
    current_elements: number
  }
}
