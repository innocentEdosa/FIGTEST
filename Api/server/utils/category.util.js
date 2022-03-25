import Category from '../database/models/category.model'

export async function retrieveCategories() {
  try {
    return await Category.find().select('-createdAt -updatedAt')
  } catch (error) {
    throw new Error(error)
  }
}
