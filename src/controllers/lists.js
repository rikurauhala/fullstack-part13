const router = require('express').Router()

const List = require('../models/list')
const tokenExtractor = require('../utils/tokens')

router.get('/', async (req, res) => {
  const lists = await List.findAll({})
  res.json(lists)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const { read } = req.body
  const currentId = req.decodedToken.id

  const list = await List.findOne({ where: { id: req.params.id } })
  const listUserId = list.toJSON().userId

  if (currentId === listUserId) {
    const updatedList = await List.update({ read: read }, { where: { id: req.params.id }})
    res.json(updatedList)
  } else {
    res.status(403).json({ error: 'You cannot update this list' })
  }
})

router.post('/', async (req, res) => {
  const list = await List.create(req.body)
  res.json(list)
})

module.exports = router
