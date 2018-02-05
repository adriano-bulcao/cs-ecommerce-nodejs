const app = require('./app');
const env = require('./helpers/env');
const { database } = require('./helpers/db');

database
    .connect(env.db.url, env.db.name)
    .then(() => app.listen(env.app.port, () => console.log(`Server up at port ${env.app.port} in ${env.name}`)))
    .catch(console.error);

