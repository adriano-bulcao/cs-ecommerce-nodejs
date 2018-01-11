# Setup product-service

## Technologies used

- [express](https://github.com/expressjs/express)
Fast, unopinionated, minimalist web server framework for node.
Utilizamos o express por ser o framework mais utilizado, ter uma boa documentação e a performance em comparação ao Hapi não ter muita diferença.

- [body-parser](https://github.com/expressjs/body-parser)
Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
Utilizamos o "body-parser" por ser mantido pelo próprio express trazendo assim uma boa compatibilidade.

- [morgan](https://github.com/expressjs/morgan)
HTTP request logger middleware for node.js
Utilizamos o "morgan" por ser mantido pelo próprio express trazendo assim uma boa compatibilidade.

- [dotenv](https://github.com/motdotla/dotenv)
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
Utilizamos o "dotenv" por ser uma das libs mais utilizadas, ser simples de se implementar e não possuir nenhum tipo de dependência.

- [mongodb](https://github.com/mongodb/node-mongodb-native)
The official MongoDB driver for Node.js. Provides a high-level API on top of mongodb-core that is meant for end users.
Utilizamos o "MongoDB" porque não queriamos um ORM para acessar o Mongodb, utilizando seu driver oficial.

- [joi](https://github.com/hapijs/joi)
Object schema description language and validator for JavaScript objects.
Utilizamos o "joi" porque é uma das libs mais utilizadas e bem documentadas.

- [jest](https://github.com/facebook/jest)
Jest is used by Facebook to test all JavaScript code including React applications
Utilizamos o "jest" porque ele oferece em uma lib todos os recursos necessários para efetuar os testes.

- [supertest](https://github.com/visionmedia/supertest)
The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.
Utilizamos o "supertest" por ser a única grande lib que encontramos para teste de API.

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