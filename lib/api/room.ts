import axios from '.'
import { RegisterRoomState } from '../../types/reduxState'
import { allRoomType, RoomType } from '../../types/room'

interface RegisterRoomBody {
  transaction_time: Date,
  data:
  RegisterRoomState &
  { email: string }
}

// 숙소 등록하기
// Register a room
export const registerRoomAPI = (body: any) => axios.post('/api/room', body)

// 숙소 불러오기
// Get a room
export const getRoomAPI = (email: string) => axios.get(`/api/room/${email}`)

// 숙소 수정하기
// Modify a room
export const modifyRoomAPI = (body: any) => axios.put('/api/room', body)

// 숙소 리스트 불러오기
// Get room list
export const getRoomListAPI = () => axios.get('/api/room');
