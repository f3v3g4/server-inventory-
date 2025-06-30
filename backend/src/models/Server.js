const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { validateIP } = require('../utils/validators');

const Server = sequelize.define('Server', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIP: true,
      notEmpty: true
    }
  },
  role: {
    type: DataTypes.ENUM('master', 'worker'),
    allowNull: false
  },
  environment: {
    type: DataTypes.ENUM('Desarrollo', 'Calidad', 'Produccion'),
    allowNull: false
  },
  pciCompliant: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  clusterId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clusters',
      key: 'id'
    }
  },
  certExpiry: {
    type: DataTypes.DATE,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString()
    }
  }
}, {
  hooks: {
    beforeValidate: (server) => {
      if (server.role === 'worker') {
        server.certExpiry = null;
      }
    }
  }
});

module.exports = Server;