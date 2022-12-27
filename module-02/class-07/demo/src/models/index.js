const { Sequelize } = require('sequelize');
const { makeUser } = require('./user.model');
const { makeDepartment } = require('./department.model');
const { makeHobby } = require('./hobby');
const { makeAuthUser } = require('../auth/model');

const DATABASE_URL =
  process.env.NODE_ENV === 'test'
    ? 'sqlite::memory:'
    : process.env.DATABASE_URL;

const CONNECTION_OPTIONS =
  process.env.NODE_ENV === 'test'
    ? {
        // logging: false,
      }
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      };

const sequelize = new Sequelize(DATABASE_URL, CONNECTION_OPTIONS);

const User = makeUser(sequelize);
const Department = makeDepartment(sequelize);
const Hobby = makeHobby(sequelize);
const AuthUser = makeAuthUser(sequelize);

// Department.hasMany(User);
// User.belongsTo(Department);

User.hasMany(Hobby);

module.exports = {
  sequelize,
  User,
  Department,
  Hobby,
  AuthUser,
  // Food,
  // Cars
};
