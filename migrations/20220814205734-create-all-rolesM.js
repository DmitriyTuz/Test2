'use strict';

const RoleM = require('../models-mongo/roleM')

module.exports = {
    async up (queryInterface, Sequelize) {

        await RoleM.create({ value: 'USER'})
        await RoleM.create({ value: 'ADMIN'})
        await RoleM.create({ value: 'DESIGNER'})
        await RoleM.create({ value: 'WORKER'})

    },

    async down (queryInterface, Sequelize) {

    }
};