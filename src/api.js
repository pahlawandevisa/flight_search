let express = require('express')
let router = express.Router()
let dataService = require('./data')

router.get('/airlines', (req, res) => {
  dataService
    .getAirlines()
    .then(results => res.json(results))
    .catch(e => res.status(400).json({ success: false, message: e.message}))
})

router.get('/airports', (req, res) => {
  let query = req.query.q
  if (query === undefined || query.length < 2)
    return res.status(400).send('query must contain at least two letters');

  dataService
    .getAirports(query)
    .then(results => results)
    .map(airport => {
      let { airportCode, airportName, cityName, countryName } = airport;
      return { 
        id: airportCode, 
        name: airportName, 
        city: cityName, 
        country: countryName 
      }
    })
    .then(data => res.json(data))
    .catch(e => res.status(400).json({ success: false, message: e.message}))
})

router.get('/search', (req, res) => {
  let {date, from, to} = req.query

  if (date === undefined || from === undefined || to === undefined)
    return res.status(400).send('date, from & to are required');

  dataService
    .getAirlines()
    .then(airlines => airlines) 
    // load flights for each airline
    .map(airline => dataService.getFlights(airline.code, date, from, to))
    // process request in parallel
    .all(data => data)
    // flatten object
    .reduce((prev, cur) => prev.concat(cur), [])
    // format response
    .map(item => ({
      airline: item.airline.name,
      flight: item.airline.code + item.flightNum,
      depart: item.start.dateTime,
      arrive: item.finish.dateTime,
      distance: item.distance,
      durationMin: item.durationMin,
      price: item.price
    }))
    .then(data => res.json(data))
    .catch(e => res.status(400).json({ success: false, message: e.message}))
    
})

module.exports = router
