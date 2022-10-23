let chai = require("chai")
let chaiHttp = require("chai-http")
let app = require("../index")

// Assertion Style
chai.should()

chai.use(chaiHttp)

describe('Roles API', () => {

    /**
     * Test the GET route
     */

    describe('GET /roleM/getAll', () => {
        it('It should GET all the roles', (done) =>{
            chai.request(app)
                .get('/roleM/getAll')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    // response.body.length.should.be.eq(7);
                done()
                })
        })

        it('It should NOT GET all the roles', (done) =>{
            chai.request(app)
                .get('/roleM/getAl')
                .end((err, response) => {
                    response.should.have.status(404)
                done()
                })
        })
    })

    /**
    * Test the GET (by id) route
    */

    describe('GET /roleM/getById/:_id', () => {
        it('It should GET a role by ID', (done) => {
            const roleId = '63551dff87bfd66dc4c4685f'
            chai.request(app)
                .get('/roleM/getById/' + roleId)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('value')
                    response.body.should.have.property('_id')
                    response.body.should.have.property('_id').eq('63551dff87bfd66dc4c4685f')
                done()
                })
        })

        it('It should NOT GET a role by ID', (done) => {
            const roleId = 123
            chai.request(app)
                .get('/roleM/getById/' + roleId)
                .end((err, response) => {
                    response.should.have.status(404)
                done()
                })
        })
    })

    /**
     * Test the POST route
     */

    describe('POST /roleM/createRole', () => {
        it('It should POST a new role', (done) => {
            const role = {
                value: 'WORKER2'
            }
            chai.request(app)
                .post('/roleM/createRole')
                .send(role)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('value')
                    response.body.should.have.property('_id')
                done()
                })
        })
    })
})