const express = require('express');
const { userRoutes } = require('./routes/user.route');

const server = express();

server.use(logger);
server.use(express.json());

server.get('/hello', (_, res) => res.send('Hello!'));
server.use((req, res, next) => {
  if (req.method === 'GET' && req.path.startsWith('/hello')) {
    res.send('Hi there!');
  } else {
    next();
  }
});

// server.get('/hello', (_, res) => res.send('Hello!'));

// When you ask for '/hello', you recieve 'Hello!'
server.get('/hello', (_, res) => res.send('Hello!'));
server.get('/hello/:name', (req, res) =>
  res.send(`Hello, ${req.params.name}!`)
);

// When you say goodbye, you recieve "nailed it"
server.get('/goodbye', (_, res) => res.send('Nailed It!'));

server.use(userRoutes);

const nameValidator = (req, res, next) => {
  if (req.query.name) {
    req.name = req.query.name;
    next();
  } else {
    next('Failed validation: No name in query!');
  }
};

// server.use(nameValidator);
server.get('/person', nameValidator, (req, res) => {
  res.status(200).send({ name: req.name });
});

server.get('/throw_error', () => {
  throw new Error('Oh no the world!');
});

server.get('/pass_error', (req, res, next) => {
  next('Something bad');
});

server.use('*', (_, res) => res.status(404).send('No handler found 🙃'));
server.use((err, req, res, next) => {
  res.status(500).send({ message: 'there was a problem! 🧨', err });
});

function logger(req, _, next) {
  // Log out the request path
  if (process.env.NODE_ENV !== 'test') {
    console.log(req.path);
  }
  next();
}

module.exports = {
  server,
  nameValidator,
};
