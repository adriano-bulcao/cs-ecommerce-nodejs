'use strict'

const dotenv = require('dotenv').config({path: './config/.env'});

module.exports = {
  name: process.env.NODE_ENV,
  app: {
    port: process.env.PORT,
    userService: process.env.USER_SERVICE,
    secret: process.env.SECRET
  }
}