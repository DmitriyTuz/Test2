const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')

const roleM = require('../models-mongo/roleM')

// const createMyServer = require('../utils/server')
// const app = createMyServer()

describe('Roles endpoints', () => {

    /**
     * Test the GET route
     */

    describe('GET /roleM/getAll', () => {

        test('should GET all the roles', async() => {
            const {statusCode, body} = await request(app)
                .get('/roleM/getAll')
            expect(statusCode).toBe(200)
            expect(body).toBeDefined()
            expect(Array.isArray(body)).toBe(true)
        })

        test('should specify json in the content type header', async() => {
            const { headers } = await request(app)
                .get('/roleM/getAll')
            expect(headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        test('should NOT GET all the roles', async() => {
            const { statusCode } = await request(app)
                .get('/roleM/getAl')
            expect(statusCode).toBe(404)
        })
    })

    /**
     * Test the GET (by id) route
     */

    describe('GET /roleM/getBy_Id/:_id', () => {

        test('should GET a role by ID', async () => {
            const _id = '63551dff87bfd66dc4c4685f'
            const { statusCode, body, headers } = await request(app)
                .get(`/roleM/getBy_Id/${_id}`)
            expect(statusCode).toBe(200)
            expect(typeof(body)).toBe('object')
            expect(body).toBeDefined()
            expect(headers['content-type']).toEqual(expect.stringContaining('json'))
        })


        test('should NOT GET a role by ID', async () => {
            const _id = 123
            const { statusCode, body } = await request(app)
                .get(`/roleM/getBy_Id/${_id}`)
            expect(statusCode).toBe(404)
            expect(body.message).toBe('Not correct input user ID')
        })
    })

    /**
     * Test the POST route
     */

    describe('POST /roleM/createRole', () => {

        const role = { value: 'WORKER1' }

        afterAll(async () => {
            await roleM.deleteOne(role)
        })

        test('should POST a new role', async () => {

            const { statusCode, body, headers } = await request(app)
                .post(`/roleM/createRole`).send(role)
            expect(statusCode).toBe(200)
            expect(typeof(body)).toBe('object')
            expect(body).toBeDefined()
            expect(headers['content-type']).toEqual(expect.stringContaining('json'))
            expect(body.value).toBe('WORKER1')
        })

        test('should NOT POST a new role without the value property', async () => {

            const { statusCode, body } = await request(app)
                .post(`/roleM/createRole`)
            expect(statusCode).toBe(404)
            expect(body.message).toBe('Not correct input role')
        })
    })

    /**
     * Test the PUT route
     */

    describe('PUT /roleM/changeRoleValueById', () => {

        let role

        beforeAll(async () => {
            role = await roleM.findOne({_id: '63551e0987bfd66dc4c46861'})
        })

        afterAll(async () => {
            await roleM.findByIdAndUpdate({_id: role._id}, {value: role.value})
            })

        test('should PUT a new role', async () => {

            const role = {_id: '63551e0987bfd66dc4c46861', value: 'WORKER5'}

            const {statusCode, body} = await request(app)
                .put(`/roleM/changeRoleValueById`).send(role)
            expect(statusCode).toBe(200)
            expect(typeof (body)).toBe('object')
            expect(body).toBeDefined()
            expect(body.value).toBe('WORKER5')
        })

        test('should NOT PUT a new role with a value less than 3 characters', async () => {

            const role = {_id: '63558830aa985a90d78df617', value: 'WO'}
            const {statusCode, body} = await request(app)
                .put(`/roleM/changeRoleValueById`).send(role)
            expect(statusCode).toBe(404)
            expect(body.message).toBe('The role should be at least 3 chars long')
        })
    })

    /**
     * Test the DELETE route
     */

    describe('DELETE /roleM/deleteRoleByValue', () => {

        let role

        beforeAll(async () => {
            role = await roleM.findOne({_id: "635e734c2d8d071b7dce4677"})
        })

        afterAll(async () => {
            await roleM.create({_id: role._id, value: role.value})
        })

        test('should DELETE an existing role', async () => {

            const role = {value: 'ADMIN'}

            const {statusCode} = await request(app)
                .delete(`/roleM/deleteRoleByValue`).send(role)
            expect(statusCode).toBe(200)
        })

        test('should DELETE a role that is not in the database', async () => {

            const role = { value: 'DANCER' }

            const {statusCode, body} = await request(app)
                .delete(`/roleM/deleteRoleByValue`).send({role})
            expect(statusCode).toBe(404)
            expect(body.message).toBe('This role does not exist in the database')
        })
    })

    /**
     * Test the PUT route (add role to user)
     */

    describe('PUT / function - add role to user', () => {

        describe('given the userId and roleValue are valid', () => {

            let Payload

            beforeAll(() => {
                Payload = {"userId": "635cf79b8b2070bdfa387ecc", "roleValue": "WORKER"}
            })

            afterAll(async () => {
                await request(app)
                    .delete('/roleM/deleteRoleFromUser').send(Payload)
            })

            test('should respond with a 200 and return the user payload', async () => {
                const {statusCode, body} = await request(app)
                        .put('/roleM/addRoleToUser').send(Payload)

                    let arrayRoles = []
                    for (let i in body.roles) {
                        arrayRoles.push(body.roles[i].value)
                    }

                    expect(statusCode).toBe(200)
                    expect({id: body._id, roles: arrayRoles}).toEqual({id: Payload.userId, roles: ["DESIGNER", "USER", "ADMIN", "WORKER"]})
                    // expect(body.roles[0].value).toEqual({})
            })

        })

        describe('given the userId or roleValue does not exist', () => {

            test('should return a 404', async () => {

                const {statusCode} = await request(app)
                    .put('/roleM/addRoleToUser').send({"userId": "632f4c337b3a60b4d40f6614", "roleValue": "qwert"})
                expect(statusCode).toBe(404)
            })

            test('should return not correct input', async () => {

                const {body} = await request(app)
                    .put('/roleM/addRoleToUser').send({"userId": "", "roleValue": ""})
                expect(body.message).toBe('Некорректный ввод')
            })

            test('should return this role not exist in the database ', async () => {

                const {body} = await request(app)
                    .put('/roleM/addRoleToUser').send({"userId": "632f4c337b3a60b4d40f6614", "roleValue": "qwert"})
                expect(body.message).toBe('Такой роли нет в базе')
            })

            test('should return this user not exist in the database ', async () => {

                const {body} = await request(app)
                    .put('/roleM/addRoleToUser').send({"userId": "632f4c337b3a60b4d40f6615", "roleValue": "ADMIN"})
                expect(body.message).toBe('Такого пользователя нет в базе')
            })

            test('should return error with ObjectId', async () => {
                try {
                    const {body} = await request(app)
                        .put('/roleM/addRoleToUser').send({"userId": "632f", "roleValue": "ADMIN"})
                } catch (e) {
                    expect(e.message).toBe('')
                }
            })
        })
    })
})

    // describe('POST / roles given value', () => {

        // test('should respond with a 200 status code1', async() => {
        //     const response = await request(app)
        //         .post('/roleM/createRole').send({
        //             value: '3'
        //         })
        //     expect(response.statusCode).toBe(200)
        // })
        //
        // test('should specify json in the content type header1', async() => {
        //     const response = await request(app)
        //         .post('/roleM/createRole').send({
        //             value: '4'
        //         })
        //     expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        // })

        // test('response has value', async() => {
        //     const response = await request(app)
        //         .post('/roleM/createRole').send({
        //             value: '3'
        //         })
        //     expect(response.body.value).toBeDefined()
        // })
/*    })

    describe('POST / roles when the value is missing', () => {

        test('should respond with a 400 status code', async () => {
            const response = await request(app)
                .post('/roleM/createRole').send()
            expect(response.statusCode).toBe(400)
        })
    })
})*/



