require('dotenv').config({ path: './config/.env' });

module.exports = {
  name: process.env.NODE_ENV,
  app: {
    port: process.env.PORT,
    serviceName: process.env.SERVICE_NAME,
  },
  db: {
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
    collections: {
      shippings: process.env.DB_COLLECTION_SHIPPINGS,
    },
    test: {
      url: process.env.DB_URL_TEST,
      name: process.env.DB_NAME_TEST,
    },
  },
};