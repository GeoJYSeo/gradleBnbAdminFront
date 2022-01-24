import { useDispatch } from "react-redux";
import styled from "styled-components";
import { amenityList } from "../../../lib/staticData";
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
    font-weight: boid;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }

  .register-room-step-info {
    font-size: 14px;
    max-width: 600px;
    margin-bottom: 24px;
  }
`

const RegisterRoomAmenities: React.FC = () => {
  const amenities = useSelector((state) => state.registerRoom.amenities)

  const dispatch = useDispatch()

  const onChangeAmenities = (selected: string[]) => {
    dispatch(registerRoomActions.setAmenities(selected))
  }

  return (
    <Container>
      <h2>What kind of amenities do you have?</h2>
      <h3>The fifth Step</h3>
      <p className='register-room-step-info'>
        It is the list that the guests typically expect.<br /> Amenities can be added at any time after registering the accommodation.
      </p>
      <div className='register-room-amenities-checkbox-group-wrapper'>
        <CheckboxGroup
          value={amenities}
          options={amenityList}
          onChange={onChangeAmenities}
        />
      </div>
      <RegisterRoomFooter
        preHref='/room/register/location'
        nextHref='/room/register/conveniences'
      />
    </Container>
  )
}

export default RegisterRoomAmenities
