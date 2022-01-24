import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useSelector } from '../../../store'
import palette from '../../../styles/palette'
import throttle from 'lodash/throttle'
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

  .register-room-geometry-map-wrapper {
    width: 900px;
    height: 600px;
    margin-top: 24px;

    > div {
      width: 100%;
      height: 100%;
    }
  }

  // 지도 위성 제거
  .gmnoprint .gm-style-mtc {
    display: none;
  }

  // 로드뷰 아이콘 제거
  .gm-svpc {
    display: none;
  }

  // 풀스크린 제거
  .gm-fullscreen-control {
    display: none;
  }
`

declare global {
  interface Window {
    initMap: () => void
  }
}

const RegisterRoomGeometry: React.FC = () => {
  const dispatch = useDispatch()

  // 구글 지도 script 불러오기
  const loadMapScript = () => {
    return new Promise<void>((resolve) => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`
      script.defer = true
      document.head.appendChild(script)
      script.onload = () => {
        resolve();
      }
    })
  }

  const mapRef = useRef<HTMLDivElement>(null)
  const latitude = useSelector((state) => state.registerRoom.latitude)
  const longitude = useSelector((state) => state.registerRoom.longitude)

  const loadMap = async () => {
    await loadMapScript()
  }

  window.initMap = () => {
    // 지도 불러오기
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        zoom: 14,
      })

      const marker = new window.google.maps.Marker({
        position: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        map,
      })

      // 지도를 드래그 했을때 바뀐 중앙 지점을 스토어에 설정
      map.addListener('center_changed', throttle(() => {
        const centerLat = map.getCenter().lat()
        const centerlng = map.getCenter().lng()
        marker.setPosition({ lat: centerLat, lng: centerlng });
        dispatch(registerRoomActions.setLatitude)
        dispatch(registerRoomActions.setLongitude)
      }, 150))
    }
  }

  useEffect(() => {
    loadMap()
  }, [])

  return (
    <Container>
      <h2>Is the pin placed in the correct?</h2>
      <h3>The fourth Step</h3>
      <p>If necessary, you can adjust it so that the pin is in exact place.</p>
      <div className='register-room-geometry-map-wrapper'>
        <div ref={mapRef} id='map' />
      </div>
      <RegisterRoomFooter
        preHref='/room/register/location'
        nextHref='/room/register/amenities'
      />
    </Container>
  )
}

export default RegisterRoomGeometry
