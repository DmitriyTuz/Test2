// const { jest } = require('jest')

// const request = require('supertest')
// const app = require('../index')
//
// // const createMyServer = require('../utils/server')
// // const app = createMyServer()
//
// describe('Users endpoints', () => {
//
//     describe('POST / users', () => {
//
//         describe('given a id and password', () => {
//
//             let Payload1 = {
//                 id: '4444444444',
//                 password: '11111'
//             }
//
//             afterAll(async  () => {
//                         await request(app)
//                             .delete('/userM/deleteUserById').send({id: Payload1.id})
//                     })
//
//             test('should save the id and password to the database', async () => {
//                 const { statusCode, body } = await request(app)
//                     .post('/userM/createUserMongo').send({
//                         id: '4444444444',
//                         password: '11111'
//                     })
//                 expect(statusCode).toBe(200)
//             //     expect(userMController.createUserMongo).toBeCalledTimes(1)
//
//             })
//
//             test('should respond with a 400 status code', async () => {
//                 const bodyData = [
//                     {id: '4444444444'},
//                     {password: '111'},
//                     {}
//                 ]
//                 for (const body of bodyData) {
//                     const response = await request(app)
//                         .post('/userM/createUserMongo').send(body)
//                     expect(response.statusCode).toBe(400)
//                 }
//             })
//         })
//
//
//     })
// })