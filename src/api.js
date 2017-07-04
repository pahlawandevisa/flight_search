let express = require('express')
let router = express.Router()

router.get('/airlines', (req, res) => {
  res.json([{
    "code": "SQ",
    "name": "Singapore Airlines"
  }])
})

router.get('/airports', (req, res) => {
  let query = req.query.q
  if (query === undefined || query.length < 2)
    return res.status(400).send('query must contain at least two letters');

  res.json([
    {
      "airportCode": "MEL",
      "airportName": "Tullamarine Arpt",
      "cityName": "Melbourne",
      "countryName": "Australia"
    }
  ])
})

router.get('/search/:code', (req, res) => {
  let code = req.params.code
  let {date, from, to} = req.query

  if (date === undefined || from === undefined || to === undefined)
    return res.status(400).send('date, from & to are required');

  res.json([
    {
      "depart": "2018-09-02T13:33:00+10:00",
      "arrive": "2018-09-02T19:34:00-04:00",
      "flight": "QF798",
      "distance": 16014,
      "durationMin": 1201,
      "price": 1859.01
    }
  ])
})

module.exports = router
