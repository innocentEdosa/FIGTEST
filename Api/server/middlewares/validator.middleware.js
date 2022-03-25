import { check, validationResult } from 'express-validator/check'

import {
  validateErrorMessages,
  passwordPattern,
} from '../utils/validationUtils'

export const userValidator = (method) => {
  switch (method) {
    case 'createUser':
      return [
        check('email', validateErrorMessages.email).isEmail(),

        check('password', validateErrorMessages.password)
          .not()
          .isEmpty()
          .matches(passwordPattern)
          .isLength({ min: 8 }),
      ]
    case 'loginUser':
      return [
        check('email', validateErrorMessages.email).isEmail(),

        check('password', 'Please provide your password').not().isEmpty(),
      ]

    default:
      return []
  }
}

export const validationResultHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
    return
  }
  next()
}
