const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Test extends Model {}

Test.init({
  id_level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Test',
  timestamps: true
});

module.exports = Test;
