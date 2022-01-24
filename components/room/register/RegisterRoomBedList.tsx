import { useSelector } from "../../../store"
import RegisterRoomBedTypes from "./RegisterRoomBedTypes"
import RegisterRoomPublicBedTypes from "./RegisterRoomPublicType"

const RegisterRoomBedList: React.FC = () => {
  const bedList = useSelector((state) => state.registerRoom.bed_list)

  return (
    <ul className='register-room-bed-type-list-wrapper'>
      {bedList.map((bedroom, i) => (
        <RegisterRoomBedTypes bedroom={bedroom} key={i} />
      ))}
      <RegisterRoomPublicBedTypes />
    </ul>
  )
}

export default RegisterRoomBedList
