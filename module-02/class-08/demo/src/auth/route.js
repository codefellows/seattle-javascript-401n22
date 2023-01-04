const express = require('express');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const { AuthUser } = require('../models');

const authRoutes = express();

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'SET A TOKEN SECRET';

// Make a POST request to the/signup route with username and password.
authRoutes.post('/signup', signup);
// Make a POST request to the /signin route.
authRoutes.post('/signin', signin);

async function signup(req, res, next) {
  try {
    // On a successful account creation, return a 201 status.
    const { username, password } = req.body;
    await AuthUser.createWithHashed(username, password, 'reader');
    res.send(201);
  } catch (cause) {
    // On any error, trigger your error handler with an appropriate error.
    next(new Error('Failed to create user', { cause }));
  }
}

// TODO: Make a route that lets us change a user's role (it should be admin only).

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
  try {
    let user = await AuthUser.findLoggedIn(username, password);
    if (user) {
      // res.status(200).send({ username: user.username });
      // Instead of sending back the username, send a JSON Web Token (jwt)
      const data = { username: user.username, role: user.role };
      // Need a way to expire tokens if the role changes
      const token = jwt.sign(data, TOKEN_SECRET);
      res.send(token);
    } else {
      next(new Error('Invalid login'));
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function checkToken(req, _, next) {
  const authorization = req.header('Authorization') ?? '';
  if (!authorization.startsWith('Bearer ')) {
    next(new Error('Missing required Bearer header'));
    return;
  }

  try {
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.username = decoded.username;
    req.role = decoded.role;
    next();
  } catch (e) {
    next(new Error('Failed to decode authorization', { cause: e }));
  }
}

function ensureRole(roles) {
  return function checkRole(req, _, next) {
    if (roles.includes(req.role)) {
      next();
    } else {
      next(new Error('Insufficient permissions'));
    }
  };
}

module.exports = { authRoutes, signup, signin, checkToken, ensureRole };
