import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";

// initial state
const initialState: CommonState = {
  validateMode: false
}

export const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    // validateMode 변경하기
    setValidateMode(state, action: PayloadAction<boolean>) {
      state.validateMode = action.payload
    }
  }
})

export const commonActions = { ...common.actions }
