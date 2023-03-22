const errorHandler = (error, _req, res, next) => {
  console.error(error.name)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted id' })
  } 
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeValidationError') {
    if (error.message.includes('isEmail')) {
      return res.status(400).json({ error: 'Username must be a valid email address' })
    }
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Username must be unique' })
  }
  if (error.name === 'TypeError') {
    return res.status(404).json({ error: 'This blog does not exists' })
  }
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeEagerLoadingError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'ReferenceError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  errorHandler
}
