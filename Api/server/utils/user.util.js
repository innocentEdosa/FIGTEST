import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../database/models/user.model'

require('dotenv').config()

export const signUpUser = async (userData, res) => {
  try {
    const { email, password, interests } = userData
    let userInterests = interests.length ? interests : null
    const newUser = await new User({
      password,
      email,
      interests: userInterests,
      events: null,
      views: null,
    })

    await newUser.save()

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        interests: newUser.interests,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    return {
      user: {
        email: newUser.email,
        events: newUser.events,
        interest: newUser.interests,
      },
      token,
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(422)
      throw new Error('User already exists')
    } else throw new Error(error)
  }
}

export const loginUser = async (input, res) => {
  try {
    const { email, password } = input

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      res.status(400)
      throw new Error(
        'We cant find this user. Please check your email or password'
      )
    }

    const isPassword = bcrypt.compareSync(password, user.password)
    if (!isPassword) {
      res.status(400)
      throw new Error(
        'We cant find this user. Please check your email or password'
      )
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        interests: user.interests,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    return {
      user: {
        email: user.email,
        events: user.events,
        interest: user.interests,
      },
      token,
    }
  } catch (error) {
    throw new Error(error)
  }
}
