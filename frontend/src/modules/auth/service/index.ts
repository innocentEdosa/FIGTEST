import axios from 'axios'

const SIGNUP_URL = `${process.env.REACT_APP_API_URL}/users/signup`
const LOGIN_URL = `${process.env.REACT_APP_API_URL}/users/login`

export const signup = async (userData: { email: string; password: string }) => {
  const response = await axios.post(SIGNUP_URL, userData)
  if (response.data) {
    const { data } = response.data
    localStorage.setItem('user-token', JSON.stringify(data))
  }

  return response.data
}

export const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(LOGIN_URL, userData)
  if (response.data) {
    const { data } = response.data
    localStorage.setItem('user', JSON.stringify(data))
  }

  return response.data
}
