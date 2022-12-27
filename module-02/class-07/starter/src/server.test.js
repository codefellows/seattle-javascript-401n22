const { server, nameValidator } = require('./server');
const supertest = require('supertest');

const request = supertest(server);

test('hello endpoint', async () => {
  const response = await request.get('/hello');
  expect(response.text).toBe('Hello!');
});

test('goodbye endpoint', async () => {
  const response = await request.get('/goodbye');
  expect(response.text).toBe('Nailed It!');
});

describe('Person Route', () => {
  // Person Route
  // Method: GET
  // Path: /person
  // Expects a query string from the user with a “name” property
  test('When query string present, output JSON to the client with this shape: { name: "name provided" }', async () => {
    const response = await request.get('/person?name=Gandalf');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'Gandalf' });
  });

  test('When query string present with a different name, output JSON to the client with this shape: { name: "name provided" }', async () => {
    const response = await request.get('/person?name=Frodo');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'Frodo' });
  });

  test('Without a name in the query string, force a “500” error', async () => {
    const response = await request.get('/person');
    expect(response.statusCode).toBe(500);
  });

  describe('name validator', () => {
    test('with name gandalf', () => {
      const req = { query: { name: 'Gandalf' } };
      const next = jest.fn();

      nameValidator(req, {}, next);

      expect(req.name).toBe('Gandalf');
      expect(next).toHaveBeenCalled();
    });

    test('with no name', () => {
      const req = { query: {} };
      const next = jest.fn();
      nameValidator(req, {}, next);

      expect(next).toHaveBeenCalledWith('Failed validation: No name in query!');
    });
  });
});
