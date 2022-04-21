import { NextPage } from 'next'
import RoomMain from '../../components/room/main/RoomMain'


const index: NextPage = () => {
  return <RoomMain />
}

// index.getInitialProps = async (ctx: any) => {
//   try {

//       // store.dispatch(roomActions.setRoomList(data))
//       // console.log('-----------------------------------------')
//       // console.log(data)
//       // console.log('-----------------------------------------')
//       // return data.data[0]
//       return "asdf"
//   } catch (e) {
//     console.log(e)
//   }
// }

export default index
