// 초기 상태

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState } from "../types/reduxState";
import { allRoomType } from "../types/room";

// initial state
const initialState: RoomState = {
  roomList: []
}

const room = createSlice({
  name: 'room',
  initialState,
  reducers: {
    // 상세 숙소 변경하기
    setRoomList(state, action: PayloadAction<allRoomType[]>) {
      state.roomList = action.payload
    }
  }
})

export const roomActions = { ...room.actions }

export default room;
