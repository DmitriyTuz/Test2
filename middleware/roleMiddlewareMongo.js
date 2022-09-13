const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer asfgfghhgsdf
            if (!token) {
                return res.status(401).json({message: "Пользователь не авторизован"})
            }

            const {roles: userRoles} = jwt.verify(token, process.env.SECRET_KEY)
            // const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // console.log(decoded)

            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return next(ApiError.badRequest('У вас нет доступа !'))
            }
            next()
        } catch (e) {
            res.status(401).json({message: e.message})
        }
    }
}