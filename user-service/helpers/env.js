
require('dotenv').config({ path: './config/.env' });

module.exports = {
  name: process.env.NODE_ENV,
  app: {
    port: process.env.PORT,
    secret: process.env.SECRET,
    serviceName: process.env.SERVICE_NAME,
  },
  db: {
    name: process.env.DB_NAME,
    nametest: process.env.DB_NAME_TEST,
    url: process.env.DB_URL,
    collections: {
      users: process.env.DB_COLLECTION_USERS,
    },
  },
};
