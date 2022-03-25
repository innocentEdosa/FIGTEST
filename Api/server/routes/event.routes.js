import express from 'express'
import * as EventController from '../controller/event.controller'

const router = express.Router()

router.get('/', EventController.getEvents)
router.get('/:eventId', EventController.getEvent)

export default router
