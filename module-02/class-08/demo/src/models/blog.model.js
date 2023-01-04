const { DataTypes } = require('sequelize');

function makeBlog(sequelize) {
  return sequelize.define('Blog', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
  });
}

module.exports = { makeBlog };
