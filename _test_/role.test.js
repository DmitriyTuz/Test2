const app = require ('../index.js')
const request = require('supertest')
const mongoose = require('mongoose')

describe('Roles endpoint', () => {

    describe('GET / roles', () => {

        test('should respond with a 200 status code', async() => {
            const response = await request(app)
                .get('/roleM/getAll')
            expect(response.statusCode).toBe(200)
        })

        test('should specify json in the content type header', async() => {
            const response = await request(app)
                .get('/roleM/getAll')
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
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

describe('role', () => {
    describe('get role route', () => {
        describe('given the role does not exist', () => {
            test('should return a 404', async () => {
                const roleId = 'role-123'
                const response = await request(app)
                    .get(`/roleM/getById/${roleId}`)
                expect(response.statusCode).toBe(404)
            })
        })

        describe('given the role does exist', () => {
            test('should return a 200', async () => {
                const roleId = mongoose.Types.ObjectId('632f2ec13f795aad3950f628')
                const response = await request(app)
                    .get(`/roleM/getById/${roleId}`)
                expect(response.statusCode).toBe(200)
            })
        })
    })
})