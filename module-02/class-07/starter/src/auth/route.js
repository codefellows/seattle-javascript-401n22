const express = require('express');
const base64 = require('base-64');
const { User } = require('../models');

const authRoutes = express();

// Make a POST request to the/signup route with username and password.
authRoutes.post('/signup', signup);
// Make a POST request to the /signin route.
authRoutes.post('/signin', signin);

async function signup(req, res, next) {
  try {
    // On a successful account creation, return a 201 status.
    const { username, password } = req.body;
    await User.createWithHashed(username, password);
    res.send(201);
  } catch (cause) {
    // On any error, trigger your error handler with an appropriate error.
    next(new Error('Failed to create user', { cause }));
  }
}

// Send a basic authentication header with a properly encoded username and password combination.
// On a successful account login, return a 200 status with the user object in the body.
// On any error, trigger your error handler with the message “Invalid Login”.
async function signin(req, res, next) {
  let authorization = req.header('Authorization');
  if (!authorization.startsWith('Basic ')) {
    next(new Error('Invalid authorization scheme'));
    return;
  }

  authorization = base64.decode(authorization.replace('Basic ', ''));

  const [username, password] = authorization.split(':');
  let user = await User.findLoggedIn(username, password);
  if (user) {
    res.status(200).send({ username: user.username });
  } else {
    next(new Error('Invalid login'));
  }
}

module.exports = { authRoutes };
