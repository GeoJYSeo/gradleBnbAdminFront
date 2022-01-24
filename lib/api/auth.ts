import axios from '.'

// 회원가입 body
interface SignUpAPIBody {
  transaction_time: Date
  data: {
    email: string
    firstname: string
    lastname: string
    password: string
    birthday: string
  }
}

// 로그인 body
interface SignInAPIBody {
  email: string
  password: string
}

// 회원가입 api
export const signupAPI = (body: SignUpAPIBody) => axios.post('/api/user', body)

// 로그인 api
export const signinAPI = (body: SignInAPIBody) => axios.post('/api/session', body)

// 로그아웃 api
export const logoutAPI = () => axios.delete('/api/session')
