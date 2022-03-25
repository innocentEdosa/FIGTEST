import Event from '../database/models/event.model'
import Category from '../database/models/category.model'

export const retrieveEvent = async (res, eventId) => {
  try {
    const event = await Event.findById(eventId)
      .populate('category', 'title')
      .select('-createdAt -updatedAt')
    if (!event) {
      res.status(404)
      throw new Error('Cannot find Event')
    }

    return event
  } catch (error) {
    throw new Error(error)
  }
}

export const retrieveEvents = async (query) => {
  try {
    const { perPage, page, search } = query
    const limit = parseInt(perPage) || 10
    const currentPage = parseInt(page, 10) || 1
    let params = {}

    if (search) {
      params = { title: { $regex: `.*${search}.*` } }
    }

    const count = await Event.countDocuments(params)
    const events = await Event.find(params)
      .populate('category', { title: 1, _id: 0 })
      .limit(limit)
      .select('-createdAt -updatedAt -__v')
      .skip(limit * (currentPage - 1))
      .sort({ createdAt: -1 })

    return {
      events,
      eventMetaData: {
        perPage: limit,
        page: currentPage,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}
