
'use strict'

let express = require('express')
let path = require('path')
let indexFile = path.join(__dirname, '../public/index.html')
let apiRoutes = require('./api')

// App
let app = express()

// serve static html
app.get((req, res) => res.sendFile(indexFile))

// serve static assets
app.use(express.static('public'))

// api routes
app.use('/api', apiRoutes)

// api routes
app.use((req, res) => res.status(404).send('Not Found'))

app.listen(3000, () => console.log('Application started!'))

module.exports = app