const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cluster = sequelize.define('Cluster', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Cluster;