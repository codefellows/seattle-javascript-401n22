const server = require('./server');
const supertest = require('supertest');

const request = supertest(server);

test('hello endpoint', async () => {
  const response = await request.get('/hello');
  let foo = 10;
  expect(response.text).toBe('Hello!');
});

test('goodbye endpoint', async () => {
  const response = await request.get('/goodbye');
  expect(response.text).toBe('Nailed It!');
});
