import mongoose from 'mongoose'

const { Schema } = mongoose

const EventSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 400 },
    schema: { type: Number },
    date: { type: Date },
    isVirtual: { type: Boolean, default: false },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model('Event', EventSchema)

export default Event
