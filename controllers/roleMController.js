const UserM = require('../models-mongo/userM')
const userM = require('../models-mongo/userM')
const roleM = require('../models-mongo/roleM')
const mongoose = require('mongoose')

const ApiError = require('../error/ApiError');

class RoleMController {
    async createRole(req, res) {
        const {value} = req.body
        if (!value) {
            res.sendStatus(400)
        }
        const role = await roleM.create({value})
        return res.json(role)
    }

    async getAll(req, res) {
        const roles = await roleM.find()
        return res.json(roles)
    }

    async getById(req, res, next) {

        try {
            const _id = req.params._id
            if ( !_id ) {
                // return res.send('ошибка')
                return res.sendStatus(404)
            }
            const role = await roleM.findById(_id)
            return res.json(role)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }


    }

    // добавить роль по названию юзеру с id
    async addRoleToUser(req, res) {
        const {userId, roleValue} = req.body
        let role = await roleM.findOne({value: roleValue})
        let user = await userM.findByIdAndUpdate(
            userId,
            { $push: {roles: role._id} },
            // { new: true, useFindAndModify: false }
            )
        return res.json(user)
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
        const {userId, roleValue} = req.query
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
    };

    // удалить роль по названию

}

module.exports = new RoleMController()