require('dotenv').config()
const mongoose = require('mongoose')
const roleM = require('./models-mongo/roleM')

//  // !!! функция для проверки скорости запросов монги
//
// require('dotenv').config()
// const mongoose = require('mongoose')
// const ObjectId = require('mongodb').ObjectId
//
// const userM = require('./models-mongo/userM')
// const roleM = require('./models-mongo/roleM')
//
// let a
// let b
// // console.log('a = ', a)
//
// const globalStartTime = new Date()
//
// // console.log(typeof(mongoose.Types.ObjectId('632f2ec13f795aad3950f628')))
//
// // подключаемся к базе данных монго
// mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
//
// async function userCount() {
//
//     const startTime = new Date()
//     const usersLen = await userM.countDocuments()
//
//     // for (let i = 0; i < 10000; i++) {
//     //     // a = getRandomInt(1, 1000)
//     //     a = Math.floor(Math.random() * (100000000 - 1) + 1)
//     //     b = Math.floor(Math.random() * (100000000 - 1) + 1)
//     //     await userM.create({id: i + a, password: '11111', salary: i + b})
//     // }
//
//     // console.log(`=== users, ${users}`)
//     console.log(`==== User count: ${usersLen}`)
//     console.log(`==== countDocuments() time: ${(new Date() - startTime) / 1000}s`)
// }
//
// async function getCheapUsers() {
//
//     const startTime = new Date()
//     const cheapUsers = await userM.find({salary: {$lt: 90000000}}, {salary: 1})
//         .sort({salary: 1}).limit(1000).lean()
//
//     // console.log(`==== cheapUsers: ${cheapUsers}`)
//     console.log(`==== User cheap count: ${cheapUsers.length}`)
//     console.log(`==== getCheapUsers() time: ${(new Date() - startTime) / 1000}s`)
// }
//
// async function getLuxuryUsers() {
//
//     const startTime = new Date()
//     const luxuryUsers = await userM.find({salary: {$gt: 100}}, {salary: 1})
//         .sort({salary: 1}).limit(1000).lean()
//
//     // console.log(`==== cheapUsers: ${cheapUsers}`)
//     console.log(`==== User luxury count: ${luxuryUsers.length}`)
//     console.log(`==== getLuxuryUsers() time: ${(new Date() - startTime) / 1000}s`)
// }
//
// async  function speedTestQueue() {
//     await userCount();
//     await getCheapUsers();
//     await getLuxuryUsers()
// }
//
// async  function speedTestParallel() {
//
//     return await Promise.all([
//
//         userCount(),
//         getCheapUsers(),
//         getLuxuryUsers()
//
//     ])
// }
//
// process.stdout.write('=== Test start ===');
//
// (async() => {
//     try {
//         await speedTestParallel()
//     } catch (e) {
//         console.error(e)
//     } finally {
//         console.log(`=== End: ${(new Date() - globalStartTime) / 1000}s`)
//         process.exit()
//     }
// })()

//                      * * *

// mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
//
// const roleBefore = async () => {
//     const {_id} = await roleM.findOne({_id: '63558830aa985a90d78df617'})
//     console.log('_id = ', _id)
//     // return  _id
// }
//
// // console.log('--->>>', await roleBefore())
// roleBefore()

//                      * * *

// let ar = [1, 2, 3]
// console.log(Array.isArray(ar))

//                      * * *


// const start = async () => {
//     await mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
//
//     const beforeRole = async () => {
//             const result = await roleM.findOne({_id: '63558830aa985a90d78df617'})
//         }
//      ;(async () => {
//         const users = await beforeRole()
//         console.log(users)
//     })()
// }
// start()

let role

const start = async () => {

    await mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    role = await roleM.findOne({_id: '63558830aa985a90d78df617'})
    await mongoose.disconnect()
    return role

}

let a = async () => {
    await start()
    console.log(role)
}

a()
