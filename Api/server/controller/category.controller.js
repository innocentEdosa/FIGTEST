import responseHandler from '../utils/responseHandler'
import { retrieveCategories } from '../utils/category.util'

export const getCategories = async (req, res, next) => {
  try {
    const response = await retrieveCategories(req.query)
    return responseHandler(res, 200, 'success', response)
  } catch (error) {
    next(error)
  }
}
