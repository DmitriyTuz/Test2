const {Schema, model} = require('mongoose');

const RoleM = new Schema({
    value: { type: String, unique: true, default: "USER" },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "userM"
        }
    ]
});

module.exports = model('roleM', RoleM)