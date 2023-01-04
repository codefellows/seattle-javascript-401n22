const { sequelize, User, Department } = require('./index');

beforeEach(() => sequelize.sync());
afterEach(() => sequelize.drop());

test.skip('Create & read department', async () => {
  const department = await Department.create({ name: 'Cat Huggers' });
  const empl1 = await User.create({ name: 'Chris' });
  const empl2 = await User.create({ name: 'Ezgi' });
  const empl3 = await User.create({ name: 'Vida' });

  await department.addUser(empl1);
  await empl2.setDepartment(department);
  await department.addUsers([empl3 /* ... */]);

  const departmentRead = await Department.findOne({
    where: {
      name: 'Cat Huggers',
    },
    include: User,
  });

  expect(departmentRead.Users.length).toBe(3);
});
