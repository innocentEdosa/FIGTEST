import mongoose from 'mongoose'

const { Schema } = mongoose

const CategorySchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    schema: { type: Number },
  },
  {
    timestamps: true,
  }
)

const Category = mongoose.model('Category', CategorySchema)

export default Category
