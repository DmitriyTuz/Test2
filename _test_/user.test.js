// const { jest } = require('jest')

const app = require ('../index.js')
const request = require('supertest')

describe('Users endpoints', () => {

    describe('POST / users', () => {

        describe('given a id and password', () => {

            // test('should should save the id and password to the database', async () => {
            //     const response = await request(app)
            //         .post('/userM/createUserMongo').send({
            //             id: '4444444444',
            //             password: '111'
            //         })
            //     expect(userMController.createUserMongo).toBeCalledTimes(1)
            // })

            test('should respond with a 400 status code', async () => {
                const bodyData = [
                    {id: '4444444444'},
                    {password: '111'},
                    {}
                ]
                for (const body of bodyData) {
                    const response = await request(app)
                        .post('/userM/createUserMongo').send(body)
                    expect(response.statusCode).toBe(400)
                }
            })
        })


    })
})