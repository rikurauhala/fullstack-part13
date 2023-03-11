const errorHandler = (error, request, response, next) => {
  //console.error(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  } 
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === "SequelizeValidationError") {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    return response.status(400).json({ error: 'Username must be unique' })
  }

  next(error)
}

module.exports = {
  errorHandler
}
