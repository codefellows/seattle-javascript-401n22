const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const COMPLEXITY = process.env.COMPLEXITY ?? 8;

function makeAuthUser(sequelize) {
  const AuthUser = sequelize.define('Auth', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING, // "reader", "writer", "editor", "admin"
  });

  AuthUser.createWithHashed = async (username, password, role) => {
    try {
      password = await bcrypt.hash(password, COMPLEXITY);
      return await AuthUser.create({ username, password, role });
    } catch (e) {
      console.error(e);
    }
  };

  AuthUser.findLoggedIn = async (username, password) => {
    try {
      const user = await AuthUser.findOne({ where: { username } });
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

  return AuthUser;
}

module.exports = { makeAuthUser };
