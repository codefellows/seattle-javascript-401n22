const bcrypt = require('bcrypt');
const { sequelize, AuthUser } = require('../models');

describe('Auth Model', () => {
  beforeEach(() => sequelize.sync());
  afterEach(() => sequelize.drop());

  it('can create a user', async () => {
    const user = await AuthUser.createWithHashed('david', 'pip1');
    expect(user.username).toBe('david');
    expect(bcrypt.compareSync('pip1', user.username));
  });

  describe('findUser', () => {
    it('finds valid user', async () => {
      await AuthUser.createWithHashed('david', 'pip1');
      const user = await AuthUser.findLoggedIn('david', 'pip1');
      expect(user).toBeDefined();
    });

    it('nulls for invalid password', async () => {
      await AuthUser.createWithHashed('david', 'pip1');
      const user = await AuthUser.findLoggedIn('david', 'badpass');
      expect(user).toBe(null);
    });

    it('nulls for missing user', async () => {
      await AuthUser.createWithHashed('david', 'pip1');
      const user = await AuthUser.findLoggedIn('someone', 'pip1');
      expect(user).toBe(null);
    });
  });
});
