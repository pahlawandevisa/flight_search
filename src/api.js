let express = require('express')
let router = express.Router()

router.get('/airlines', (req, res) => {
  res.json({
      'airline': 'test',
  })
})

router.get('/airports', (req, res) => {
  res.json({
      'airports': 'test',
  })
})

router.get('/search', (req, res) => {
  res.json({
      'search': 'test',
  })
})

module.exports = router
