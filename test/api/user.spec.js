const chai = require('chai')
const http = require('chai-http')
const faker = require('faker')

require('chai').should()

const app = require('../../server')

chai.use(http)

describe('User API', function () {
    
    describe('Create user', function () {
        it('should return a 200 code status', function (done) {
            this.timeout(9000)
            
            chai
            .request(app)
                .post('/v1/user')
                .set('Content-Type', 'application/json')
                .send({
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: faker.internet.password()
                })
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.a('object')

                done()
            })
        })
    })
})
