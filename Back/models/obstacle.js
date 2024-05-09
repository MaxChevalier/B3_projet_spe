const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Obstacle extends Model {}

Obstacle.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  through: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Obstacle',
  timestamps: true
});

module.exports = Obstacle;
