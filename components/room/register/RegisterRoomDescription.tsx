import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { useSelector } from "../../../store"
import { registerRoomActions } from "../../../store/registerRoom"
import palette from "../../../styles/palette"
import Textarea from "../../common/Textarea"
import RegisterRoomFooter from "./RegisterRoomFooter"

const Contrainer = styled.div`
  padding: 62px 30px 100px;

  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }

  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }

  .register-room-step-info {
    font-size: 14px;
    max-width: 600px;
    margin-bottom: 24px;
  }

  .register-room-description-wrapper {
    width: 600px;
    font-size: 14px;
    margin-bottom: 16px;
  }
`

const RegisterRoomDescription: React.FC = () => {
  const dispatch = useDispatch()

  const description = useSelector((state) => state.registerRoom.description)

  // 숙소 설명 변경시
  // Change Description
  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => 
    dispatch(registerRoomActions.setDescription(event.target.value))

  return (
    <Contrainer>
      <h2>Please describe about the accommodation to the guests.</h2>
      <h3>The eighth Step</h3>
      <p className='register-room-description-wrapper'>
        Please introduce the advantages of the accommodation,<br />special amenities and attractive points of the surrounding area.
      </p>
      <div className='register-room-description-wrapper'>
        <Textarea
          value={description}
          onChange={onChangeDescription}
        />
      </div>
      <RegisterRoomFooter
        preHref='/room/register/photo'
        nextHref='/room/register/title'
      />
    </Contrainer>
  )
}

export default RegisterRoomDescription
