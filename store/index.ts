// 리덕스 wrapper, 커스텀 useSelector

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'
import auth from './auth';
import { common } from './common';
import registerRoom from './registerRoom';
import room from './room';
import searchRoom from './searchRoom';
import { user } from './user';

const rootReducer = combineReducers({
  user: user.reducer,
  common: common.reducer,
  auth: auth.reducer,
  registerRoom: registerRoom.reducer,
  searchRoom: searchRoom.reducer,
  room: room.reducer,
})

// 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>

let initialRootState: RootState

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload
      }
    }
    return state;
  }
  return rootReducer(state, action);
}

// 타입 지원하는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore = () => {
  const store = configureStore({
    reducer,
    devTools: true
  })
  initialRootState = store.getState();
  return store;
}

export const wrapper = createWrapper(initStore);
