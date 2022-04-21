import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RegisterRoomState } from "../types/reduxState"
import { BedType } from "../types/room"

// 초기상태
const initialState: RegisterRoomState = {
  id: null,
  // 건물 유형 큰 범주
  large_building_type: null,
  // 건물 유형
  building_type: null,
  // 숙소 유형
  room_type: null,
  // 게스트만을 위해 만들어진 숙소인가
  is_set_up_for_guest: null,
  // 최대 숙박 인원
  maximum_guest_count: 1,
  // 침실 개수
  bedroom_count: 0,
  // 침대 개수
  // bedCount: 0,
  // 침대 유형
  bed_list: [],
  // 공용공간 침대 유형
  public_bed_list: [],
  // 욕실 개수
  bathroom_count: 1,
  // 욕실 유형
  bathroom_type: null,
  // 국가/지역
  country: '',
  // 시/도
  state: '',
  // 시/군/구
  city: '',
  // 도로명 주소
  street_address: '',
  // 동호수
  detail_address: '',
  // 우편번호
  postcode: '',
  // 위도
  latitude: 0,
  // 경도
  longitude: 0,
  // 편의 시설
  amenities: [],
  // 편의 공간
  conveniences: [],
  // 숙소 사진
  photos: [],
  // 숙소 설명
  description: '',
  // 숙소 제목
  title: '',
  // 숙소 요금
  price: 0,
  // 예약 시작 날짜
  start_date: null,
  // 예약 마감 날짜
  end_date: null,
}

const registerRoom = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    setRegister(state, action: PayloadAction<RegisterRoomState>) {
      state = action.payload
      return state
    },
    // 큰 건물 유형 변경하기
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.large_building_type = null
      }
      state.large_building_type = action.payload
      return state
    },
    // 건물 유형 변경하기
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.building_type = null
      }
      state.building_type = action.payload
      return state
    },
    // 숙소 유형 변경하기
    setRoomType(state, action: PayloadAction<'entire' | 'private' | 'public'>) {
      state.room_type = action.payload;
      return state
    },
    // '게스트용 숙소인지' 변경하기
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.is_set_up_for_guest = action.payload
      return state
    },
    // 최대 숙박 인원 변경하기
    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximum_guest_count = action.payload
      return state
    },
    // 침실 개수 변경하기
    setBedroomCount(state, action: PayloadAction<number>) {
      const bedroomCount = action.payload
      let { bed_list } = state

      state.bedroom_count = bedroomCount

      if (bedroomCount < bed_list.length) {
        // 기존 침대 개수가 더 많으면 초과 부분 잘라내기
        bed_list = state.bed_list.slice(0, bedroomCount)
      } else {
        // 변경 될 침대 개수가 더 많으면 나머지 침실 채우기
        for (let i = bed_list.length + 1; i < bedroomCount + 1; i += 1) {
          bed_list.push({ id: i, beds: [] })
        }
      }
      state.bed_list = bed_list

      return state
    },
    // 최대 침대 개수 변경하기
    // setBedCount(state, action: PayloadAction<number>) {
    //   state.bedCount = action.payload
    //   return state
    // },
    // 침대 유형 개수 변경하기
    setBedTypeCount(state, action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>) {
      const { bedroomId, type, count } = action.payload
      const bedroom = state.bed_list[bedroomId - 1]
      const prevBeds = bedroom.beds
      const index = prevBeds.findIndex((bed) => bed.type === type)
      if (index === -1) {
        // 타입이 없다면
        state.bed_list[bedroomId - 1].beds = [...prevBeds, { type, count }]
        return state
      }
      // 타입이 존재한다면
      if (count === 0) {
        state.bed_list[bedroomId - 1].beds.splice(index, 1)
      } else {
        state.bed_list[bedroomId - 1].beds[index].count = count
      }
      return state
    },
    // 공용공간 침대 유형 개수 변경하기
    setPublicBedTypeCount(state, action: PayloadAction<{ type: BedType, count: number }>) {
      const { type, count } = action.payload

      const index = state.public_bed_list.findIndex((bed) => bed.type === type)
      if (index === -1) {
        // 타입이 없다면
        state.public_bed_list = [...state.public_bed_list, { type, count }]
        return state
      }
      // 타입이 존재한다면
      if (count === 0) {
        state.public_bed_list.splice(index, 1)
      } else {
        state.public_bed_list[index].count = count
      }
      return state
    },
    // 욕실 개수 변경하기
    setBathroomCount(state, action: PayloadAction<number>) {
      state.bathroom_count = action.payload
      return state
    },
    // 욕실 유형 변경하기
    setBathroomType(state, action: PayloadAction<'private' | 'public'>) {
      state.bathroom_type = action.payload
      return state
    },
    // 국가 변경하기
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload
      return state
    },
    // 시/도 변경하기
    setState(state, action: PayloadAction<string>) {
      state.state = action.payload
      return state
    },
    // 시/군/구 변경하기
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload
      return state
    },
    // 도로명주소 변경하기
    setStreetAddress(state, action: PayloadAction<string>) {
      state.street_address = action.payload
      return state
    },
    // 동호수 변경하기
    setDetailAddress(state, action: PayloadAction<string>) {
      state.detail_address = action.payload
      return state
    },
    // 우편번호 변경하기
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload
      return state
    },
    // 위도 변경하기
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload
      return state
    },
    // 경도 변경하기
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload
      return state
    },
    // 편의 시설 변경하기
    setAmenities(state, action: PayloadAction<string[]>) {
      state.amenities = action.payload
      return state
    },
    // 편의 공간 변경하기
    setConveniences(state, action: PayloadAction<string[]>) {
      state.conveniences = action.payload
      return state
    },
    // 숙소 사진 변경하기
    setPhotos(state, action: PayloadAction<{ id: number, url: string }[]>) {
      state.photos = action.payload
      return state
    },
    // 숙소 설명 변경하기
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
      return state
    },
    // 숙소 제목 변경하기
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
      return state
    },
    // 숙소 요금 변경하기
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload
      return state
    },
    // 예약 시작 날짜 변경하기
    setStartDate(state, action: PayloadAction<string | null>) {
      state.start_date = action.payload
      return state
    },
    // 예약 마감 날짜 변경하기
    setEndDate(state, action: PayloadAction<string | null>) {
      state.end_date = action.payload
      return state
    },
  },
})

export const registerRoomActions = { ...registerRoom.actions }

export default registerRoom
