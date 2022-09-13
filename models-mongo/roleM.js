const {Schema, model} = require('mongoose');

const RoleM = new Schema({
    value: { type: String, unique: true, default:"USER" },
});

module.exports = model('roleM', RoleM)