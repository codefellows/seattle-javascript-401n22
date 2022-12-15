const { DataTypes } = require('sequelize');

function makeDepartment(sequelize) {
  return sequelize.define('Department', {
    name: DataTypes.STRING,
  });
}

module.exports = {
  makeDepartment,
};
