'use strict'

const format = record => ({
    id: record._id,
    username: record.username,
    email: record.email,
    password: record.password
})

exports.format = format