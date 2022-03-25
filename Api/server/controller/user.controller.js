import responseHandler from '../utils/responseHandler'
import { signUpUser, loginUser } from '../utils/user.util'

export const createUser = async (req, res, next) => {
  try {
    const user = await signUpUser(req.body, res)
    return responseHandler(res, 201, 'successful', user)
  } catch (e) {
    next(e)
  }
}

export const login = async (req, res, next) => {
  try {
    const response = await loginUser(req.body, res);
    return responseHandler(res, 200, "login successful", response);
  } catch (e) {
    next(e);
  }
}