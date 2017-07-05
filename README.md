# Flight search

[![Build Status](https://travis-ci.org/hoangnd25/flight_search.svg?branch=master)](https://travis-ci.org/hoangnd25/flight_search)

The following decisions are made in order to keep this project simple:

- Use jQuery to manipulate dom & handle API call for frontend.
- Not use any bundler/build system (e.g: webpack, gulp) for frontend assets.
- Backend code is placed in the `src/` folder instead of seperating it into `controllers/`, `models/`, etc.
- Simple test cases only cover backend API.

## Usage

### Start the project

Use the provided `start.sh` script to install dependencies and start web server.
Or simple install dependencies with `npm install` and start server with `npm start`

Then the project is accessible via this link: [http://localhost:3000](http://localhost:3000)

### Run test cases 

Run this command to execute test cases:
`npm test` or `yarn test`

The project is tested with node v8 locally, v6 & v7 via travis. Follow this link to checkout travis build logs: [https://travis-ci.org/hoangnd25/flight_search](https://travis-ci.org/hoangnd25/flight_search)

## Source code structure

- `public/` : static frontend files
- `src/` : backend code
- `src/tests/` : test cases for backend

## Backend API

### GET: `/api/airlines`

Reponse:

    [
        {
            "code": "QF",
            "name": "Qantas"
        },
        {
            "code": "SQ",
            "name": "Singapore Airlines"
        }
    ]

### GET: `/api/airports?q={query}`

Required param:
- query: `string` (must contains at least 2 letters)

Reponse:

    [
        {
            "id": "MLB",
            "name": "Melbourne International Arpt",
            "city": "Melbourne",
            "country": "United States"
        },
        {
            "id": "MEL",
            "name": "Tullamarine Arpt",
            "city": "Melbourne",
            "country": "Australia"
        }
    ]


### GET: `/api/search?from={from}&to={to}&date={date}`

Required params:
- from: `string` (3 letters airport id)
- to: `string` (3 letters airport id)
- date: `string` (formated Date string: ISO 8061)

Response:

    [  
        {  
            "airline": "Aeroflot",
            "flight": "SU270",
            "depart": "2017-07-05T12:30:00-04:00",
            "arrive": "2017-07-06T21:21:00+10:00",
            "distance": 15086,
            "durationMin": 1131,
            "price": 6306.68
        },
        {  
            "airline": "Aeroflot",
            "flight": "SU923",
            "depart": "2017-07-05T19:49:00-04:00",
            "arrive": "2017-07-07T04:40:00+10:00",
            "distance": 15086,
            "durationMin": 1131,
            "price": 6675.31
        }
    ]
