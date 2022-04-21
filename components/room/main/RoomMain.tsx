import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRoomListAPI } from '../../../lib/api/room'
import { useSelector } from '../../../store'
import { roomActions } from '../../../store/room'

const RoomMain: React.FC = () => {
  const roomList = useSelector((state) => state.room.roomList);
  console.log(roomList)

  const dispatch = useDispatch()

  useEffect(() => {
    getRoomListAPI().then(res => dispatch(roomActions.setRoomList(res.data.data)))
  }, [])

  return <div>Accommodation</div>
}

export default RoomMain;