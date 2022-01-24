import axios from '.'

// 회원 정보 취득
export const getUserInfo = (email: string) => axios.get('/api/user', { params: { email } })
