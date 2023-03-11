const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Blog, User } = require('../models')
const { SECRET } = require('../utils/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'Invalid token' })
    }
  } else {
    return res.status(401).json({ error: 'Missing token' })
  }
  next()
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
    }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
  return res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.findByPk(req.params.id)
  if (user.id === blog.userId) {
    await blog.destroy()
    res.status(204).json('Blog deleted')
  } else {
    res.status(401).json({ error: 'Not authorized to delete this blog' })
  }
})

module.exports = router
