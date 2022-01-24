import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { bedroomCountList } from '../../../lib/staticData'
import { getNumber } from '../../../lib/utils'
import { secondStepValidation } from '../../../lib/validation'
import { useSelector } from '../../../store'
import { registerRoomActions } from '../../../store/registerRoom'
import palette from '../../../styles/palette'
// import Button from '../common/Button'
import Counter from '../../common/Counter'
import Selector from '../../common/Selector'
import RegisterRoomBedList from './RegisterRoomBedList'
// import RegisterRoomBedTypes from './RegisterRoomBedTypes'
import RegisterRoomFooter from './RegisterRoomFooter'
import WarningIcon from '../../../public/static/svg/common/warning.svg'

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
    margin-bottom: 24;
    word-break: keep-all;
  }

  .register-room-maximum-guest-count-wrapper {
    width: 320px;
    margin-top: 24px;
    margin-bottom: 32px;
  }

  .register-room-bedroom-count-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }

  /* .register-room-bed-count-wrapper {
    width: 320px;
    margin-bottom: 57px;
  } */

  .register-room-bed-type-info {
    margin-top: 6px;
    margin-bottom: 20px;
    word-break: keep-all;
  }

  .register-room-type-list-wrapper {
    width: 548px;
  }

  .register-room-bed-type-warning {
    margin-top: 8px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }

    p {
      font-size: 12px;
      color: ${palette.davidson_orange};
    }
  }
`

const RegisterRoomBedrooms: React.FC = () => {
  const maximumGuestCount = useSelector((state) => state.registerRoom.maximum_guest_count)
  const bedroomCount = useSelector((state) => state.registerRoom.bedroom_count)
  const bedList = useSelector((state) => state.registerRoom.bed_list)
  const publicBedList = useSelector((state) => state.registerRoom.public_bed_list)
  const validateMode = useSelector((state) => state.common.validateMode)
  // const bedCount = useSelector((state) => state.registerRoom.bedCount)

  const dispatch = useDispatch();

  // 최대 숙박 인원 변경 시
  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value))
  }

  // 침실 개수 변경 시
  const onChangeBedroomCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBedroomCount(getNumber(event.target.value) || 0))
  }

  // 침대 개수 변경 시
  // const onChangeBedCount = (value: number) => {
  //   dispatch(registerRoomActions.setBedCount(value))
  // }

  return (
    <Container>
      <h2>How many guests can stay in the accommodation?</h2>
      <h3>The second Step</h3>
      <p className='room-register-step-info'>
        Please make sure there are enough beds for all guest to have a comportable stay.
      </p>
      <div className='register-room-maximum-guest-count-wrapper'>
        <Counter
          label='Maximum Guest Count'
          value={maximumGuestCount}
          onChange={onChangeMaximumGuestCount}
        />
      </div>
      <div className='register-room-bedroom-count-wrapper'>
        <Selector
          type='register'
          label='How many bedrooms for guests?'
          options={bedroomCountList}
          value={`${bedroomCount} Bedroom(s)`}
          isValid={!!bedroomCount}
          onChange={onChangeBedroomCount}
        />
      </div>
      {/* <div className='register-room-bed-count-wrapper'>
        <Counter
          label='bed'
          value={bedCount}
          minValue={0}
          onChange={onChangeBedCount}
        />
      </div> */}
      <h4>Bed Type</h4>
      <p className='register-room-bed-type-info'>
       By specifying the type of bed in each room, the guests will figure out how the beds is set up in the room. 
      </p>
      <RegisterRoomBedList />
      {validateMode && !secondStepValidation({bedroomCount, bedList, publicBedList}) && (
        <div className='register-room-bed-type-warning'>
          <WarningIcon />
          <p>Please set up the bed(s).</p>
        </div>
      )}
      <RegisterRoomFooter
        preHref='/room/register/building'
        nextHref='/room/register/bathroom'
        // isValid={secondStepValidation({bedroomCount, bedList, publicBedList})}
      />
    </Container>
  )
}

export default RegisterRoomBedrooms;
