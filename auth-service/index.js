'use strict'

const app = require('./app')
const env = require('./helpers/env')

app.listen(env.app.port, () => console.log(`Server up at port ${env.app.port} in ${env.name}`))