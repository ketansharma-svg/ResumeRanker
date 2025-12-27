"use client";
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../Store'

// Define a type for the slice state
interface CounterState {
  isOnline: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  isOnline: false,
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
     setIsOnline: (state, action: PayloadAction<boolean>) => {
       state.isOnline = action.payload
     }
  },
})

export const { setIsOnline } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectIsOnline = (state: RootState) => state.counter.isOnline

export default counterSlice.reducer