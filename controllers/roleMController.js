const roleM = require('../models-mongo/roleM')

class RoleMController {
    async create(req, res) {
        const {value} = req.body
        const role = await roleM.create({value})
        return res.json(role)
    }

}

module.exports = new RoleMController()