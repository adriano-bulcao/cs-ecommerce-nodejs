'use express'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/', require('./api'));

app.use((error, request, response, next) => {
    console.log(error);
    response.status(500).json({
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
    })
 });

 module.exports = app;
