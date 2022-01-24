import Axios from 'axios'
import { getLocalIdToken } from '../utils'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `bearer ${getLocalIdToken()}`
  }
})

export default axios
