let request = require('request-promise')

const BASE_URI = 'http://node.locomote.com/code-task'

let createRequest = uri => request({
    uri: BASE_URI + uri,
    json: true
})

let data = {
    getAirlines: () => createRequest('/airlines'),
    getAirports: (query) => createRequest('/airports?q=' + encodeURIComponent(query)),
    getFlights: (airlineCode, date, from, to) => createRequest(
        '/flight_search/' + encodeURIComponent(airlineCode) + 
        '?date=' + encodeURIComponent(date) +
        '&from=' + encodeURIComponent(from) +
        '&to=' + encodeURIComponent(to)
    )
}

module.exports = data