const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Level extends Model {}

Level.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creator: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  modification_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  layout: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Level',
  timestamps: true
});

module.exports = Level;
