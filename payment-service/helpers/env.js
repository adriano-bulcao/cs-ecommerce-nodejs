require('dotenv').config({ path: './config/.env' });

module.exports = {
  name: process.env.NODE_ENV,
  app: {
    port: process.env.PORT,
    password: process.env.PASSWORD
  },
  db: {
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
    collections: {
      orders: process.env.DB_COLLECTION_ORDERS,
    },
    test: {
      url: process.env.DB_URL_TEST,
      name: process.env.DB_NAME_TEST,
    },
  },
};
