const supertest = require('supertest');
const { sequelize } = require('../models');
const { server } = require('../server');

const request = supertest(server);

async function createUsers() {
  await request.post('/user').send({
    username: 'Maru',
    birthday: '2022-01-01',
  });
  await request.post('/user').send({
    username: 'User2',
    birthday: '1999-09-09',
  });
}

describe('user routes', () => {
  beforeEach(() => sequelize.sync());
  afterEach(() => sequelize.drop());

  it('creates a user', async () => {
    const response = await request.post('/user').send({
      username: 'Maru',
      birthday: '2022-01-01',
    });
    expect(response.status).toBe(200);
    const user = response.body;
    expect(user.username).toBe('Maru');
    expect(user.birthday).toBe('2022-01-01T00:00:00.000Z');
  });

  it('gets a user', async () => {
    await createUsers();
    const response = await request.get('/user/2');
    expect(response.status).toBe(200);
    const user = response.body;
    expect(user.username).toBe('User2');
    expect(user.birthday).toBe('1999-09-09T00:00:00.000Z');
  });

  it('gets all users', async () => {
    await createUsers();
    const response = await request.get('/user');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    const user = response.body[1];
    expect(user.username).toBe('User2');
    expect(user.birthday).toBe('1999-09-09T00:00:00.000Z');
  });

  it('updates a user', async () => {
    await createUsers();

    const response = await request.put('/user/2').send({
      birthday: '1989-10-10',
    });
    expect(response.status).toBe(200);
    const user = response.body;
    expect(user.username).toBe('User2');
    expect(user.birthday).toBe('1989-10-10T00:00:00.000Z');
  });

  it('creates a user with hobbies', async () => {
    const response = await request.post('/user').send({
      username: 'Loki',
      birthday: '2018-03-01',
      hobbies: ['Meowing', 'Scratching', 'Havock'],
    });

    expect(response.status).toBe(200);
    const id = response.body.id;

    const user = await request.get(`/user/${id}`);
    expect(user.status).toBe(200);
    expect(user.body.hobbies).toEqual(['Meowing', 'Scratching', 'Havock']);
  });
});
