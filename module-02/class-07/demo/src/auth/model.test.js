const bcrypt = require('bcrypt');
const { sequelize } = require('../models');
const { User } = require('./model');

describe('Auth Model', () => {
  beforeEach(() => sequelize.sync());
  afterEach(() => sequelize.drop());

  it('can create a user', async () => {
    const user = await User.createWithHashed('david', 'pip1');
    expect(user.username).toBe('david');
    expect(bcrypt.compareSync('pip1', user.username));
  });

  describe('findUser', () => {
    it('finds valid user', async () => {
      await User.createWithHashed('david', 'pip1');
      const user = await User.findLoggedIn('david', 'pip1');
      expect(user).toBeDefined();
    });

    it('nulls for invalid password', async () => {
      await User.createWithHashed('david', 'pip1');
      const user = await User.findLoggedIn('david', 'badpass');
      expect(user).toBe(null);
    });

    it('nulls for missing user', async () => {
      await User.createWithHashed('david', 'pip1');
      const user = await User.findLoggedIn('someone', 'pip1');
      expect(user).toBe(null);
    });
  });
});
