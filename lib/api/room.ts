import axios from '.'
import { RegisterRoomState } from '../../types/reduxState'
import { RoomType } from '../../types/room'

interface RegisterRoomBody {
  transaction_time: Date,
  data:
  RegisterRoomState &
  { email: string }
}

// 숙소 등록하기
// Register room
export const registerRoomAPI = (body: any) => axios.post('/api/room', body)

// 숙소 불러오기
// get a room
export const getRoomAPI = (email: string) => axios.get(`/api/room/${email}`)
