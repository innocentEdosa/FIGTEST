const responseHandler = (res, statusCode, message, data) =>
  res.status(statusCode).json({
    message,
    data,
  })

export default responseHandler
