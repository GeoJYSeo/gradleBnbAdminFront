import axios from ".";

export const getLocationAPI = ({ latitude, longitude }: { latitude: number; longitude: number; }) =>
  axios.get(`/api/location?latitude=${latitude}&longitude=${longitude}`)

// 구글 장소 검색 api
// google place search api
export const searchPlacesAPI = (searchKeyword: string) =>
  axios.get('/api/location/places', { params: { searchKeyword } })

// placeId 로 장소 정보 불러오기 api
// google place search api with api
export const getPlaceAPI = (placeId: string) =>
  axios.get(`/api/location/places/${placeId}`)
