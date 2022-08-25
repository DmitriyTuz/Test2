const bcrypt = require('bcrypt')

class workPassword {

    hashPassword(password) { return bcrypt.hashSync(password, 10) }

    comparePassword(password, hash) { return bcrypt.compareSync(password, hash)}

    comparePassword1(password, userPassword) {

    }
}

module.exports = new workPassword()


