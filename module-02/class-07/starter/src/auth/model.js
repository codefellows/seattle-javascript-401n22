const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../models');

const COMPLEXITY = process.env.COMPLEXITY ?? 8;

function makeUser(sequelize) {
  const User = sequelize.define('AuthUser', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.createWithHashed = async (username, password) => {
    password = await bcrypt.hash(password, COMPLEXITY);
    return await User.create({ username, password });
  };

  User.findLoggedIn = async (username, password) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (user == null) {
        return null;
      }
      const matches = await bcrypt.compare(password, user.password);
      return matches ? user : null;
    } catch (e) {
      console.warn(`Error finding logged in`, e);
      return null;
    }
  };

  return User;
}

const User = makeUser(sequelize);

module.exports = { User };
