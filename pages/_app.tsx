import App, { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'
import Header from '../components/Header'
import { wrapper } from '../store'
import { useDispatch } from 'react-redux'
import { getEmailFromJwt, getLocalIdToken } from '../lib/utils'
import { userActions } from '../store/user'
import { getUserInfo } from '../lib/api/user'
import { useEffect, useState } from 'react'
import { getRoomAPI } from '../lib/api/room'
import { roomActions } from '../store/room'
import { registerRoomActions } from '../store/registerRoom'

const MyApp = ({ Component, pageProps }: AppProps) => {

  const [isLoading, setIsLoading] = useState(true)
  
  // const [mount, setMount] = useState(false)
  //  useEffect(() => {
  //    setMount(true)
  //  }, [])

  const dispatch = useDispatch()

  const keepLogin = async (email: string) => {
    const { data } = await getUserInfo(email)
    dispatch(userActions.setLoggedUser(data.data))
  }

  const getRoom = async (email: string) => {
    const { data } = await getRoomAPI(email)
    dispatch(registerRoomActions.setRegister(data.data[0]))
  }
  
  useEffect(() => {
    const email = getEmailFromJwt()

    if (getLocalIdToken() && !!email) {
      keepLogin(email)
      getRoom(email)
    }
    setIsLoading(false)
  }, [])

  return !isLoading && (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  )
}

export default wrapper.withRedux(MyApp)
