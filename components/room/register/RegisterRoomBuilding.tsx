import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { constant } from "../../../lib/constant";
import { largeBuildingTypeList } from "../../../lib/staticData";
import { firstStepInRegistration } from "../../../lib/validation";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import RadioGroup from "../../common/RadioGroup";
import Selector from "../../common/Selector";
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

  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }

  .register-room-room-type-radio {
    max-width: 485px;
    margin-bottom: 50px;
  }

  .register-room-is-setup-for-guest-radio {
    margin-bottom: 50px;
  }
`

// 선택 불가능한 큰 범위 건물 유형
const DISABLED_LARGE_BUILDING_TYPE_OPTIONS_TEXT = 'Please Select one.'

const RegisterRoomBuilding: React.FC = () => {
  const largeBuildingType = useSelector((state) => state.registerRoom.large_building_type)
  const buildingType = useSelector((state) => state.registerRoom.building_type)
  const roomType = useSelector((state) => state.registerRoom.room_type)
  const isSetUpForGuest = useSelector((state) => state.registerRoom.is_set_up_for_guest)
  
  const dispatch = useDispatch()

  const onChangeLargeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setLargeBuildingType(event.target.value))
  }

  const onChangeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBuildingType(event.target.value))
  }

  const onChangeRoomType = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setRoomType(event as unknown as 'entire' | 'private' | 'public'))
  }

  const onChangeIsSetUpForGuest = (value: any) => {
    dispatch(registerRoomActions.setIsSetUpForGuest(value))
  }

  // 선택된 건물 유형 options
  // selected building type options
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case 'Apartment': {
        const { apartmentBuildingTypeList } = require('../../../lib/staticData')
        return apartmentBuildingTypeList
      }
      case 'House': {
        const { houseBuildingTypeList } = require('../../../lib/staticData')
        return houseBuildingTypeList
      }
      case 'Secondary Unit': {
        const { secondaryUnitBuildingTypeList } = require('../../../lib/staticData')
        return secondaryUnitBuildingTypeList
      }
      case 'Unique Space': {
        const { uniqueSpaceBuildingTypeList } = require('../../../lib/staticData')
        return uniqueSpaceBuildingTypeList
      }
      case 'B&B': {
        const { bnbBuildingTypeList } = require('../../../lib/staticData')
        return bnbBuildingTypeList
      }
      case 'Boutique Hotel': {
        const { boutiqueHotelBuildingTypeList } = require('../../../lib/staticData')
        return boutiqueHotelBuildingTypeList
      }
      default:
        return []
    }
  }, [largeBuildingType])

  return (
    <Container>
      <h2>What type of an accommodation are you going to register for?</h2>
      <h3>The first step</h3>
      <div className='register-room-building-selector-wrapper'>
        <Selector
          type='register'
          value={largeBuildingType || DISABLED_LARGE_BUILDING_TYPE_OPTIONS_TEXT}
          disabledOptions={[DISABLED_LARGE_BUILDING_TYPE_OPTIONS_TEXT]}
          label="Let's narrow it down."
          isValid={!!largeBuildingType}
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
        />
      </div>
      {largeBuildingType && (
        <div className='register-room-building-selector-wrapper'>
          <Selector
            type='register'
            options={detailBuildingOptions}
            value={buildingType || undefined}
            disabled={!largeBuildingType}
            label='Please select an accommdation type.'
            isValid={!!buildingType}
            onChange={onChangeBuildingType}
          />
        </div>
      )}
      {buildingType && (
        <>
          <div className='register-room-room-type-radio'>
            <RadioGroup
              value={roomType}
              label='Please Select a room Type.'
              isValid={!!roomType}
              options={constant.ROOM_REGISTER_ITEMS.ROOM_TYPE_RADIO_OPTIONS}
              onChange={onChangeRoomType}
            />
          </div>
          <div className='register-room-is-setup-for-guest-radio'>
            <RadioGroup
              value={isSetUpForGuest}
              label='Is this accommodation for only the guests?'
              isValid={isSetUpForGuest !== null}
              options={constant.ROOM_REGISTER_ITEMS.IS_SET_UP_FOR_GUEST_OPTIONS}
              onChange={onChangeIsSetUpForGuest}
            />
          </div>
        </>
      )}
      <RegisterRoomFooter
        isValid={firstStepInRegistration({ largeBuildingType, buildingType, roomType, isSetUpForGuest })}
        preHref='/'
        nextHref='/room/register/bedrooms'
      />
    </Container>
  )
}

export default RegisterRoomBuilding
