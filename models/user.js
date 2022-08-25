'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    password: DataTypes.STRING,
    id_type: DataTypes.STRING,
    // tokens: [DataTypes.JSON],
/*    tokens: {
      type: DataTypes.STRING,
      get: function() {
        return JSON.parse(this.getDataValue('tokens'));
      },
      set: function(val) {
        return this.setDataValue('tokens', JSON.stringify(val));
      }
    }*/
//    tokens: DataTypes.ARRAY(DataTypes.JSON) //
    tokens: DataTypes.JSON

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};