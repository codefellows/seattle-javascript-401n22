const { sequelize } = require('../../models');
const { makeUser } = require('./user');

const User = makeUser(sequelize);

module.exports = { User };
