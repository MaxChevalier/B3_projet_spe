const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Obstacle = require('./obstacle');

class Level extends Model {}

Level.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creator: {
    type: DataTypes.STRING,
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
  size_x: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  size_y: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  obstacles: {
    type: DataTypes.JSON,
    allowNull: false
  },
  defaultObstacleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Obstacle',
      key: 'id'
    }
  },
  defaultLayout: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Level',
  timestamps: true
});
Level.belongsTo(Obstacle, { as: 'defaultObstacle' });

module.exports = Level;
