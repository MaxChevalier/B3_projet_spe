const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Obstacle extends Model {}

Obstacle.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.JSON, // Array<string> est représenté comme JSON
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    through: {
      type: DataTypes.JSON, // Array<boolean> est représenté comme JSON
      allowNull: false
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
}, {
  sequelize,
  modelName: 'Obstacle',
  timestamps: true
});

module.exports = Obstacle;
