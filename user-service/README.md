# Setup user-service

## Technologies used

- [body-parser](https://github.com/expressjs/body-parser)
Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

- [dotenv](https://github.com/motdotla/dotenv)
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

- [debug](https://github.com/visionmedia/debug)
A tiny JavaScript debugging utility modelled after Node.js core's debugging technique. Works in Node.js and web browsers.

- [express](https://github.com/expressjs/express)
Fast, unopinionated, minimalist web server framework for node.

- [mongodb](https://github.com/mongodb/node-mongodb-native)
The official MongoDB driver for Node.js. Provides a high-level API on top of mongodb-core that is meant for end users.

- [morgan](https://github.com/expressjs/morgan)
HTTP request logger middleware for node.js

- [jest](https://github.com/facebook/jest)
Jest is used by Facebook to test all JavaScript code including React applications

- [supertest](https://github.com/visionmedia/supertest)
The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.

- [joi](https://github.com/hapijs/joi)
Object schema description language and validator for JavaScript objects.

# Commands to install project

- npm install

# Command to run project and tests

### Run Development environment
```bash
npm start
```

### Run Unit Tests
generates folder dist and create into folder coverage result
```bash
npm test
```