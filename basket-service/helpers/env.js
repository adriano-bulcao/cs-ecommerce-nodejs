'use strict'

const dotenv = require('dotenv').config({ path: './config/.env' });

module.exports = {
    name: process.env.NODE_ENV,
    app: {
        port: process.env.PORT,
        serviceName: process.env.SERVICE_NAME,
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
        stockAPI : process.env.STOCK_API_URL
    }
}