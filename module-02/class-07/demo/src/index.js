require('dotenv').config();

const { sequelize } = require('./models');
const { server } = require('./server');

const port = process.env.PORT || 3000;
server.listen(port, async () => {
  await sequelize.sync();
  console.log(`Listening on ${port}`);
});
