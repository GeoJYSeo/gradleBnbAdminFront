import { useDispatch } from "react-redux";
import styled from "styled-components";
import { convenienceList } from "../../../lib/staticData";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import CheckboxGroup from "../../common/CheckBoxGroup";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
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
`

const RegisterRoomConveniences: React.FC = () => {
  const conveniences = useSelector((state) => state.registerRoom.conveniences)
  
  const dispatch = useDispatch()

  const onChangeConveniences = (selected: string[]) => {
    dispatch(registerRoomActions.setConveniences(selected))
  }

  return (
    <Container>
      <h2>Which conveniences the guests can use?</h2>
      <h3>The sixth Step</h3>
      <p className='register-room-step-info'>
        Please select the conveniences available to the guests at the accommodation.
      </p>
      <div className='register-room-conveniences-checkbox-group-wrapper'>
        <CheckboxGroup
          value={conveniences}
          options={convenienceList}
          onChange={onChangeConveniences}
        />
      </div>
      <RegisterRoomFooter
        preHref='/room/register/amenities'
        nextHref='/room/register/photos'
      />
    </Container>
  )
}

export default RegisterRoomConveniences
