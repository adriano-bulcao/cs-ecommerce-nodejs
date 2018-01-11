'use strict'

const dotenv = require('dotenv').config({path: './config/.env'});

module.exports = {
  name: process.env.NODE_ENV,
  app: {
    port: process.env.PORT
  },
  db: {
    url: process.env.DB_URL,
    collenctions: {
      products: process.env.DB_COLLECTION_PRODUCTS
    }
  }
}