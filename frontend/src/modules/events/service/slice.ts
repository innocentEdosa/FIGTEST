import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as eventServices from '.'

type EventType = {
  _id: string
  title: string
  description: string
  isVirtual: boolean
  address: string
  date: string
  category: {
    title: string
  }
}

type InputStateProps = {
  isGettingEvents: boolean
  isGettingSingleEvent: boolean
  activeEvent?: EventType
  isError: boolean
  isSuccess: boolean
  events: {
    events: EventType[]
    eventMetaData: {
      page: number
      perPage: number
      total: number
      totalPages: number
    }
  }
  error: any
}

const initialState: InputStateProps = {
  isGettingEvents: false,
  isGettingSingleEvent: false,
  activeEvent: undefined,
  isError: false,
  isSuccess: false,
  events: {
    events: [],
    eventMetaData: {
      page: 1,
      perPage: 0,
      total: 0,
      totalPages: 0,
    },
  },
  error: {},
}

export const getEvents = createAsyncThunk(
  '/events',
  async (
    query: { page: number | string; perPage: number; search?: string },
    thunkAPI
  ) => {
    try {
      return await eventServices.getEvents(query)
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

export const getEvent = createAsyncThunk(
  '/events/eventId',
  async (eventId: string, thunkAPI) => {
    try {
      return await eventServices.getEvent(eventId)
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

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isGettingEvents = true
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isGettingEvents = false
        state.isSuccess = true
        state.events.events = action.payload.events
        state.events.eventMetaData = action.payload.eventMetaData
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isGettingEvents = false
        state.isError = true
        state.isSuccess = false
        // @ts-ignore
        state.errors = action.payload
        state.events.events = []
      })
      .addCase(getEvent.pending, (state) => {
        state.isGettingSingleEvent = true
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.isGettingSingleEvent = false
        state.activeEvent = action.payload
      })
      .addCase(getEvent.rejected, (state) => {
        state.isGettingEvents = false
        state.activeEvent = undefined
      })
  },
})

export default eventSlice.reducer
