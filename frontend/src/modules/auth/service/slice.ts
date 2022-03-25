import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as authServices from '.'

const user = JSON.parse(localStorage.getItem('user-token') as string)

const initialState = {
  user: user ? user : null,
  isAuthenticated: !!user,
  isLoggingIn: false,
  isSigningUp: false,
  isSignupError: '',
  isLoginError: '',
}

export const signUp = createAsyncThunk(
  '/user/signup',
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      return await authServices.signup(user)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk(
  '/user/login',
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      return await authServices.login(user)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isSigningUp = true
        state.isSignupError = ""
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSigningUp = false
        state.isAuthenticated = true
        state.user = action.payload.data
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSigningUp = false
        //@ts-ignore
        state.isSignupError = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true
        state.isLoginError = ""
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false
        state.isAuthenticated = true
        state.user = action.payload.data
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false
        //@ts-ignore
        state.isLoginError = action.payload
        state.user = null
      })
  },
})

export default authSlice.reducer
