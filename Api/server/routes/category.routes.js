import express from 'express'
import * as CategoryController from '../controller/category.controller'

const router = express.Router()

router.get('/', CategoryController.getCategories)

export default router
