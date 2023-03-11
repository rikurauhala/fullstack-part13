const errorHandler = (error, request, response, next) => {
  console.error(error.name)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted id' })
  } 
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeValidationError') {
    if (error.message.includes('isEmail')) {
      return response.status(400).json({ error: 'Username must be a valid email address' })
    }
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({ error: 'Username must be unique' })
  }

  next(error)
}

module.exports = {
  errorHandler
}
