import { isEmpty } from "lodash";
import { stringify } from "querystring";
import { useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useDebounce from "../../../hooks/useDebounce";
import { getPlaceAPI, searchPlacesAPI } from "../../../lib/api/map";
import { useSelector } from "../../../store";
import { searchRoomActions } from "../../../store/searchRoom";
import palette from "../../../styles/palette";

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

  .search-room-bar-location-texts {
    position: absolute;
    width: calc(100% - 40px);
    top: 16px;
    left: 20px;

    .search-room-bar-location-label {
      font-size: 10px;
      font-weight: 800;
      margin-bottom: 4px;
    }

    input {
      width: 100%;
      border: 0;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &::placeholder {
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }

  .search-room-bar-location-results {
    position: absolute;
    background-color: white;
    top: 78px;
    width: 500px;
    padding: 16px 0;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: pointer;
    overflow: hidden;
    z-index: 10;

    li {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 8px 32px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`

const SearchRoomBarLocation: React.FC = () => {
  const [popupOpened, setPopupOpened] = useState(false)

  // 검색 결과
  const [results, setResults] = useState<{ description: string; place_id: string; }[]>([])

  // 클릭시 인풋 포커스
  const inputRef = useRef<HTMLInputElement | null>(null)

  const location = useSelector((state) => state.searchRoom.location)
  const searchKeyword = useDebounce(location, 150)

  const dispach = useDispatch()

  // 위치 변경
  const setLocationDispatch = (value: string) => {
    dispach(searchRoomActions.setLocation(value))
  }

  // 위도 변경
  const setLatitudeDispatch = (value: number) => {
    dispach(searchRoomActions.setLatitude(value))
  }

  // 경도 변경
  const setLongitudeDispatch = (value: number) => {
    dispach(searchRoomActions.setLongitude(value))
  }

  // 근처 추천 장소 클릭 시
  const onClickNearPlaces = () => {
    setPopupOpened(false)
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocationDispatch("Recommanded places nearby")
      setLatitudeDispatch(coords.latitude)
      setLongitudeDispatch(coords.longitude)
    }, (e) => {
      console.log(e)
    })
  }

  // 검색된 장소 클릭 시
  const onClickResult = async (placeId: string) => {
    try {
      const { data } = await getPlaceAPI(placeId)
      console.log(data.results[0])
      setLocationDispatch(data.results[0].formatted_address)
      setLatitudeDispatch(data.reuslts[0].geometry.location.lat)
      setLatitudeDispatch(data.reuslts[0].geometry.location.lng)
    } catch (e) {
      console.log(e)
    }
  }

  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPopupOpened(true)
  }

  // 장소 검색하기
  const searchPlaces = async () => {
    try {
      const { data } = await searchPlacesAPI(location)
      setResults(data.predictions)
    } catch (e) {
      console.log(e)
    }
  } 

  useEffect(() => {
    if (!searchKeyword) {
      setResults([]);
    }
    if (searchKeyword) {
      // 장소 검색하기
      // search places
      searchPlaces()
    }
  }, [searchKeyword])

  return (
    <Container onClick={onClickInput}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className='search-room-bar-location-texts'>
          <p className='search-room-bar-location-label'>Number of Poeple</p>
          <input
            value={location}
            onChange={(e) => setLocationDispatch(e.target.value)}
            placeholder='Where are you going to travel?'
            ref={inputRef}
          />
        </div>
        {popupOpened && location !== 'Recommanded places nearby' && (
          <ul className='search-room-bar-location-results'>
            {!location && (<li role="presentation" onClick={onClickNearPlaces}>Recommanded places nearby</li>)}
            {!isEmpty(results) && results.map((result, index) => (
              <li 
                key={index}
                role="presentation"
                onClick={() => onClickResult(result.place_id)}
              >
                {result.description}
              </li>
            ))}
            {location && isEmpty(results) && <li>There is no result.</li>}
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  )
}

export default SearchRoomBarLocation
