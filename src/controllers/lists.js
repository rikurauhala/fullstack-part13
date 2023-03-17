const router = require('express').Router()

const List = require('../models/list')

router.get('/', async (req, res) => {
  const lists = await List.findAll({})
  res.json(lists)
})

router.post('/', async (req, res) => {
  const list = await List.create(req.body)
  res.json(list)
})

module.exports = router
