import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'Store/store';
import { v4 as uuid } from 'uuid';

// Define a type for the slice state
interface StatementState {
  id: String
}

// Define the initial state using that type
const initialState: StatementState = {
  id: null
}

export const statementSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    create: (state) => {
      state.id = uuid();
    },
  },
});

export const { create } = statementSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getId = (state: RootState) => state.statement.id;

export default statementSlice.reducer;