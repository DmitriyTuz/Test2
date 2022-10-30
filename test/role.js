let chai = require("chai")
let chaiHttp = require("chai-http")
let app = require("../index")
const mongoose = require('mongoose')

const roleM = require('../models-mongo/roleM')

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

    describe('GET /roleM/getBy_Id/:_id', () => {

        it('It should GET a role by ID', (done) => {
            const _id = '63551dff87bfd66dc4c4685f'
            chai.request(app)
                .get('/roleM/getBy_Id/' + _id)
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

        // afterEach(() => {
        //     chai.request(app)
        //         .delete('/roleM/deleteRoleByValue').send(role)
        //     console.log('afterEach')
        // })

        // after(() => {
        //     chai.request(app)
        //         .delete('/roleM/deleteRoleByValue').send(role)
        //     console.log('after')
        // })

        const role = { value: 'WORKER1' }

        after(async () => {
            await roleM.deleteOne(role)
        })

        it('It should POST a new role',(done) => {

            chai.request(app)
                .post('/roleM/createRole')
                .send(role)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('value')
                    response.body.should.have.property('_id')
                    response.body.should.have.property('value').eq('WORKER1')
                done()
                })
        })

        it('It should NOT POST a new role without the value property',(done) => {

            chai.request(app)
                .post('/roleM/createRole')
                .send()
                .end((err, response) => {
                    response.should.have.status(404)
                    response.body.message.should.be.eq('Not correct input role')
                    response.body.should.not.have.property('value')
                done()
                })
        })
    })

    /**
     * Test the PUT route
     */

    describe('PUT /roleM/changeRoleValueById', () => {

        // let beforeRole = async () => {
        //     const {_id, value} = await roleM.findOne({_id: '63558830aa985a90d78df617'})
        //     after(async () => {
        //         await roleM.findByIdAndUpdate({_id: _id}, {value: value})
        //     })
        // }
        //
        // beforeRole()

        let role

        before(async () => {
            role = await roleM.findOne({_id: '63551e0987bfd66dc4c46861'})
        })

        after(async () => {
            await roleM.findByIdAndUpdate({_id: role._id}, {value: role.value})
        })

        it('It should PUT a new role',(done) => {

        const role = { _id: '63551e0987bfd66dc4c46861', value: 'WORKER5' }

            chai.request(app)
                .put('/roleM/changeRoleValueById')
                .send(role)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('value')
                    response.body.should.have.property('_id')
                    response.body.should.have.property('value').eq('WORKER5')
                done()
                })
        })

        it('It should NOT PUT a new role with a value less than 3 characters',(done) => {

        const role = { _id: '6355735ed9d7b48922a66e04', value: 'WO' }

            chai.request(app)
                .put('/roleM/changeRoleValueById')
                .send(role)
                .end((err, response) => {
                    response.should.have.status(404)
                    response.body.message.should.be.eq('The role should be at least 3 chars long')
                    response.body.should.not.have.property('value')
                done()
                })
        })
    })

    /**
     * Test the DELETE route
     */

    describe('DELETE /roleM/deleteRoleByValue', () => {

        // const role = { value: 'W' }
        //
        // let beforeRole = async () => {
        //     const {_id, value} = await roleM.findOne({value: role.value})
        //     after(async () => {
        //         await roleM.create({_id: _id, value: value})
        //     })
        // }
        //
        // beforeRole()

        // let role
        //
        // before(async () => {
        //     role = await roleM.findOne({_id: '"635e734c2d8d071b7dce4677"'})
        //     console.log('!!!roleBefore = ', role._id)
        // })
        //
        // after(async () => {
        //     console.log('!!!roleAfter = ', role._id)
        //     await roleM.create({_id: role._id, value: role.value})
        // })

        let role

        before(async () => {
            role = await roleM.findOne({_id: '635e734c2d8d071b7dce4677'})
            console.log('!!!roleBefore = ', role._id)
        })

        after(async () => {
            console.log('!!!roleAfter = ', role._id)
            await roleM.create({_id: role._id, value: role.value})
        })

        it('It should DELETE an existing role',(done) => {

            const role = {value: 'ADMIN'}

            chai.request(app)
                .delete('/roleM/deleteRoleByValue')
                .send(role)
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })

        it('It should NOT DELETE a role that is not in the database',(done) => {

            const role = { value: 'DANCER' }

            chai.request(app)
                .delete('/roleM/deleteRoleByValue')
                .send(role)
                .end((err, response) => {
                    response.should.have.status(404)
                    response.body.message.should.be.eq('This role does not exist in the database')
                done()
                })
        })
    })
})