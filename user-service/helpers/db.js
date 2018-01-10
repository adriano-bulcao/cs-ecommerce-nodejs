'use strict'

const { MongoClient, ObjectID } = require('mongodb')

const factory = (state, client = MongoClient) => ({
  connect: (url) =>
    client.connect(url, {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    })
    .then((db) => {

      state.db = db
      return db
    }),

  disconnect: () =>
    state.db.close().then(() => { state.db = null }),

  collection: (collectionName) => {
    if (state.db) return state.db.collection(collectionName)
    throw new Error('There is no connection to the database.')
  },

  get db () { return state.db },

  ObjectID
})

exports.factory = factory
exports.mongo = factory({ db: null })