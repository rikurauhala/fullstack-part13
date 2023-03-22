const router = require('express').Router()
const tokenExtractor = require('../utils/tokens')

const Session = require('../models/session')

router.delete('/', tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: { userId: req.decodedToken.id }
  })
  return res.status(200).json({ message: 'Successfully logged out!' })
})

module.exports = router
