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
      stock: process.env.DB_COLLECTION_STOCK,
    },
  },
};
