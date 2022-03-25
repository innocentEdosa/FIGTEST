import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import eventReducer from '../modules/events/service/slice'
import categoryReducer from '../modules/category/service/slice'
import authReducer from '../modules/auth/service/slice'

export const store = configureStore({
  reducer: {
    event: eventReducer,
    category: categoryReducer,
    auth: authReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
