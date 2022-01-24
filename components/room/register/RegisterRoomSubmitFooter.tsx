import Link from 'next/link'
import styled from 'styled-components'
import palette from '../../../styles/palette'
import BackArrowIcon from '../../../public/static/svg/register/register_room_footer_back_arrow.svg'
import Button from '../../common/Button'
import { useSelector } from '../../../store'
import { useRouter } from 'next/router'
import { registerRoomAPI } from '../../../lib/api/room'

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
  const testRegisterRoom = {
      large_building_type: 'Apartment',
      building_type: 'Annex',
      room_type: 'entire',
      is_set_up_for_guest: true,
      maximum_guest_count: 1,
      bedroom_count: 2,
      bed_list: [
        {
          id: 1,
          beds: [
            {
              type: 'Single',
              count: 1
            }
          ]
        },
        {
          id: 2,
          beds: [
            {
              type: 'Air Mettress',
              count: 1
            }
          ]
        }
      ],
      public_bed_list: [
        {
          type: 'Queen-size',
          count: 1
        }
      ],
      bathroom_count: 2,
      bathroom_type: 'private',
      country: 'Tokyo',
      state: 'Ota City',
      city: 'Ōmorihigashi',
      street_address: '3-chōme 27',
      detail_address: '111',
      postcode: 'Japan',
      latitude: 35.5728063,
      longitude: 139.7389774,
      amenities: [
        'Wifi',
        'TV',
        'Heater',
        'Air Conditioner',
        'Iron',
        'Shampoo',
        'Hair dryer',
        'Breakfast, Coffee, Tea',
        'Business Space',
        'Closet',
        'Fireplace',
        'Guest Entrance'
      ],
      conveniences: [
        'Kitchen',
        'Laundry Room',
        'Parking Lot',
        'Swimming Pool',
        'Gym',
        'Jacuzzi'
      ],
      photos: [
        {
          id: 3,
          url: 'https://test-bnb-images.s3.ap-northeast-1.amazonaws.com/bnb_test1_1641818903793.jpg'
        },
        {
          id: 4,
          url: 'https://test-bnb-images.s3.ap-northeast-1.amazonaws.com/bnb_test3_1641818908771.jpg'
        }
      ],
      description: 'test1\ntet2\ntest3',
      title: 'test',
      price: 123456798,
      start_date: '2022-01-10',
      end_date: '2022-02-05'
  }
  
  const router = useRouter()

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
    console.log(registerRoomBody)

    try {
      await registerRoomAPI(registerRoomBody)
      router.push('/')
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
        Register
      </Button>
    </Container>
  )
}

export default RegisterRoomSubmitFooter
