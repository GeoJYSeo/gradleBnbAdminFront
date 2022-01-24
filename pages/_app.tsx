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

const MyApp = ({ Component, pageProps }: AppProps) => {

  const [isLoading, setIsLoading] = useState(false)
  
  // const [mount, setMount] = useState(false)
  //  useEffect(() => {
  //    setMount(true)
  //  }, [])

  const dispatch = useDispatch()

  const keepLogin = async (email: string) => {
    if (getLocalIdToken() && !!email) {
      const { data } = await getUserInfo(email)
      dispatch(userActions.setLoggedUser(data.data))
    }
    setIsLoading(true)
  }

  const getRoom = async (email: string) => {
    const { data } = await getRoomAPI(email)
    dispatch(roomActions.setDetailRoom(data.data[0]))
  }
  
  useEffect(() => {
    const email = getEmailFromJwt()
    keepLogin(email)
    getRoom(email)
  }, [])


  return isLoading && (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  )
}

export default wrapper.withRedux(MyApp)
