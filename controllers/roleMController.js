const UserM = require('../models-mongo/userM')
const userM = require('../models-mongo/userM')
const roleM = require('../models-mongo/roleM')
const mongoose = require('mongoose')

const ApiError = require('../error/ApiError');

class RoleMController {

    async createRole(req, res, next) {
        const {value} = req.body
        if (!value) {
            return next(ApiError.badRequest('Not correct input role'))
        }
        const role = await roleM.create({value})
        return res.json(role)
    }

    async getAll(req, res) {
        const roles = await roleM.find()
        return res.json(roles)
    }

    async getBy_Id(req, res, next) {

        try {
            const { _id } = req.params
            if ( _id.length !== 24 )
                return next(ApiError.badRequest('Not correct input user ID'))

            const role = await roleM.findById(_id)
            if (!role) {
                return next(ApiError.badRequest('This role does not exist in the data base'))
            }
            return res.json(role)
        } catch (e) {
            // console.log('e = ', e)
            next(e)
        }
    }

    async getByValue(req, res, next) {

        try {
            const { value } = req.params
            if ( !value ) {
                // return res.send('ошибка')
                return res.sendStatus(404)
            }
            const role = await roleM.find({value})
            return res.json(role)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // обновить роль с id
    async changeRoleValueById(req, res, next) {
        const {_id, value} = req.body

        if (value.length < 3) {
            return next(ApiError.badRequest('The role should be at least 3 chars long'))
        }

        await roleM.findByIdAndUpdate({_id}, {value})
        const role = await roleM.findOne({_id})
        return res.json(role)
        // return res.send("успешное обновление")
    }

    // удалить роль по id
    async deleteRoleById(req, res) {
        const {_id} = req.params
        const role = await roleM.deleteOne({_id})
        return res.json(role)
    }

    // удалить роль по названию (value)
    async deleteRoleByValue(req, res, next) {
        const {value} = req.body
        const role = await roleM.findOne({value})
        if (!role) {
            return next(ApiError.badRequest('This role does not exist in the database'))
        }

        await roleM.deleteOne({value})
        return res.json(role)
    }

    // добавить роль по названию юзеру с id
    async addRoleToUser(req, res, next) {
        try {
            const {userId, roleValue} = req.body
            if(!userId || !roleValue) {
                return next(ApiError.badRequest('Некорректный ввод'))
            }
            let role = await roleM.findOne({value: roleValue})

            if (!role) {
                return next(ApiError.badRequest('Такой роли нет в базе'))
            }
            let user = await userM.findByIdAndUpdate(
                userId,
                { $push: {roles: role._id} },
                { new: true/*, useFindAndModify: false*/ }
            ).populate("roles")
            if (!user) {
                return next(ApiError.badRequest('Такого пользователя нет в базе'))
            }
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // изменения роли с одним названием на роль с другим
    // названием у пользователя с id
    async changeOldRoleOnNewRoleByUserId(req, res) {
        const {userId, roleOldValue, roleNewValue} = req.query
        let roleOld = await roleM.findOne({value: roleOldValue})
        let roleNew = await roleM.findOne({value: roleNewValue})
        let user = await UserM.findOne({_id: userId})
        let result = await UserM.update(
            { _id: { $in: user._id }},
            {
                $pull: { roles: roleOld._id }
            },
            { multi: true }
        );
        let result1 = await userM.findByIdAndUpdate(
            userId,
            { $push: {roles: roleNew._id} },
            // { new: true, useFindAndModify: false }
        )
        return res.json(result1)
    };


    // удалить роль по названию у юзера с id
    async deleteRoleFromUser(req, res) {
        const {userId, roleValue} = req.body
        let role = await roleM.findOne({value: roleValue})
        let user = await UserM.findOne({_id: userId})
        let result = await UserM.update(
                { _id: { $in: user._id }},
                { $pull: { roles: role._id } },
                { multi: true }
            );
        return res.json(result)
    };

    // удалить все роли у юзера с id
    async deleteAllRolesFromUserWithId(req, res) {
        const {userId} = req.query
        let role = await roleM.find()
        let user = await UserM.findOne({_id: userId})

        let result
        for (let i=0; i<role.length; i++) {
            result = await UserM.updateOne(
                {_id: {$in: user._id}},
                {$pull: {roles: role[i]._id}},
                {multi: true}
            )
        }
        return res.json(result)
    }
}

module.exports = new RoleMController()