'use strict'

const app = require('./app')
const env = require('./helpers/env')
const { mongo } = require('./helpers/db')
const hc = require('./health-check');
const logger = console;
mongo.connect(env.db.url)
  .then(() => {
    hc(app);
    app.listen(env.app.port, () =>
      logger.log(`Server up at port ${env.app.port} in ${env.name}`))
  })
  .catch(console.error)