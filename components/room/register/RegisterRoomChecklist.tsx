import { isEmpty } from "lodash";
import { useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import RegisterRoomCheckStep from "./RegisterRoomCheckStep";
import RegisterRoomFooter from "./RegisterRoomFooter";
import RegisterRoomSubmitFooter from "./RegisterRoomSubmitFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;

  .register-room-checklist-info {
    margin-bottom: 39px;
  }

  ul {
    display: inline-flex;
    flex-direction: column;
  }
`

const RegisterRoomChecklist: React.FC = () => {
  const registerRoom = useSelector((state) => state.registerRoom)

  // 숙소 유형이 활성화됐는지
  const isBuildingTypeActived = useMemo(() => {
    const { large_building_type, building_type, room_type, is_set_up_for_guest } = registerRoom

    if (!large_building_type || !building_type || !room_type || is_set_up_for_guest === null) {
      return false
    }
    return true
  }, [])

  // 숙소 종류가 활성화됐는지
  const isRoomTypeActived = useMemo(() => {
    const { maximum_guest_count, bedroom_count } = registerRoom
    
    if (!isBuildingTypeActived || !maximum_guest_count || !bedroom_count) {
      return false
    }
    return true
  }, [])

  // 욕실 항목이 활성화됐는지
  const isBathroomActived = useMemo(() => {
    const { bathroom_count, bathroom_type } = registerRoom

    if (!isRoomTypeActived || !bathroom_count || !bathroom_type === null) {
      return false
    }
    return true
  }, [])

  // 위치 항목이 활성화됐는지
  const isLocationActived = useMemo(() => {
    const { latitude, longitude, country, state, city, street_address, detail_address, postcode } = registerRoom

    if (!isBathroomActived || !latitude || !longitude || !country || !state || !city || !street_address || !detail_address || !postcode) {
      return false
    }
    return true
  }, [])

  //편의 시설이 활성화됐는지
  const isAmenitiesActived = useMemo(() => {
    const { amenities } = registerRoom

    if (!isLocationActived && isEmpty(amenities)) {
      return false
    }
    return true
  }, [])

  // 공용공간이 활성화됐는지
  const isConveniencesActived = useMemo(() => {
    const { conveniences } = registerRoom

    if(!isAmenitiesActived && isEmpty(conveniences)) {
      return false
    }
    return true
  }, [])

  // 사진 항목이 다 채워져 있는지
  const isPhotosActived = useMemo(() => {
    const { photos } = registerRoom

    if (!isConveniencesActived || isEmpty(photos)) {
      return false
    }
    return true
  }, [])

  // 숙소 설명이 다 채워져 있는지
  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom
    if (!isPhotosActived || !description) {
      return false
    }
    return true
  }, [])

  // 숙소 제목이 다 채워져 있는지
  const isTitleActived = useMemo(() => {
    const { title } = registerRoom

    if (!isDescriptionActived || !title) {
      return false
    }
    return true
  }, [])

  // 숙소 금액이 채워져 있는지
  const isPriceActived = useMemo(() => {
    const { price } = registerRoom

    if (!isTitleActived || !price) {
      return false
    }
    return true
  }, [])

  // 예약 날짜가 채워져 있는지
  const isDateActived = useMemo(() => {
    const { start_date, end_date } = registerRoom

    if (!isPriceActived || !start_date || !end_date) {
      return false
    }
    return true
  }, [])

  // 진행 중인 단계
  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActived) {
      return 'building'
    }

    if (!isRoomTypeActived) {
      return 'bedrooms'
    }

    if (!isBathroomActived) {
      return 'bathroom'
    }

    if (!isLocationActived) {
      return 'location'
    }

    if (!isAmenitiesActived) {
      return 'amenities'
    }

    if (!isConveniencesActived) {
      return 'conveniences'
    }

    if (!isPhotosActived) {
      return 'photos'
    }

    if (!isDescriptionActived) {
      return 'description'
    }

    if (!isTitleActived) {
      return 'title'
    }

    if(!isPriceActived) {
      return 'price'
    }

    if (!isDateActived) {
      return 'date'
    }
    return ''
  }, [])

  return (
    <Container>
      <p className='register-room-checklist-info'>
        The accommodation can be modified at any time after registering it.
      </p>
      <ul>
        <li>The accommodation type</li>
        <RegisterRoomCheckStep
          step='Accommodation Type'
          href='/room/register/building'
          disabled={!isBuildingTypeActived}
          inProgress={stepInProgress === 'building'}
        />
        <RegisterRoomCheckStep
          step='Bedroom Type'
          href='/room/register/bedrooms'
          disabled={!isRoomTypeActived}
          inProgress={stepInProgress === 'bedrooms'}
        />
        <RegisterRoomCheckStep
          step='Bathroom'
          href='/room/register/bathroom'
          disabled={!isBathroomActived}
          inProgress={stepInProgress === 'bathroom'}
        />
        <RegisterRoomCheckStep
          step='Location'
          href='/room/register/location'
          disabled={!isLocationActived}
          inProgress={stepInProgress === 'location'}
        />
        <RegisterRoomCheckStep
          step='Amenities'
          href='/room/register/amenities'
          disabled={!isAmenitiesActived}
          inProgress={stepInProgress === 'amenities'}
        />
        <RegisterRoomCheckStep
          step='Conveniences'
          href='/room/register/conveniences'
          disabled={!isConveniencesActived}
          inProgress={stepInProgress === 'conveniences'}
        />
        <RegisterRoomCheckStep
          step='Photos'
          href='/room/register/photos'
          disabled={!isPhotosActived}
          inProgress={stepInProgress === 'photos'}
        />
        <RegisterRoomCheckStep
          step='Description'
          href='/room/register/description'
          disabled={!isDescriptionActived}
          inProgress={stepInProgress === 'description'}
        />
        <RegisterRoomCheckStep
          step='Title'
          href='/room/register/title'
          disabled={!isTitleActived}
          inProgress={stepInProgress === 'title'}
        />
        <RegisterRoomCheckStep
          step='Price'
          href='/room/register/price'
          disabled={!isPriceActived}
          inProgress={stepInProgress === 'price'}
        />
      </ul>
      {isDateActived ? (
        <RegisterRoomSubmitFooter />
      ) : (
        <RegisterRoomFooter
          preHref='/room/register/date'
          nextHref={`/room/register/${stepInProgress}`}
        />
      )}
    </Container>
  )
}

export default RegisterRoomChecklist
