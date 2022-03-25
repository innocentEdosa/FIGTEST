import axios from 'axios'

const GET_EVENTS_URL = `${process.env.REACT_APP_API_URL}/events`

export const getEvents = async (query: {
  page: number | string
  perPage: number
  search?: string
}) => {
  const { page, perPage, search } = query
  const searchParams = search ? `&search=${search}` : ''
  const response = await axios.get(
    `${GET_EVENTS_URL}?perPage=${perPage}&page=${page}${searchParams}`
  )
  return response.data.data
}

export const getEvent = async (eventId: string) => {
  const response = await axios.get(`${GET_EVENTS_URL}/${eventId}`)
  return response.data.data
}
