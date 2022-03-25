import responseHandler from '../utils/responseHandler'
import { retrieveEvents, retrieveEvent } from '../utils/event.util'

export const getEvents = async (req, res, next) => {
  try {
    const response = await retrieveEvents(req.query)
    return responseHandler(res, 200, 'success', response)
  } catch (error) {
    next(error)
  }
}

export const getEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params
    const event = await retrieveEvent(res, eventId)
    return responseHandler(res, 200, 'success', event)
  } catch (error) {
    next(error)
  }
}
