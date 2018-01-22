'use strict'

const dotenv = require('dotenv').config({ path: './config/.env' });

module.exports = {
    name: process.env.NODE_ENV,
    app: {
        port: process.env.PORT
    },
    db: {
        name: process.env.DB_NAME,
        url: process.env.DB_URL,
        collections: {
            basket: process.env.DB_COLLECTION_BASKET
        }
    },
    external :{
        ordersAPI : process.env.ORDERS_API_URL,
    }
}