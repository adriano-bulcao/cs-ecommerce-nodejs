'use strict'

const app = require('./app')
const env = require('./env')
const { mongo } = require('./db')

mongo.connect(env.db.url)
  .then(() =>
    app.listen(env.app.port, () =>
      console.log(`Server up at port ${env.app.port} in ${env.name}`)))
  .catch(console.error)