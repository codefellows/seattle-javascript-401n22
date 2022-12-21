const { DataTypes } = require('sequelize');

function makeHobby(sequelize) {
  return sequelize.define('Hobby', {
    name: DataTypes.STRING,
  });
}

module.exports = { makeHobby };
