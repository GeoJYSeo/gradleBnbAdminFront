import styled from 'styled-components'
import palette from '../../../styles/palette'
import Button from '../../common/Button'
import NavigatorIcon from '../../../public/static/svg/register/navigation.svg';
import Selector from '../../common/Selector';
import { countryList } from '../../../lib/staticData';
import Input from '../../common/Input';
import { useSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { registerRoomActions } from '../../../store/registerRoom';
import { getLocationAPI } from '../../../lib/api/map';
import RegisterRoomFooter from './RegisterRoomFooter';

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
    margin-bottom: 24px;
  }

  .register-room-location-button-wrapper {
    width: 300px;
    margin-bottom: 24px;
  }

  .register-room-location-selector-wrapper {
    width: 385px;
    margin-bottom: 24px;
  }

  .register-room-location-input-wrapper {
    width: 500px;
    margin-bottom: 24px;
  }

  .register-room-location-input {
    margin-bottom: 24px;
  }
`

const RegisterLocation: React.FC = () => {
  const country = useSelector((state) => state.registerRoom.country)
  const state = useSelector((state) => state.registerRoom.state)
  const city = useSelector((state) => state.registerRoom.city)
  const streetAddress = useSelector((state) => state.registerRoom.street_address)
  const detailAddress = useSelector((state) => state.registerRoom.detail_address)
  const postcode = useSelector((state) => state.registerRoom.postcode)

  // 현재 주소 불러오기 로딩
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  // 나라 변경 시
  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCountry(event.target.value))
  }

  // 시/도 변경 시
  const onChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setState(event.target.value))
  }

  // 시/군/구 변경 시
  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(event.target.value))
  }

  // 도로명 주소 변경 시
  const onChangeStreetAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setStreetAddress(event.target.value))
  }

  // 동호수 변경 시
  const onChangeDetailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDetailAddress(event.target.value))
  }

  // 우편번호 변경 시
  const onChangePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostcode(event.target.value))
  }

  // 현재 위치 불러오기에 성공했을 때
  const onSuccessGetLocation = async ({ coords }: any) => {
    try {
      const { data } = await getLocationAPI({ latitude: coords.latitude, longitude: coords.longitude })
      const address_components = data.results[0].address_components
      const geometry_location = data.results[0].geometry.location
      dispatch(registerRoomActions.setCountry(address_components[6].long_name))
      dispatch(registerRoomActions.setState(address_components[5].long_name))
      dispatch(registerRoomActions.setCity(address_components[4].long_name))
      dispatch(registerRoomActions.setStreetAddress(`${address_components[3].long_name} ${address_components[2].long_name}`))
      dispatch(registerRoomActions.setPostcode(address_components[7].long_name))
      dispatch(registerRoomActions.setLatitude(geometry_location.lat))
      dispatch(registerRoomActions.setLongitude(geometry_location.lng))
    } catch (e) {
      console.log(e)
      alert(e)
    }
    setLoading(false)
  }

  // 현재 위치 사용 클릭 시
  const onClickGetCurrentLocation = () => {
    setLoading(true)
    // getCurrentPosition 첫번째 성공시, 두번째 실패시
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {console.log(e); alert(e?.message)})
  }

  return (
    <Container>
      <h2>Would you let me know the location of accommdation</h2>
      <h3>The fourth Step</h3>
      <p className='register-room-step-info'>
        the exect accommodation address will be revealed to guest after the guests has made a reservation completely.
      </p>
      <div className='register-room-location-button-wrapper'>
        <Button
          color='dark_cyan'
          colorReverse
          icon={<NavigatorIcon />}
          onClick={onClickGetCurrentLocation}
        >
          {loading ? 'Loading...' : 'Use currunt location.'}
        </Button>
      </div>
      <div className='register-room-location-selector-wrapper'>
        <Selector
          type='register'
          options={countryList}
          useValidation={false}
          defaultValue='Select country/state'
          disabledOptions={['Select country/state']}
          value={country || undefined}
          onChange={onChangeCountry}
        />
      </div>
      <div className='register-room-location-input-wrapper'>
        <div className='register-room-location-input'>
          <Input label='State' value={state} isValid={true} onChange={onChangeState} />
        </div>
        <div className='register-room-location-input'>
          <Input label='City' value={city} isValid={true} onChange={onChangeCity} />
        </div>
        <div className='register-room-location-input'>
          <Input label='Street' value={streetAddress} isValid={true} onChange={onChangeStreetAddress}/>
        </div>
        <div className='register-room-location-input'>
          <Input label='Detail' useValidation={false} value={detailAddress} isValid={true} onChange={onChangeDetailAddress} />
        </div>
        <div className='register-room-location-input'>
          <Input label='Postcode' value={postcode} isValid={true} onChange={onChangePostcode} />
        </div>
      </div>
      <RegisterRoomFooter
        preHref='/room/register/bathroom'
        nextHref='/room/register/geometry'
      />
    </Container>
  )
}

export default RegisterLocation
