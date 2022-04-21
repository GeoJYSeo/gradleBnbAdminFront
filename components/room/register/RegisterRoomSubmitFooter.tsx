import Link from 'next/link'
import styled from 'styled-components'
import palette from '../../../styles/palette'
import BackArrowIcon from '../../../public/static/svg/register/register_room_footer_back_arrow.svg'
import Button from '../../common/Button'
import { useSelector } from '../../../store'
import { registerRoomAPI, modifyRoomAPI, getRoomAPI } from '../../../lib/api/room'

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;

    svg {
      margin-right: 8px;
    }
  }
`

const RegisterRoomSubmitFooter: React.FC = () => {
  const email = useSelector((state) => state.user.email)
  const registerRoom = useSelector((state) => state.registerRoom)

  // 등록하기 클릭시
  // Click REGISTER button
  const onClickRegisterRoom = async () => {
    const registerRoomBody = {
      transaction_time: new Date(),
      data: {
        ...registerRoom,
        email
      }
    }

    try {
      registerRoom.id ? await modifyRoomAPI(registerRoomBody) : await registerRoomAPI(registerRoomBody)
      window.location.replace('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container>
      <Link href='/room/register/date'>
        <a className='register-room-footer-back'>
          <BackArrowIcon />
          Back
        </a>
      </Link>
      <Button
        onClick={onClickRegisterRoom}
        color='bittersweet'
        width='102px'
      >
        {registerRoom.id ? "Modify" : "Register"}
      </Button>
    </Container>
  )
}

export default RegisterRoomSubmitFooter
