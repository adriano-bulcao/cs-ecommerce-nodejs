'use strict'

// const { MongoClient, ObjectID } = require('mongodb');

// const factory = (state, client = MongoClient) => ({
//     connect: (url) => client.connect(url, {
//         reconnectTries: Number.MAX_VALUE,
//         reconnectInterval: 1000
//     }).then((db) => {
//         state.db = db;
//         return db;
//     }),

//     disconnect: () => state.db.close().then(() => { state.db = null }),

//     collection: (collectionName) => {
//         if (state.db) return state.db.collection(collectionName);
//         throw new Error('There is no connection to the database.');
//     },


//     get db() { return state.db },

//     ObjectID


// });

// exports.factory = factory;
// exports.mongo = factory({ db: null });


const { MongoClient, ObjectID } = require('mongodb')

const localSatate = { db: null, connected: false }

const sleep = milliseconds =>
    new Promise(resolve => setTimeout(resolve, milliseconds))

const factory = (state = localSatate, logger = console, client = MongoClient) => ({

    // connect(url, databaseName) {
    //     logger.info(`Try connect to database ${url}`);

    //     return client.connect(url, {
    //         promiseLibrary: Promise,
    //         reconnectTries: Number.MAX_VALUE,
    //         reconnectInterval: 1000,
    //         autoReconnect: true,
    //     })
    //         .then((client) => {
    //             const db = client.db(databaseName);

    //             logger.info(`Database connected at ${(new Date()).toJSON()}`)

    //             db.on('close', () => {
    //                 logger.warn(`Database connection close at ${(new Date()).toJSON()}`)
    //                 state.connected = false
    //             })

    //             db.on('reconnect', () => {
    //                 state.connected = true
    //                 logger.info(`Database reconnected at ${(new Date()).toJSON()}`)
    //             })

    //             state.db = db
    //             state.connected = true
    //             return db
    //         })
    //         .catch(err => {
    //             if (err.name.startsWith('Mongo')) {
    //                 logger.error(`Mongo network error try reconnect in 1 sec.\n Error: ${err.message}`)
    //                 return sleep(1000).then(() => factory(state).connect(url))
    //             }

    //             return Promise.reject(err)
    //         })
    // },


    connect(url, databaseName) {
        logger.info(`Try connect to database ${url}`);

        const promise = new Promise(async (resolve, reject) => {
            try {
                const mongoClient = await client.connect(url, {
                    promiseLibrary: Promise,
                    reconnectTries: Number.MAX_VALUE,
                    reconnectInterval: 1000,
                    autoReconnect: true,
                });

                const db = mongoClient.db(databaseName);

                logger.info(`Database connected at ${(new Date()).toJSON()}`);

                db.on('close', () => {
                    logger.warn(`Database connection close at ${(new Date()).toJSON()}`)
                    state.connected = false
                });

                db.on('reconnect', () => {
                    state.connected = true
                    logger.info(`Database reconnected at ${(new Date()).toJSON()}`)
                });

                state.db = db
                state.connected = true
                resolve(db);

            }
            catch (error) {
                reject(error);
            }
        });

        return promise;


    },

    disconnect() {
        return state.db.close().then(() => { state.db = null })
    },

    collection(collectionName) {
        if (state.db) return state.db.collection(collectionName)
        throw new Error('There is no connection to the database.')
    },

    get db() { return state.db },

    ObjectID,
})

exports.factory = factory
exports.database = factory()