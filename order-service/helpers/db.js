const { MongoClient, ObjectID } = require('mongodb');

const state = { db: null, connected: false };

const factory = (logger = console, client = MongoClient) => ({

  connect(url, databaseName) {
    logger.info(`Try connect to database ${url}`);

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

        logger.info(`Database connected at ${(new Date()).toJSON()}`);

        db.on('close', () => {
          logger.warn(`Database connection close at ${(new Date()).toJSON()}`);
          state.connected = false;
        });

        db.on('reconnect', () => {
          state.connected = true;
          logger.info(`Database reconnected at ${(new Date()).toJSON()}`);
        });
        state.db = db;
        state.connected = true;
        resolve(db);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  },

  disconnect() {
    MongoClient.disconnect();
    console.log('Database disconnected!');
  },

  collection(collectionName) {
    if (state.db) return state.db.collection(collectionName);
    throw new Error('There is no connection to the database.');
  },

  get db() { return state.db; },

  ObjectID,
});

exports.factory = factory;
exports.database = factory();
