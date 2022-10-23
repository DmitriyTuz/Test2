const userM = require('../models-mongo/userM')
const roleM = require('../models-mongo/roleM')

const jwt = require('jsonwebtoken')

const ApiError = require('../error/ApiError')

const jwtToken = require("../utils/jwtToken")
const workPassword = require("../utils/workPassword")

const { validationResult } = require('express-validator')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"})
}

class UserMController {

    async createUserMongo (req, res, next) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Ошибка при регистрации', errors})
        }

        const {id, password} = req.body
        let id_type;

        if(Number(id)) { id_type = 'phone' } else { id_type = 'email' }

        if (!id || !password) {
            res.sendStatus(400)
            return next(ApiError.badRequest('Некорректный ввод'))
        }
        const candidate = await userM.findOne({id})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким id уже существует'))
        }

        const HashPassword = await workPassword.hashPassword(password)
        // const userRole = await roleM.find({ $or: [{value: "USER"}, {value: "ADMIN"}]})
        // const userRole = await roleM.find({value: {$in: ["USER", "ADMIN"]}})
        // const userRole = await roleM.findOne({value: "ADMIN"})

        // console.log('user._id = ', user._id)

        const user = await userM.create({id, password: HashPassword, id_type/*, roles: ["USER", "ADMIN"]*/})
        let userId = user._id
        let user1 = await userM.findByIdAndUpdate(
            userId,
            { $push: {roles: "632f2d8d30ff62acb33ad55f"} },
            // { new: true, useFindAndModify: false }
        )

        const token = generateAccessToken(user1._id, user1.roles)

        await userM.findByIdAndUpdate(user1._id,{ tokens: token })
        res.cookie('jwt', token, { httpOnly: true}) //решение с сохранением токена в куки
        return res.json({token})

    }

    async loginMongo(req, res, next) {
        const {_id, password} = req.body

        const user = await userM.findOne({_id})
        if (!user) {
            return next(ApiError.internal(`Пользователь ${_id} не найден`))
        }

        // if (req.body._id !== req.user._id) {  // !!! не нужно для функции логина
        //     return next(ApiError.internal('Токен не валиден'))
        // }

        console.log('токен введённый в хедерсах - ', req.user.tokens)
        console.log('токен введённый через куки - ', req.headers.cookie.slice(4))

        if ( user.tokens !== req.headers.cookie.slice(4)) {
            return next(ApiError.internal('Токен не валиден 1'))
        }

        let ComparePassword = workPassword.comparePassword(password, user.password)
        if (!ComparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateAccessToken(user._id, user.roles)
        return res.json({message: 'Пользователь авторизован и залогинен !'})
    }

    // получить всех юзеров со всеми id ролей
    async getUsersM(req, res) {
        try {
            const users = await userM.find()
            res.json(users)

        } catch (e) {
            console.log(e)
        }
    }

    // получить юзера с ролями по id юзера
    async getUserByIdWithRoles(req, res) {
        const {_id} = req.query
        let user = await userM.findById(_id).populate("roles"/*, "-_id -__v -users"*/)
        return res.json(user)
    }

    // получить всех юзеров со всеми названиями ролей ролей
    async getAllUsersWithRolesValues(req, res) {
        // const {_id} = req.query
        let user = await userM.find().populate("roles"/*, "-_id -__v -users"*/)
        return res.json(user.roles)
    }

    // удалить юзера по id
    async deleteUser(req, res) {
        const {_id} = req.query
        const user = await userM.deleteOne({_id: _id})
        return res.json(user)
    }
}

module.exports = new UserMController()