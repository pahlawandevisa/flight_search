var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')

chai.should()
chai.use(chaiHttp);

describe('Server', () => {

  describe('GET /', () => {
    it('it should return success', (done) => {
        chai.request(server)
          .get('/')
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
    })
  })

  describe('GET /not-exist', () => {
    it('it should return not found', (done) => {
        chai.request(server)
          .get('/not-exist')
          .end((err, res) => {
            res.should.have.status(404)
            done()
          })
    })
  })

})