import Axios from 'axios'
import { getLocalIdToken } from '../utils'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `bearer ${getLocalIdToken()}`
  }
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('--------------')
    console.log(error)
    console.log('--------------')
    return Promise.reject(error)
  }
)

export default axios
