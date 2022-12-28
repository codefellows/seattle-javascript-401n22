const express = require('express');

const { User, Hobby } = require('../models/index');

const userRoutes = express();

// RESTful Route Declarations
userRoutes.get('/user', getUsers); // Retrieve All
userRoutes.get('/user/:id', getUser); // Retrieve One
userRoutes.post('/user', createUser); // Create
userRoutes.put('/user/:id', updateUser); // Update
userRoutes.delete('/user/:id', deleteUser); // Delete

async function getUsers(_, res) {
  const allUsers = await User.findAll();
  res.json(allUsers);
}

async function getUser(req, res, next) {
  const id = req.params.id;
  const user = await User.findOne({
    where: { id: id },
    include: Hobby,
  });
  if (user === null) {
    next();
  } else {
    const rawUser = {
      id: user.id,
      username: user.username,
      birthday: user.birthday,
      hobbies: user.Hobbies.map((hobby) => hobby.name),
    };
    res.json(rawUser);
  }
}

async function deleteUser(req, res, next) {
  const id = req.params.id;
  const user = await User.findOne({ where: { id: id } });
  if (user === null) {
    next();
  } else {
    await user.destroy();
    res.json({});
  }
}

async function createUser(req, res) {
  const username = req.body.username;
  // This requires the birthday to be YYYY-MM-DD
  const birthday = Date.parse(req.body.birthday);
  const user = await User.create({
    username,
    birthday,
  });

  const hobbies = req.body.hobbies ?? [];
  for (const name of hobbies) {
    await user.createHobby({ name });
  }

  res.json(user);
}

async function updateUser(req, res, next) {
  const id = req.params.id;
  let user = await User.findOne({ where: { id: id } });
  if (user == null) {
    next();
  } else {
    const username = req.body.username ?? user.username;
    const birthday = Date.parse(
      req.body.birthday ?? user.birthday.toISOString()
    );
    let updatedUser = {
      username,
      birthday,
    };

    user = await user.update(updatedUser);

    res.json(user);
  }
}

module.exports = {
  userRoutes,
};
