const jwt = require('jsonwebtoken')

class jwtToken {

    createToken(id) {
        return jwt.sign(
            {id},
            process.env.SECRET_KEY,
            {expiresIn: '10h'}
        )
    }

    verifyToken(token) {
        return jwt.verify(
            token,
            process.env.SECRET_KEY,
            {expiresIn: '10h'})
    }
}

module.exports = new jwtToken()



