'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      id_type: {
        type: Sequelize.STRING
      },
/*      tokens: {
        type: Sequelize.STRING,
        get: function() {
          return JSON.parse(this.getDataValue('tokens'));
        },
        set: function(val) {
          return this.setDataValue('tokens', JSON.stringify(val));
        }
      },*/
      // tokens: {
      //   type: Sequelize.ARRAY(Sequelize.JSON)
      // },
      tokens: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};