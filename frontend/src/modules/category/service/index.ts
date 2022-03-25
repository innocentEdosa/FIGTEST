import axios from 'axios'

const CATEGORIES_URL = `${process.env.REACT_APP_API_URL}/category`

export const getCategories = async () => {
  const response = await axios.get(CATEGORIES_URL)
  return response.data.data
}
