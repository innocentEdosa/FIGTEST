import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    schema: { type: Number },
    interests: { type: [String] },
    views: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    totalEvents: { type: Number },
  },
  { timestamps: true }
)

UserSchema.pre('save', function (next) {
  const user = this

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) {
        return next(saltError)
      }
      return bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) {
          return next(hashError)
        }

        user.password = hash
        return next()
      })
    })
  } else {
    return next()
  }
  return null
})

const User = mongoose.model('User', UserSchema)

export default User
