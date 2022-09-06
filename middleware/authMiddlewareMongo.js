const jwt = require('jsonwebtoken')
const {User} = require('../models/index')
const userM = require('../models-mongo/userM')

mongoose = require('mongoose');

module.exports = async function(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer asfgfghhgsdf
        if (!token) {
            return res.status(401).json({message: "Пользователь не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        console.log('decoded = ', decoded)

        const user = await userM.findOne({_id: decoded._id})

        // req.user = decoded
        req.user = user;
        next()
    } catch (e) {
        res.status(401).json({message: e.message})
    }
}