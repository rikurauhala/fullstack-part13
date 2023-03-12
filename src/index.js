const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const authorsRouter = require('./controllers/authors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

const middleware = require('./utils/middleware')

app.use(express.json())

app.use('/api/authors', authorsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

app.use(middleware.errorHandler)

start()
