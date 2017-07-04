var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')

chai.should()
chai.use(chaiHttp);

describe('API', () => {

  describe('GET /airlines', () => {
    it('it should return success', (done) => {
      chai.request(server)
        .get('/api/airlines')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.map((item) => {
            item.should.have.all.keys(['code', 'name'])
          })
          done()
        })
    })
  })

  describe('GET /airports', () => {
    it('it should return success', (done) => {
      chai.request(server)
        .get('/api/airports?q=Melbourne')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.map((item) => {
            item.should.have.all.keys(['airportCode', 'airportName', 'cityName', 'countryName'])
          })
          done()
        })
    })

    it('it should fail if query contains less than 2 letters', (done) => {
      chai.request(server)
        .get('/api/airports?q=M')
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('it should fail if query is missing', (done) => {
      chai.request(server)
        .get('/api/airports')
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })

  describe('GET /search', () => {
    it('it should return success', (done) => {
      chai.request(server)
        .get('/api/search?date=2018-09-02&from=SYD&to=JFK')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.map((item) => {
            item.should.have.all.keys(['depart', 'arrive', 'flight', 'distance', 'durationMin', 'price'])
          })
          done()
        })
    }).timeout(30000)

    it('it should fail if query is missing', (done) => {
      chai.request(server)
        .get('/api/search')
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('it should fail if date is missing', (done) => {
      chai.request(server)
        .get('/api/search?from=SYD&to=JFK')
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('it should fail if from is missing', (done) => {
      chai.request(server)
        .get('/api/search?date=2018-09-02&to=JFK')
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('it should fail if to is missing', (done) => {
      chai.request(server)
        .get('/api/search?date=2018-09-02from=SYD')
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })

})
