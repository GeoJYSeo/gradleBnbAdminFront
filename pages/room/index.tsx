import { NextPage } from 'next'
import RoomMain from '../../components/main/RoomMain'
import { getRoomAPI } from '../../lib/api/room'
import { roomActions } from '../../store/room'

const index: NextPage = () => {
  return <RoomMain />
}

index.getInitialProps = async ({ query }) => {
  console.log(query)

  return {}
}

index.getInitialProps = async (ctx: any) => {
  const { email } = ctx.query
  const { store } = ctx
  
  console.log('-----------------------------------------')
  console.log(email)
  console.log('-----------------------------------------')
  try {
    if (email) {
      // const { data } = await getRoomAPI(String(email))
      // store.dispatch(roomActions.setDetailRoom(data))
    }
  } catch (e) {
    console.log(e)
  }
  return {}
}

export default index
