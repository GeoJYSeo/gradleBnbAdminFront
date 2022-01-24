import { NextPage } from 'next'
import dynamic from 'next/dynamic'

// 서버 사이드 렌더링 하지 않고 import => window 사용 가능
const RegisterRoomGeometry = dynamic(import('../../../components/room/register/RegisterRoomGeometry'), { ssr: false })

const geometry: NextPage = () => {
  return <RegisterRoomGeometry />
}

export default geometry
