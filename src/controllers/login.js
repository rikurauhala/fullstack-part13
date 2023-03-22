const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')

const Session = require('../models/session')
const User = require('../models/user')

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: { username: req.body.username }
  })

  const passwordCorrect = req.body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.destroy({
    where: { userId: user.id }
  })

  await Session.create({
    userId: user.id,
    token: token,
  })

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router
