const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const COMPLEXITY = 8;

function makeUser(sequelize) {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.createWithHashed = async (username, password) => {
    password = await bcrypt.hash(password, COMPLEXITY);
    console.log('Creating new user', username, password);
    const user = await User.create({ username, password });
    return user;
  };

  User.findLoggedIn = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (user == null) {
      return null;
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  };

  return User;
}

module.exports = { makeUser };
