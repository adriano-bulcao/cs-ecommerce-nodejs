const { MongoClient, ObjectID } = require('mongodb');

const localState = {
  db: null,
  mongoClient: null,
  connected: false,
};

const dependencies = {
  state: localState,
  logger: console,
  client: MongoClient,
};

/* eslint-disable no-param-reassign */

const factory = ({ state, logger, client }) => ({
  connect(url, databaseName) {
    logger.info(`Try connect to database ${databaseName}`);

    const promise = new Promise(async (resolve, reject) => {
      try {
        const options = {
          promiseLibrary: Promise,
          reconnectTries: Number.MAX_VALUE,
          reconnectInterval: 1000,
          autoReconnect: true,
        };

        const mongoClient = await client.connect(url, options);

        const db = mongoClient.db(databaseName);

        logger.info(`Database connected at ${new Date().toJSON()}`);

        db.on('close', () => {
          logger.info(`Database connection close at ${new Date().toJSON()}`);
          state.connected = false;
        });

        db.on('reconnect', () => {
          state.connected = true;
          logger.info(`Database reconnected at ${new Date().toJSON()}`);
        });
        state.db = db;
        state.mongoClient = mongoClient;
        state.connected = true;
        resolve(db);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  },

  disconnect() {
    return state.mongoClient.close(true).then(() => {
      state.db = null;
    });
  },

  collection(collectionName) {
    if (state.db) return state.db.collection(collectionName);
    throw new Error('There is no connection to the database.');
  },

  get db() {
    return state.db;
  },

  ObjectID,
});

/* eslint-enable no-param-reassign */

exports.factory = factory;
exports.database = factory(dependencies);
