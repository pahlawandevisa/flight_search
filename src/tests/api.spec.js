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
            done()
          })
    })
  })

  describe('GET /airports', () => {
    it('it should return success', (done) => {
        chai.request(server)
          .get('/api/airports')
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
    })
  })

  describe('GET /search', () => {
    it('it should return success', (done) => {
        chai.request(server)
          .get('/api/search')
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
    })
  })

})