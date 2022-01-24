import { useDispatch } from "react-redux";
import styled from "styled-components";
import bathroom from "../../../pages/room/register/bathroom";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import Counter from "../../common/Counter";
import RadioGroup from "../../common/RadioGroup";
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
    max-width: 400px;
    margin-bottom: 24px;
  }

  .register-room-bathroom-counter-warpper {
    width: 290px;
    margin-bottom: 32px;
  }
`

const RegisterBathroom: React.FC = () => {
  const bathroomCount = useSelector((state) => state.registerRoom.bathroom_count)
  const bathroomType = useSelector((state) => state.registerRoom.bathroom_type)

  const dispatch = useDispatch()

  return (
    <Container>
      <h2>The number of bathrooms.</h2>
      <h3>The third Step</h3>
      <p className='register-room-step-info'>
        If there is no shower or bathtub, it counts as 0.5.
      </p>
      <div className='register-room-bathroom-counter-warpper'>
        <Counter
          label='bathroom'
          increaseNum={0.5}
          // minValue={0}
          value={bathroomCount}
          onChange={(value) => dispatch(registerRoomActions.setBathroomCount(value))}
        />
      </div>
      <RadioGroup
        label='Is the bathroom only for the guest?'
        value={bathroomType}
        isValid={!!bathroomType}
        onChange={(value) => dispatch(registerRoomActions.setBathroomType(value))}
        options={[{ value: 'private', label: 'Yes.'}, { value: 'public', label: 'No, it is public.'}]}
      />
      <RegisterRoomFooter
        preHref='/room/register/bedrooms'
        nextHref='/room/register/location'
        isValid={bathroomCount > 0 && !!bathroomType}
      />
    </Container>
  )
}

export default RegisterBathroom
