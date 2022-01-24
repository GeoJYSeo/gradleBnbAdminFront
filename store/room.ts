// 초기 상태

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "../types/reduxState";
import { RoomType } from "../types/room";

// initial state
const initialState: RoomState = {
  rooms: [],
  detail: null
}

const room = createSlice({
  name: 'room',
  initialState,
  reducers: {
    // 상세 숙소 변경하기
    setDetailRoom(state, action: PayloadAction<RoomType>) {
      state.detail = action.payload
    }
  }
})

export const roomActions = { ...room.actions }

export default room;
