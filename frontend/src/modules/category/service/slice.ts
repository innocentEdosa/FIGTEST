import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as categoryService from '.'

type InitialStateProps = {
  categories: { _id: string; title: string }[] | null
  isError: boolean
  isSuccess: boolean
  isGettingCategories: boolean
}

const initialState: InitialStateProps = {
  categories: [],
  isError: false,
  isSuccess: false,
  isGettingCategories: false,
}

export const getCategories = createAsyncThunk(
  '/category',
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories()
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

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isGettingCategories = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isGettingCategories = false
        state.isSuccess = true
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isGettingCategories = false
        state.isError = true
        state.categories = null
      })
  },
})

export default categorySlice.reducer
