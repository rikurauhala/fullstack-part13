const router = require('express').Router()

const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({
    where: { id },
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: ['id', 'author', 'title', 'url', 'likes', 'year'],
        through: {
          attributes: ['id', 'read'],
          as: 'reading_list',
        },
      },
    ],
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  if (user) {
    user.set(req.body)
    await user.save()
    res.json(user)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})

module.exports = router
