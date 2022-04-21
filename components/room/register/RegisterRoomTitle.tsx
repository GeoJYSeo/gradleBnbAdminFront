import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { useSelector } from "../../../store"
import { registerRoomActions } from "../../../store/registerRoom"
import palette from "../../../styles/palette"
import Input from "../../common/Input"
import RegisterRoomFooter from "./RegisterRoomFooter"

const Container = styled.div`
  padding: 62px 30px 100px;
  width: 800px;

  h2 {
    font: 19px;
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
    max-width: 400px;
    margin-bottom: 24px;
  }
`

const RegisterRoomTitle: React.FC = () => {
  const title = useSelector((state) => state.registerRoom.title)

  const dispatch = useDispatch()

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(registerRoomActions.setTitle(event.target.value))

    return (
      <Container>
        <h2>Please set a title.</h2>
        <h3>The nineth Step</h3>
        <div className='register-room-title-wrapper'>
          <Input
            value={title}
            isValid={true}
            label="Grab the guests' attention with a title that highlights the features and advantages of the accommodation."
            onChange={onChangeTitle}
          />
        </div>
        <RegisterRoomFooter
          preHref='/room/register/description'
          nextHref='/room/register/price'
        />
      </Container>
    )
}

export default RegisterRoomTitle
