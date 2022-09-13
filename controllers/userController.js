const {User} = require('../models/index')

const jwt = require('jsonwebtoken')

const Cookies = require('cookies')

const ApiError = require('../error/ApiError')

mongoose = require('mongoose');

const jwtToken = require("../utils/jwtToken");
const workPassword = require("../utils/workPassword");

class UserController {

    async getAll(req, res) {
        const users = await User.findAll({attributes:["id", "id_type"]})
        return res.json(users)
    }

    async registration(req, res, next) {
        const {id, password} = req.body

        let id_type;

        if(Number(id)) { id_type = 'phone' } else { id_type = 'email' }

        if (!id || !password) {
            return next(ApiError.badRequest('Некорректный ввод'))
        }
        const candidate = await User.findOne({where: {id}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким id уже существует'))
        }

        const HashPassword = await workPassword.hashPassword(password)

        const user = await User.create({id, password: HashPassword, id_type})

        const token = jwtToken.createToken(user.id);

        await User.update( { tokens: { token } }, {
            where: {id}
        })
        res.cookie('jwt', token, { httpOnly: true}) //решение с сохранением токена в куки
        return res.json({token})
    }

    async login(req, res, next) {
        const {id, password} = req.body

        const user = await User.findOne({where: {id}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }

        if (req.body.id !== req.user.id) {
            return next(ApiError.internal('Токен не валиден'))
        }

        let ComparePassword = workPassword.comparePassword(password, user.password)

        if (!ComparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        return res.json({message: 'Пользователь авторизован и залогинен !'})
    }

    async logout (req, res) {

        if(req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]

            if(!token) {
                return res.status(401).json({success: false, message: "Не авторизован !"})
            }

            let all
            if (req.query.all == 'true') {all = true} else all = false
            console.log ('all =', all)

            if (all) {
                let masUser = []
                masUser = await User.findAll()
                for (let i = 0; i < masUser.length; i++) {
                    await User.update( { tokens: {} }, {
                        where: {id: masUser[i].id}
                    })
                }

            } else {
                await User.update( { tokens: {} }, {
                    where: {id: req.user.id}
                })
            }

            res.cookie('jwt', '', { maxAge: 1}) //решение с удалением токенов из куков
            return res.json({message: "Logout успешен !"})

        }
    }

    async latency (req, res) {
        let start = req.query.start // время запроса с google.com
        let result = (Date.now() - parseInt(start)) / 1000
        return res.json(JSON.stringify(result))
    }

}

module.exports = new UserController()