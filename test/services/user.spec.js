const faker = require('faker')

require('chai').should()

describe('User Service', function() {
    before(async function () {
        this.connection = await require('../../bootstrap/mongodb')()
        this.service = require('../../services/user/user.js')
    })

    after(async function() {
        this.connection.disconnect()
    })
    
    describe('create', function() {
        it('should return an object', async function() {
            let data = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }
            
            let res = await this.service.create(data)
                        
            res.should.be.a('object')
            res.should.have.keys([
                'success',
                'result'
            ])

            res.result.should.have.keys([
                'id',
                'username',
                'created_at'
            ])
        })
    })

    describe('login', function() {
        it('should return an object with a valid jwt', async function() {
            let password = faker.internet.password()
            let data = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: password
            }

            let res = await this.service.create(data)

            res.should.be.a('object')
            res.should.have.keys([
                'success',
                'result'
            ])

            data = {
                username: data.username,
                password: password
            }

            let login = await this.service.login(data)

            login.should.be.a('object')
            login.should.have.keys([
                'success',
                'result'
            ])

            login.result.should.have.keys([
                'login',
                'token'
            ])
        })
    })
})
