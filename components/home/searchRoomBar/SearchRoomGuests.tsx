import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../../store";
import { searchRoomActions } from "../../../store/searchRoom";
import palette from "../../../styles/palette";
import Counter from "../../common/Counter";
import SearchRoomButton from "./SearchRoomButton";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }

  > div {
    width: 100%;
    height: 100%;
  }

  .search-room-bar-guests-texts {
    position: absolute;
    width: calc(100% - 114px);
    top: 16px;
    left: 20px;
  }

  .search-room-bar-guests-label {
    font-size: 10px;
    font-weight: 800;
    margin-bottom: 4px;
  }

  .search-room-bar-guests-text {
    font-size: 10px;
    font-weight: 600;
    opacity: 0.5;
  }

  .search-room-bar-guests-popup {
    position: absolute;
    width: 394px;
    top: 78px;
    right: 0;
    padding: 16px 32px;
    background-color: white;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
    cursor: default;
  }

  .search-room-bar-guests-counter-wrapper {
    padding: 16px 0;
    border-bottom: 1px solid ${palette.gray_eb};
    &:last-child {
      border: 0;
    }
  }

  .search-room-bar-guest-text {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-room-bar-button-wrapper {
    position: absolute;
    right: 0;
    top: 12px;
    right: 12px;
  }
`

const SearchRoomGuests: React.FC = () => {
  const [popupOpened, setPopupOpened] = useState(false)

  const adultCount = useSelector((state) => state.searchRoom.adultsCount)
  const childrenCount = useSelector((state) => state.searchRoom.childrenCount)
  const infantsCount = useSelector((state) => state.searchRoom.infantsCount)

  const dispatch = useDispatch();

  // 성인 수 변경하기
  const setAdultCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setAdultsCount(value))
  }

  // 어린이 수 변경하기
  const setChildrenCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setChildrenCount(value))
  }

  // 유아 수 변경하기
  const setInfantsCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setInfantsCount(value))
  }

  return (
    <Container onClick={() => setPopupOpened(true)}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className='search-room-bar-guests-texts'>
          <p className='search-room-bar-guests-label'>Guests</p>
          <p className='search-room-bar-guests-text'>Number</p>
        </div>

        <div className='search-room-bar-button-wrapper'>
          <SearchRoomButton />
        </div>
        {popupOpened && (
          <div className='search-room-bar-guests-popup'>
            <div className='search-room-bar-guests-counter-wrapper'>
              <Counter
                label='Adult'
                description='Over 12-year-old'
                minValue={1}
                value={adultCount}
                onChange={(count) => setAdultCountDispatch(count)}
              />
            </div>
            <div className='search-room-bar-guests-counter-wrapper'>
              <Counter
                label='Children'
                description='2~11-year-old'
                minValue={0}
                value={childrenCount}
                onChange={(count) => setChildrenCountDispatch(count)}
              />
            </div>
            <div className='search-room-bar-guests-counter-wrapper'>
              <Counter
                label='Infants'
                description='Under 1-year-old'
                minValue={0}
                value={infantsCount}
                onChange={(count) => setInfantsCountDispatch(count)}
              />
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </Container>
  )
}

export default SearchRoomGuests
