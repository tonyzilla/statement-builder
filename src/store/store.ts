import { configureStore } from '@reduxjs/toolkit';
import statmentReducer from 'Store/statement/statement.slice';
// ...

export const store = configureStore({
  reducer: {
    statement: statmentReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch