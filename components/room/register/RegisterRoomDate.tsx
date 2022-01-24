import styled from 'styled-components'
import palette from '../../../styles/palette'
import DatePicker from '../../common/DatePicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useSelector } from '../../../store'
import { useDispatch } from 'react-redux'
import { registerRoomActions } from '../../../store/registerRoom'
import RegisterRoomFooter from './RegisterRoomFooter'

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

  .register-room-date-wrapper {
    display: flex;
    align-items: center;

    label {
      span {
        display: block;
        margin-bottom: 8px;
      }
    }

    input {
      display: block;
      position: relative;
      width: 100%;
      height: 46px;
      padding-left: 20px;
      border: 1px solid ${palette.gray_eb};
      border-radius: 4px;
      font-size: 16px;
      outline: none;

      &::placeholder {
        color: ${palette.gray_76};
      }

      &:focus {
        border-color: ${palette.dark_cyan};
      }
    }

    .register-room-start-date {
      margin-right: 20px;
    }
  }
`

const RegisterRoomDate: React.FC = () => {
  const startDate = useSelector((state) => state.registerRoom.start_date)
  const endDate = useSelector((state) => state.registerRoom.end_date)

  const rangeStartDate = startDate ? new Date(startDate) : null
  const rangeEndDate = endDate ? new Date(endDate) : null

  const dispatch = useDispatch()

  // 예약 시작 날짜 변경시
  // Change reservation start date
  const onChangeStartDate = (date: Date | null) => {
    dispatch(registerRoomActions.setStartDate(date ? date.toISOString().split("T")[0] : null))
  }

  // 예약 마감 날짜 변경시
  // Change reservation end date
  const onChangeEndDate = (date: Date | null) => {
    dispatch(registerRoomActions.setEndDate(date ? date.toISOString().split("T")[0] : null))
  }

  return (
    <Container>
      <h2>Set available data.</h2>
      <h3>The eleventh Step</h3>
      <div className='register-room-date-wrapper'>
        <div className='register-room-start-date'>
          <label>
            <span>Start Date</span>
            <DatePicker
              selected={startDate ? new Date(startDate) : null}
              selectsStart
              startDate={rangeStartDate}
              endDate={rangeEndDate}
              minDate={new Date()}
              onChange={onChangeStartDate}
            />
          </label>
        </div>
        <div className='register-room-end-date'>
          <label>
            <span>End Date</span>
            <DatePicker
              selected={endDate ? new Date(endDate) : null}
              selectsEnd
              startDate={rangeStartDate}
              endDate={rangeEndDate}
              minDate={rangeStartDate ?? new Date()}
              onChange={onChangeEndDate}
            />
          </label>
        </div>
      </div>
      <RegisterRoomFooter
        preHref="/room/register/price"
        nextHref="/room/register/checklist"
      />
    </Container>
  )
}

export default RegisterRoomDate
