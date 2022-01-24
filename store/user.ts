import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../types/user'
import { SignInState } from '../types/reduxState'
import { getLocalIdToken } from '../lib/utils'

// 초기 상태
const initialState: SignInState = {
  id: 0,
  email: "",
  firstname: "",
  lastname: "",
  birthday: "",
  status: "",
  access: "",
  isLogged: false,
  access_token: ""
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 로그인한 유저 변경하기
    setLoggedUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true, access_token: getLocalIdToken() }
      return state
    },
    // 로그아웃 하기
    initUser(state) {
      state = initialState
      return state
    }
  },
})

export const userActions = { ...user.actions }
