import express from 'express'
import * as UserController from '../controller/user.controller'
import {
  userValidator,
  validationResultHandler,
} from '../middlewares/validator.middleware'

const router = express.Router()

/* Create users listing. */
router.post(
  '/signup',
  userValidator('createUser'),
  validationResultHandler,
  UserController.createUser
)
router.post(
  '/login',
  userValidator('loginUser'),
  validationResultHandler,
  UserController.login
)

export default router
